from fastapi import APIRouter

from app.services.ai_service import AIService

from app.schemas.contribution_schema import (
    ContributionRequest,
    ContributionResponse
)

router = APIRouter(
    prefix="/contributions",
    tags=["Contributions"]
)


@router.post(
    "/",
    response_model=ContributionResponse
)
def generate_contributions(
    request: ContributionRequest
):

    contributions = (
        AIService.extract_contributions(
            request.text
        )
    )

    return ContributionResponse(
        contributions=contributions
    )