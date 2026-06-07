from fastapi import APIRouter

from app.services.ai_service import AIService

from app.schemas.reference_schema import (
    ReferenceRequest,
    ReferenceResponse
)

router = APIRouter(
    prefix="/references",
    tags=["References"]
)


@router.post(
    "/",
    response_model=ReferenceResponse
)
def extract_references(
    request: ReferenceRequest
):

    references = (
        AIService.extract_references(
            request.text
        )
    )

    return ReferenceResponse(
        references=references
    )