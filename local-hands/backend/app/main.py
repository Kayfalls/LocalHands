from contextlib import asynccontextmanager

from fastapi import FastAPI

from app.api.routes import api_router
from app.auth.service import seed_default_users
from app.core.config import settings
from app.db.base import Base
from app.db.session import engine
from app.models import Job, User, WorkerProfile


@asynccontextmanager
async def lifespan(_app: FastAPI):
    Base.metadata.create_all(bind=engine)
    seed_default_users()
    yield


app = FastAPI(title=settings.project_name, version=settings.app_version, lifespan=lifespan)
app.include_router(api_router)


@app.get("/health", tags=["health"])
def health_check() -> dict[str, str]:
    return {"status": "ok", "service": settings.project_name, "environment": settings.environment}
