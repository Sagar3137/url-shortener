from pydantic import BaseModel

from app.schemas.url import URLListItem


class TopLink(BaseModel):
    short_code: str
    short_url: str
    clicks: int


class DashboardAnalytics(BaseModel):
    total_links: int
    total_clicks: int
    active_links: int

    top_link: TopLink | None = None

    recent_links: list[URLListItem]