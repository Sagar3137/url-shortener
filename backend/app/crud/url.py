from sqlalchemy import or_, select, func
from sqlalchemy.orm import Session

from app.models.url import URL


class URLRepository:
    
    SORT_FIELDS = {
        "created_at": URL.created_at,
        "clicks": URL.clicks,
        "short_code": URL.short_code,
    }

    @staticmethod
    def create(
        db: Session,
        long_url: str,
        short_code: str,
        user_id: int,
    ) -> URL:
        url = URL(
            long_url=long_url,
            short_code=short_code,
            user_id=user_id,
        )

        db.add(url)
        db.commit()
        db.refresh(url)

        return url

    @staticmethod
    def get_by_short_code(
        db: Session,
        short_code: str,
    ) -> URL | None:
        stmt = select(URL).where(
            URL.short_code == short_code
        )

        return db.scalar(stmt)

    @staticmethod
    def short_code_exists(
        db: Session,
        short_code: str,
    ) -> bool:
        return (
            URLRepository.get_by_short_code(
                db,
                short_code,
            )
            is not None
        )

    @staticmethod
    def delete(
        db: Session,
        url: URL,
    ) -> None:
        db.delete(url)
        db.commit()

    @staticmethod
    def update(
        db: Session,
        url: URL,
    ) -> URL:
        db.commit()
        db.refresh(url)

        return url
    
    @staticmethod
    def update_url(
        db: Session,
        url: URL,
        *,
        long_url: str | None = None,
        short_code: str | None = None,
    ) -> URL:

        if long_url is not None:
            url.long_url = long_url

        if short_code is not None:
            url.short_code = short_code

        db.commit()
        db.refresh(url)

        return url
    
    
    @staticmethod
    def get_user_urls(
        db: Session,
        user_id: int,
        page: int,
        page_size: int,
        search: str | None,
        sort_by: str,
        order: str,
    ) -> tuple[list[URL], int]:

        query = (
            select(URL)
            .where(URL.user_id == user_id)
        )

        count_query = (
            select(func.count()) # pylint: disable=not-callable
            .select_from(URL)
            .where(URL.user_id == user_id)
        )

        if search:
            search_filter = or_(
                URL.short_code.ilike(f"%{search}%"),
                URL.long_url.ilike(f"%{search}%"),
            )

            query = query.where(search_filter)
            count_query = count_query.where(search_filter)

        sort_column = URLRepository.SORT_FIELDS.get(
            sort_by,
            URL.created_at,
        )

        if order == "asc":
            query = query.order_by(sort_column.asc())
        else:
            query = query.order_by(sort_column.desc())

        offset = (page - 1) * page_size

        query = query.offset(offset).limit(page_size)

        total = db.scalar(count_query) or 0

        return (
            list(db.scalars(query).all()),
            total,
        )
        
    @staticmethod
    def get_total_links(
        db: Session,
        user_id: int,
    ) -> int:
        stmt = (
            select(func.count()) # pylint: disable=not-callable
            .select_from(URL)
            .where(URL.user_id == user_id)
        )

        return db.scalar(stmt) or 0

    @staticmethod
    def get_total_clicks(
        db: Session,
        user_id: int,
    ) -> int:
        stmt = (
            select(func.sum(URL.clicks)) # pylint: disable=not-callable
            .where(URL.user_id == user_id)
        )

        return db.scalar(stmt) or 0
    
    @staticmethod
    def get_top_link(
        db: Session,
        user_id: int,
    ) -> URL | None:

        stmt = (
            select(URL)
            .where(URL.user_id == user_id)
            .order_by(URL.clicks.desc())
            .limit(1)
        )

        return db.scalar(stmt)
    
    @staticmethod
    def get_recent_links(
        db: Session,
        user_id: int,
        limit: int = 5,
    ) -> list[URL]:

        stmt = (
            select(URL)
            .where(URL.user_id == user_id)
            .order_by(URL.created_at.desc())
            .limit(limit)
        )

        return list(db.scalars(stmt).all())