from pydantic import BaseModel, EmailStr


class ProfileCreate(BaseModel):
    name: str
    email: EmailStr


class ProfileResponse(ProfileCreate):
    id: str
