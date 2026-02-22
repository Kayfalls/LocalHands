from pydantic import BaseModel


class MatchItem(BaseModel):
    volunteer_id: str
    score: float


class MatchResponse(BaseModel):
    job_id: str
    matches: list[MatchItem]
