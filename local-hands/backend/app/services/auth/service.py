from app.core.security import create_access_token
from app.services.auth.schemas import LoginRequest, TokenResponse


def login_user(payload: LoginRequest) -> TokenResponse:
    # Placeholder authentication flow.
    token = create_access_token(subject=payload.email)
    return TokenResponse(access_token=token)
