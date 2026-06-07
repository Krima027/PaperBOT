from fastapi import APIRouter

from app.schemas.summary_schema import (
    SummaryRequest,
    SummaryResponse
)

from app.services.ai_service import AIService


router = APIRouter(
    prefix="/summary",
    tags=["Summary"]
)


@router.post(
    "/",
    response_model=SummaryResponse
)
def generate_summary(
    request: SummaryRequest
):

    summary = AIService.generate_summary(
        request.text
    )

    return SummaryResponse(
        summary=summary
    )