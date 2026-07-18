from fastapi import APIRouter, Depends, Request
from sqlalchemy.orm import Session

from app.db.session import get_db
from app.models.user import User
from app.schemas.user import (
    UserResponse,
    UserUpdate,
    PasswordUpdate,
)
from app.security.dependencies import get_current_user
from app.services.user_service import UserService
from app.core.limiter import limiter

router = APIRouter(
    prefix="/users",
    tags=["Users"],
)


@router.get(
    "/me",
    response_model=UserResponse,
)
def get_me(
    current_user: User = Depends(get_current_user),
):
    return current_user


@router.patch(
    "/me",
    response_model=UserResponse,
)
@limiter.limit("10/minute")
def update_me(
    request: Request, # pylint: disable=unused-argument
    user: UserUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return UserService.update_profile(
        db=db,
        current_user=current_user,
        user=user,
    )


@router.patch("/me/password")
@limiter.limit("5/minute")
def change_password(
    request: Request, # pylint: disable=unused-argument
    passwords: PasswordUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    UserService.change_password(
        db=db,
        current_user=current_user,
        passwords=passwords,
    )

    return {
        "message": "Password updated successfully."
    }


@router.delete("/me")
@limiter.limit("5/minute")
def delete_account(
    request: Request, # pylint: disable=unused-argument
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    UserService.delete_account(
        db=db,
        current_user=current_user,
    )

    return {
        "message": "Account deleted successfully."
    }