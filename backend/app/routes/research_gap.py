from fastapi import APIRouter

from app.services.ai_service import AIService

from app.schemas.research_gap_schema import (
    ResearchGapRequest,
    ResearchGapResponse
)

router = APIRouter(
    prefix="/research-gap",
    tags=["Research Gap"]
)


@router.post(
    "/",
    response_model=ResearchGapResponse
)
def identify_gap(
    request: ResearchGapRequest
):

    gap = AIService.identify_research_gap(
        request.text
    )

    return ResearchGapResponse(
        research_gap=gap
    )