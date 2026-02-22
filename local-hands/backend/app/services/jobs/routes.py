from fastapi import APIRouter, Depends

from app.core.security import get_current_user
from app.services.jobs.schemas import JobCreate, JobResponse
from app.services.jobs.service import create_job

router = APIRouter()


@router.post("/", response_model=JobResponse)
def create(payload: JobCreate, _current_user: dict = Depends(get_current_user)) -> JobResponse:
    return create_job(payload)
