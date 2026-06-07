from fastapi import APIRouter

from app.services.ai_service import AIService

from app.schemas.research_problem_schema import (
    ResearchProblemRequest,
    ResearchProblemResponse
)

router = APIRouter(
    prefix="/research-problem",
    tags=["Research Problem"]
)


@router.post(
    "/",
    response_model=ResearchProblemResponse
)
def extract_problem(
    request: ResearchProblemRequest
):

    problem = (
        AIService.extract_research_problem(
            request.text
        )
    )

    return ResearchProblemResponse(
        research_problem=problem
    )