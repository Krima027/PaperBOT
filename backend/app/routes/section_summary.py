from fastapi import APIRouter

from app.services.ai_service import AIService

from app.schemas.section_summary_schema import (
    SectionSummaryRequest,
    SectionSummaryResponse
)

router = APIRouter(
    prefix="/section-summary",
    tags=["Section Summary"]
)


@router.post(
    "/",
    response_model=SectionSummaryResponse
)
def generate_section_summary(
    request: SectionSummaryRequest
):

    summaries = (
        AIService.generate_section_summaries(
            request.sections
        )
    )

    return SectionSummaryResponse(
        **summaries
    )