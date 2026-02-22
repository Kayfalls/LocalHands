from fastapi import APIRouter, Depends

from app.core.security import get_current_user
from app.services.analytics.schemas import AnalyticsOverview
from app.services.analytics.service import get_overview

router = APIRouter()


@router.get("/overview", response_model=AnalyticsOverview)
def overview(_current_user: dict = Depends(get_current_user)) -> AnalyticsOverview:
    return get_overview()
