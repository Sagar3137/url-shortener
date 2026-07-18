from fastapi import APIRouter, Depends, HTTPException, Request
from fastapi.responses import RedirectResponse
from sqlalchemy.orm import Session

from app.db.session import get_db
from app.services.url_service import URLService
from app.core.limiter import limiter

router = APIRouter(tags=["Redirect"])


@router.get("/{short_code}")
@limiter.limit("300/minute")
def redirect(
    request: Request, # pylint: disable=unused-argument
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