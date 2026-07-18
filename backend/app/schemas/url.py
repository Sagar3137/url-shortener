from datetime import datetime
from pydantic import BaseModel, HttpUrl, Field


class PaginatedURLResponse(BaseModel):
    items: list[URLListItem]
    page: int
    page_size: int
    total: int
    total_pages: int

class URLCreate(BaseModel):
    long_url: HttpUrl
    alias: str | None = Field(
        default=None,
        min_length=3,
        max_length=30,
        pattern=r"^[A-Za-z0-9_-]+$",
    )
    
class URLBase(BaseModel):
    id: int
    long_url: HttpUrl
    short_code: str
    short_url: str
    created_at: datetime

    model_config = {
        "from_attributes": True
    }


class URLResponse(URLBase):
    pass


class URLDetails(URLBase):
    clicks: int
    last_accessed: datetime | None = None
    
    
class URLUpdate(BaseModel):
    long_url: HttpUrl | None = None

    alias: str | None = Field(
        default=None,
        min_length=2,
        max_length=30,
        pattern=r"^[A-Za-z0-9_-]+$",
    )
    
class URLListItem(URLBase):
    clicks: int