from sqlalchemy import select
from sqlalchemy.orm import Session

from app.models.user import User

class UserRepository:
    
    @staticmethod
    def create(
        db: Session,
        username: str,
        email: str,
        hashed_password: str,
    ) -> User:

        user = User(
            username=username,
            email=email,
            hashed_password=hashed_password,
        )

        db.add(user)
        db.commit()
        db.refresh(user)

        return user
    
    
    @staticmethod
    def get_by_email(
        db: Session,
        email: str,
    ) -> User | None:

        stmt = select(User).where(
            User.email == email
        )

        return db.scalar(stmt)
    
    
    @staticmethod
    def get_by_username(
        db: Session,
        username: str,
    ) -> User | None:

        stmt = select(User).where(
            User.username == username
        )

        return db.scalar(stmt)
    
    
    @staticmethod
    def email_exists(
        db: Session,
        email: str,
    ) -> bool:

        return (
            UserRepository.get_by_email(
                db,
                email,
            )
            is not None
        )
        
    
    @staticmethod
    def username_exists(
        db: Session,
        username: str,
    ) -> bool:

        return (
            UserRepository.get_by_username(
                db,
                username,
            )
            is not None
        )    
        
    
    @staticmethod
    def get_by_id(
        db: Session,
        user_id: int,
    ) -> User | None:
        stmt = select(User).where(
            User.id == user_id,
        )

        return db.scalar(stmt)