from fastapi import FastAPI

from app.api.routes import api_router
from app.core.config import settings

app = FastAPI(title=settings.project_name, version="0.1.0")
app.include_router(api_router)


@app.get("/health", tags=["health"])
def health_check() -> dict[str, str]:
    return {"status": "ok", "service": settings.project_name}
