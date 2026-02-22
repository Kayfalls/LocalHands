from fastapi import APIRouter

from app.services.analytics.routes import router as analytics_router
from app.services.auth.routes import router as auth_router
from app.services.jobs.routes import router as jobs_router
from app.services.matching.routes import router as matching_router
from app.services.profile.routes import router as profile_router

api_router = APIRouter()
api_router.include_router(auth_router, prefix="/auth", tags=["auth"])
api_router.include_router(profile_router, prefix="/profiles", tags=["profiles"])
api_router.include_router(jobs_router, prefix="/jobs", tags=["jobs"])
api_router.include_router(matching_router, prefix="/matches", tags=["matching"])
api_router.include_router(analytics_router, prefix="/analytics", tags=["analytics"])
