from sqlalchemy.orm import Session

from app.core.config import settings
from app.crud.url import URLRepository
from app.models.user import User
from app.schemas.analytics import (
    DashboardAnalytics,
    TopLink,
)
from app.schemas.url import URLListItem


class AnalyticsService:

    @staticmethod
    def get_dashboard_analytics(
        db: Session,
        current_user: User,
    ) -> DashboardAnalytics:

        total_links = URLRepository.get_total_links(
            db,
            current_user.id,
        )

        total_clicks = URLRepository.get_total_clicks(
            db,
            current_user.id,
        )

        top = URLRepository.get_top_link(
            db,
            current_user.id,
        )

        recent = URLRepository.get_recent_links(
            db,
            current_user.id,
        )

        return DashboardAnalytics(
            total_links=total_links,
            total_clicks=total_clicks,
            active_links=total_links,
            top_link=(
                TopLink(
                    short_code=top.short_code,
                    short_url=f"{settings.BASE_URL}/{top.short_code}",
                    clicks=top.clicks,
                )
                if top
                else None
            ),
            recent_links=[
                URLListItem(
                    id=url.id,
                    long_url=url.long_url,
                    short_code=url.short_code,
                    short_url=f"{settings.BASE_URL}/{url.short_code}",
                    created_at=url.created_at,
                    clicks=url.clicks,
                )
                for url in recent
            ],
        )