from datetime import UTC, datetime
import secrets
import string
from math import ceil

from sqlalchemy.orm import Session

from app.crud.url import URLRepository
from app.models.url import URL
from app.models.user import User
from app.core.config import settings
from app.schemas.url import URLResponse, URLDetails, PaginatedURLResponse, URLListItem
from app.core.exceptions import ForbiddenError, ResourceNotFoundError, ConflictError
from app.core.logger import logger


class URLService:

    ALPHABET = string.ascii_letters + string.digits

    @classmethod
    def _generate_short_code(cls) -> str:
        return "".join(
            secrets.choice(cls.ALPHABET)
            for _ in range(settings.SHORT_CODE_LENGTH)
        )
    
    @classmethod
    def create_short_url(
        cls,
        db: Session,
        long_url: str,
        current_user: User,
        alias: str | None = None,
    ) -> URLResponse:

        if alias is not None:
            
            alias = alias.strip().lower()
            if URLRepository.short_code_exists(
                db,
                alias,
            ):
                raise ConflictError(
                    "Custom alias already exists."
                )

            code = alias

        else:

            while True:
                code = cls._generate_short_code()

                if not URLRepository.short_code_exists(
                    db,
                    code,
                ):
                    break

        url = URLRepository.create(
        db,
        long_url=long_url,
        short_code=code,
        user_id=current_user.id
        )
        
        logger.info(
        "User %s created short URL '%s'",
        current_user.id,
        code,
        )

        return cls._to_response(url)
        
        
    @staticmethod
    def resolve_short_code(
        db: Session,
        short_code: str,
    ) -> URL | None:

        url = URLRepository.get_by_short_code(
            db,
            short_code,
        )

        if url is None:
            return None

        url.clicks += 1
        url.last_accessed = datetime.now(UTC)

        URLRepository.update(
            db,
            url,
        )

        return url
    
    @staticmethod
    def get_url_details(
        db: Session,
        short_code: str,
        current_user: User
    ) -> URLDetails | None:

        url = URLRepository.get_by_short_code(
        db,
        short_code,
        )

        if url is None:
            return None
        
        if url.user_id != current_user.id:
            logger.warning(
                "User %s attempted to delete URL '%s' owned by user %s",
                current_user.id,
                short_code,
                url.user_id,
            )
            raise ForbiddenError("You are not authorized.")

        return URLService._to_details(url)
        
    @staticmethod
    def delete_url(
        db: Session,
        short_code: str,
        current_user: User
    ) -> bool:

        url = URLRepository.get_by_short_code(
            db,
            short_code,
        )

        if url is None:
            return False
        
        if url.user_id != current_user.id:
            logger.warning(
                "User %s attempted to delete URL '%s' owned by user %s",
                current_user.id,
                short_code,
                url.user_id,
            )
            raise ForbiddenError("You are not authorized.")

        URLRepository.delete(
            db,
            url,
        )
        
        logger.info(
        "User %s deleted URL '%s'",
        current_user.id,
        short_code,
        )

        return True
    
    @staticmethod
    def _to_response(url: URL) -> URLResponse:
        return URLResponse(
            id=url.id,
            long_url=url.long_url,
            short_code=url.short_code,
            short_url=f"{settings.BASE_URL}/{url.short_code}",
            created_at=url.created_at,
        )


    @staticmethod
    def _to_details(url: URL) -> URLDetails:
        base = URLService._to_response(url)
        return URLDetails(
            **base.model_dump(),
            clicks=url.clicks,
            last_accessed=url.last_accessed,
        )
        
        
    @staticmethod
    def _to_list_item(url: URL) -> URLListItem:
        base = URLService._to_response(url)

        return URLListItem(
            **base.model_dump(),
            clicks=url.clicks,
        )
                
    @staticmethod
    def update_url(
        db: Session,
        short_code: str,
        long_url: str | None,
        alias: str | None,
        current_user: User,
    )-> URLResponse:
        url = URLRepository.get_by_short_code(
            db,
            short_code,
        )

        if url is None:
            raise ResourceNotFoundError("Short URL not found")

        if url.user_id != current_user.id:
            logger.warning(
                "User %s attempted to delete URL '%s' owned by user %s",
                current_user.id,
                short_code,
                url.id,
            )
            raise ForbiddenError("You are not authorized.")

        new_alias = None

        if alias is not None:
            alias = alias.strip().lower()

            if alias != url.short_code:
                if URLRepository.short_code_exists(db, alias):
                    raise ConflictError(
                        "Custom alias already exists."
                    )
                    
            new_alias = alias
            
        updated = URLRepository.update_url(
            db,
            url,
            long_url=long_url,
            short_code=new_alias,
        )
        
        logger.info(
            "User %s updated URL '%s'",
            current_user.id,
            short_code,
        )

        return URLService._to_response(updated)
    
    
    @staticmethod
    def get_user_urls(
        db: Session,
        current_user: User,
        page: int,
        page_size: int,
        search: str | None,
        sort_by: str,
        order: str,
    ) -> PaginatedURLResponse:

        urls, total = URLRepository.get_user_urls(
            db=db,
            user_id=current_user.id,
            page=page,
            page_size=page_size,
            search=search,
            sort_by=sort_by,
            order=order,
        )

        total_pages = max(
            1,
            ceil(total / page_size),
        )

        return PaginatedURLResponse(
            items=[
                URLService._to_list_item(url)
                for url in urls
            ],
            page=page,
            page_size=page_size,
            total=total,
            total_pages=total_pages,
        )