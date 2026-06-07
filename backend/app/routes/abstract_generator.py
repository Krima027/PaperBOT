from fastapi import APIRouter

from app.services.ai_service import AIService

from app.schemas.abstract_generator_schema import (
    AbstractGeneratorRequest,
    AbstractGeneratorResponse
)

router = APIRouter(
    prefix="/abstract-generator",
    tags=["Abstract Generator"]
)


@router.post(
    "/",
    response_model=AbstractGeneratorResponse
)
def generate_abstract(
    request: AbstractGeneratorRequest
):

    abstract = AIService.generate_abstract(
        request.research_problem,
        request.methodology,
        request.results,
        request.conclusion
    )

    return AbstractGeneratorResponse(
        abstract=abstract
    )