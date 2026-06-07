from fastapi import APIRouter

from app.services.ai_service import AIService

from app.schemas.grammar_schema import (
    GrammarRequest,
    GrammarResponse
)

router = APIRouter(
    prefix="/grammar",
    tags=["Grammar Improvement"]
)


@router.post(
    "/",
    response_model=GrammarResponse
)
def improve_grammar(
    request: GrammarRequest
):

    result = AIService.improve_grammar(
        request.text
    )

    return GrammarResponse(
        improved_text=result
    )