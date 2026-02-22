from fastapi import APIRouter, Depends

from app.core.security import get_current_user
from app.services.matching.schemas import MatchResponse
from app.services.matching.service import get_matches

router = APIRouter()


@router.get("/{job_id}", response_model=MatchResponse)
def matches(job_id: str, _current_user: dict = Depends(get_current_user)) -> MatchResponse:
    return get_matches(job_id)
