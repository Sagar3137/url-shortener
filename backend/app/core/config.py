from pydantic_settings import BaseSettings, SettingsConfigDict
from pydantic import Field

class Settings(BaseSettings):
    DATABASE_URL: str
    BASE_URL: str
    SHORT_CODE_LENGTH: int = 6
    FRONTEND_URL: str
    
    SECRET_KEY: str 

    ALGORITHM: str = "HS256"
    
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30

    APP_NAME: str = "snip"
    APP_VERSION: str = "1.0.0"
    model_config = SettingsConfigDict(
        env_file=".env",
        extra="ignore",
    )
    
    
settings = Settings()