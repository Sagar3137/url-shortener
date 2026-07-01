from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from jwt import ExpiredSignatureError, InvalidTokenError
from sqlalchemy.orm import Session

from app.crud.user import UserRepository
from app.db.session import get_db
from app.models.user import User
from app.security.jwt import verify_access_token


bearer_scheme = HTTPBearer()

def get_current_user(
    credentials: HTTPAuthorizationCredentials = Depends(
        bearer_scheme,
    ),
    db: Session = Depends(get_db),
) -> User:
    try:
        payload = verify_access_token(
            credentials.credentials,
        )

    except (ExpiredSignatureError, InvalidTokenError) as e:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid or expired token",
        ) from e
        
        
    user_id = payload.get("sub")

    if user_id is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid token",
        )
        
    user = UserRepository.get_by_id(
    db,
    int(user_id),
    )
    
    if user is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="User not found",
        )
        
    return user
    
    