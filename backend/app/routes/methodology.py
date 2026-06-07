from fastapi import APIRouter

from app.services.ai_service import AIService

from app.schemas.methodology_schema import (
    MethodologyRequest,
    MethodologyResponse
)

router = APIRouter(
    prefix="/methodology",
    tags=["Methodology"]
)


@router.post(
    "/",
    response_model=MethodologyResponse
)
def extract_methodology(
    request: MethodologyRequest
):

    methodology = (
        AIService.extract_methodology(
            request.text
        )
    )

    return MethodologyResponse(
        methodology=methodology
    )