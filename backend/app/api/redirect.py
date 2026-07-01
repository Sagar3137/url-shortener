from fastapi import APIRouter, Depends, HTTPException
from fastapi.responses import RedirectResponse
from sqlalchemy.orm import Session

from app.db.session import get_db
from app.services.url_service import URLService

router = APIRouter(tags=["Redirect"])


@router.get("/{short_code}")
def redirect(
    short_code: str,
    db: Session = Depends(get_db),
):
    url = URLService.resolve_short_code(
        db,
        short_code,
    )

    if url is None:
        raise HTTPException(
            status_code=404,
            detail="Short URL not found",
        )

    return RedirectResponse(
        url=url.long_url,
        status_code=307,
    )