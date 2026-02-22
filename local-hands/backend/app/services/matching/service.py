from app.services.matching.schemas import MatchItem, MatchResponse


def get_matches(job_id: str) -> MatchResponse:
    return MatchResponse(
        job_id=job_id,
        matches=[
            MatchItem(volunteer_id="vol-001", score=0.94),
            MatchItem(volunteer_id="vol-002", score=0.88),
        ],
    )
