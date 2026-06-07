from fastapi import APIRouter

from app.services.ai_service import AIService

from app.schemas.limitations_schema import (
    LimitationsRequest,
    LimitationsResponse
)

router = APIRouter(
    prefix="/limitations",
    tags=["Limitations"]
)


@router.post(
    "/",
    response_model=LimitationsResponse
)
def extract_limitations(
    request: LimitationsRequest
):

    limitations = (
        AIService.extract_limitations(
            request.text
        )
    )

    return LimitationsResponse(
        limitations=limitations
    )