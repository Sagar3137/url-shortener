from fastapi import APIRouter, Depends, HTTPException, Response, status, Query
from sqlalchemy.orm import Session

from app.db.session import get_db
from app.schemas.url import (
    URLCreate,
    URLResponse,
    URLDetails,
    URLUpdate,
    PaginatedURLResponse
)
from app.services.url_service import URLService
from app.models.user import User
from app.security.dependencies import get_current_user
from enum import Enum

class SortBy(str, Enum):
    created_at = "created_at"
    clicks = "clicks"
    short_code = "short_code"


class SortOrder(str, Enum):
    asc = "asc"
    desc = "desc"
    
    
router = APIRouter(prefix="/urls", tags=["URLs"])


@router.post(
    "",
    response_model=URLResponse,
    status_code=status.HTTP_201_CREATED,
)
def create_short_url(
    url: URLCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
        
    return URLService.create_short_url(
    db,
    str(url.long_url),
    current_user,
    url.alias,
    )



@router.get(
    "",
    response_model=PaginatedURLResponse,
)
def get_my_urls(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
    page: int = Query(1, ge=1),
    page_size: int = Query(10, ge=1, le=100),
    search: str | None = None,
    sort_by: SortBy = Query(SortBy.created_at),
    order: SortOrder = Query(SortOrder.desc)
):
    return URLService.get_user_urls(
        db=db,
        current_user=current_user,
        page=page,
        page_size=page_size,
        search=search,
        sort_by=sort_by.value,
        order=order.value,
    )

@router.get(
    "/{short_code}",
    response_model=URLDetails,
)
def get_url_details(
    short_code: str,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    
    result = URLService.get_url_details(
        db,
        short_code,
        current_user,
    )

    if result is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Short URL not found",
        )

    return result


@router.delete(
    "/{short_code}",
    status_code=status.HTTP_204_NO_CONTENT,
)
def delete_url(
    short_code: str,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    
    deleted = URLService.delete_url(
        db,
        short_code,
        current_user,
    )

    if not deleted:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Short URL not found",
        )
            
    return Response(
        status_code=status.HTTP_204_NO_CONTENT,
    )
        
        
@router.patch(
    "/{short_code}",
    response_model=URLResponse,
)
def update_url(
    short_code: str,
    url: URLUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return URLService.update_url(
        db,
        short_code,
        str(url.long_url),
        current_user,
    )