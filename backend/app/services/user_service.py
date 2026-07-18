from sqlalchemy.orm import Session

from app.crud.user import UserRepository
from app.models.user import User
from app.schemas.user import (
    UserCreate,
    UserResponse,
    UserLogin,
    UserUpdate,
    PasswordUpdate,
    Token,
)
from app.core.exceptions import (
    ConflictError,
    ForbiddenError,
)

from app.security.hashing import hash_password
from app.security.hashing import verify_password
from app.security.jwt import create_access_token
from app.core.logger import logger

class UserService:
    @staticmethod
    def _to_response(user: User) -> UserResponse:
        return UserResponse(
            id=user.id,
            username=user.username,
            email=user.email,
            created_at=user.created_at,
        )
        
    
    @classmethod
    def create_user(
        cls,
        db: Session,
        user: UserCreate,
    ) -> UserResponse:
    
        if UserRepository.email_exists(db,user.email,):
            raise ConflictError(
            "Email already exists."
            )
        
        if UserRepository.username_exists(db,user.username,):
            raise ConflictError("Username already exists")
          
        hashed_password = hash_password(user.password)
        
        created_user = UserRepository.create(
        db,
        username=user.username,
        email=user.email,
        hashed_password=hashed_password,
        )
        
        logger.info(
        "User registered successfully: id=%s username=%s",
        created_user.id,
        created_user.username,
        )
        
        return cls._to_response(created_user)
    
    
    @staticmethod
    def login(
        db: Session,
        user: UserLogin,
    ) -> Token:

        existing_user = UserRepository.get_by_email(
            db,
            user.email,
        )

        if (
            existing_user is None
            or not verify_password(
                user.password,
                existing_user.hashed_password,
            )
        ):
            raise ConflictError("Invalid email or password")

        logger.info(
            "User logged in: id=%s username=%s",
            existing_user.id,
            existing_user.username,
        )
        
        return Token(
            access_token=create_access_token(
                subject=str(existing_user.id),
            )
        )
        
    @classmethod
    def update_profile(
        cls,
        db: Session,
        current_user: User,
        user: UserUpdate,
    ) -> UserResponse:

        if (
            user.username is not None
            and user.username != current_user.username
        ):
            if UserRepository.username_exists(
                db,
                user.username,
            ):
                raise ConflictError(
                    "Username already exists."
                )

            current_user.username = user.username

        if (
            user.email is not None
            and user.email != current_user.email
        ):
            if UserRepository.email_exists(
                db,
                user.email,
            ):
                raise ConflictError(
                    "Email already exists."
                )

            current_user.email = user.email

        updated = UserRepository.update(
            db,
            current_user,
        )

        logger.info(
            "User %s updated profile.",
            current_user.id,
        )

        return cls._to_response(updated)
    
    @staticmethod
    def change_password(
        db: Session,
        current_user: User,
        passwords: PasswordUpdate,
    ) -> None:

        if not verify_password(
            passwords.current_password,
            current_user.hashed_password,
        ):
            raise ForbiddenError(
                "Current password is incorrect."
            )

        current_user.hashed_password = hash_password(
            passwords.new_password,
        )

        UserRepository.update(
            db,
            current_user,
        )

        logger.info(
            "User %s changed password.",
            current_user.id,
        )
        
    @staticmethod
    def delete_account(
        db: Session,
        current_user: User,
    ) -> None:

        logger.info(
            "User %s deleted account.",
            current_user.id,
        )

        UserRepository.delete(
            db,
            current_user,
        )