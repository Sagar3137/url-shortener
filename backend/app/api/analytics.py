from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.db.session import get_db
from app.models.user import User
from app.schemas.analytics import DashboardAnalytics
from app.security.dependencies import get_current_user
from app.services.analytics_service import AnalyticsService


router = APIRouter(
    prefix="/analytics",
    tags=["Analytics"],
)


@router.get(
    "",
    response_model=DashboardAnalytics,
)
def get_dashboard_analytics(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return AnalyticsService.get_dashboard_analytics(
        db=db,
        current_user=current_user,
    )