from fastapi import APIRouter

from app.services.ai_service import AIService

from app.schemas.literature_review_schema import (
    LiteratureReviewRequest,
    LiteratureReviewResponse
)

router = APIRouter(
    prefix="/literature-review",
    tags=["Literature Review"]
)


@router.post(
    "/",
    response_model=LiteratureReviewResponse
)
def generate_review(
    request: LiteratureReviewRequest
):

    review = (
        AIService.generate_literature_review(
            request.text
        )
    )

    return LiteratureReviewResponse(
        literature_review=review
    )