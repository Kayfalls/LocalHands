from fastapi import APIRouter

from app.services.auth.schemas import LoginRequest, TokenResponse
from app.services.auth.service import login_user

router = APIRouter()


@router.post("/login", response_model=TokenResponse)
def login(payload: LoginRequest) -> TokenResponse:
    return login_user(payload)
