import uuid

from app.services.profile.schemas import ProfileCreate, ProfileResponse


def create_profile(payload: ProfileCreate) -> ProfileResponse:
    return ProfileResponse(id=str(uuid.uuid4()), **payload.model_dump())
