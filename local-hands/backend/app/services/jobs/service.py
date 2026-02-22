import uuid

from app.services.jobs.schemas import JobCreate, JobResponse


def create_job(payload: JobCreate) -> JobResponse:
    return JobResponse(id=str(uuid.uuid4()), **payload.model_dump())
