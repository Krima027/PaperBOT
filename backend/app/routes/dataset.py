from fastapi import APIRouter

from app.services.ai_service import AIService

from app.schemas.dataset_schema import (
    DatasetRequest,
    DatasetResponse
)

router = APIRouter(
    prefix="/dataset",
    tags=["Dataset"]
)


@router.post(
    "/",
    response_model=DatasetResponse
)
def extract_dataset(
    request: DatasetRequest
):

    dataset = AIService.extract_dataset(
        request.text
    )

    return DatasetResponse(
        dataset=dataset
    )