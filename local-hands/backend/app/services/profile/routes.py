from fastapi import APIRouter, Depends

from app.core.security import get_current_user
from app.services.profile.schemas import ProfileCreate, ProfileResponse
from app.services.profile.service import create_profile

router = APIRouter()


@router.post("/", response_model=ProfileResponse)
def create(payload: ProfileCreate, _current_user: dict = Depends(get_current_user)) -> ProfileResponse:
    return create_profile(payload)
