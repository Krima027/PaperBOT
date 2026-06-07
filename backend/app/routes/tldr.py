from fastapi import APIRouter

from app.schemas.tldr_schema import (
    TLDRRequest,
    TLDRResponse
)

from app.services.ai_service import AIService

router = APIRouter(
    prefix="/tldr",
    tags=["TLDR"]
)


@router.post(
    "/",
    response_model=TLDRResponse
)
def generate_tldr(
    request: TLDRRequest
):

    tldr = AIService.generate_tldr(
        request.text
    )

    return TLDRResponse(
        tldr=tldr
    )