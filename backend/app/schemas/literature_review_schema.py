from pydantic import BaseModel


class LiteratureReviewRequest(BaseModel):
    text: str


class LiteratureReviewResponse(BaseModel):
    literature_review: str