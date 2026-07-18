from fastapi import APIRouter, Depends, HTTPException, status, Request
from sqlalchemy.orm import Session

from app.db.session import get_db
from app.schemas.user import UserCreate, UserResponse, UserLogin, Token
from app.services.user_service import UserService
from app.core.limiter import limiter
#from app.security.dependencies import get_current_user
#from app.models.user import User


router = APIRouter(
    prefix="/auth",
    tags=["Authentication"],
)


@router.post(
    "/register",
    response_model=UserResponse,
    status_code=status.HTTP_201_CREATED,
)
@limiter.limit("5/minute")
def register(
    request: Request, # pylint: disable=unused-argument
    user: UserCreate,
    db: Session = Depends(get_db),
):
    try:
        return UserService.create_user(
            db,
            user,
        )

    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail=str(e),
        ) from e
        
@router.post(
    "/login",
    response_model=Token,
)
@limiter.limit("5/minute")
def login(
    request: Request, # pylint: disable=unused-argument
    user: UserLogin,
    db: Session = Depends(get_db),
):
    try:
        return UserService.login(
            db,
            user,
        )

    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail=str(e),
        ) from e