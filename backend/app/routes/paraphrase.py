from fastapi import APIRouter

from app.services.ai_service import AIService

from app.schemas.paraphrase_schema import (
    ParaphraseRequest,
    ParaphraseResponse
)

router = APIRouter(
    prefix="/paraphrase",
    tags=["Paraphrasing"]
)


@router.post(
    "/",
    response_model=ParaphraseResponse
)
def paraphrase_text(
    request: ParaphraseRequest
):

    result = AIService.paraphrase_text(
        request.text
    )

    return ParaphraseResponse(
        paraphrased_text=result
    )