from fastapi import APIRouter

from app.services.ai_service import AIService

from app.schemas.future_work_schema import (
    FutureWorkRequest,
    FutureWorkResponse
)

router = APIRouter(
    prefix="/future-work",
    tags=["Future Work"]
)


@router.post(
    "/",
    response_model=FutureWorkResponse
)
def extract_future_work(
    request: FutureWorkRequest
):

    future_work = (
        AIService.extract_future_work(
            request.text
        )
    )

    return FutureWorkResponse(
        future_work=future_work
    )