from fastapi import APIRouter

from app.services.ai_service import AIService

from app.schemas.results_schema import (
    ResultsRequest,
    ResultsResponse
)

router = APIRouter(
    prefix="/results",
    tags=["Results"]
)


@router.post(
    "/",
    response_model=ResultsResponse
)
def extract_results(
    request: ResultsRequest
):

    results = AIService.extract_results(
        request.text
    )

    return ResultsResponse(
        results=results
    )