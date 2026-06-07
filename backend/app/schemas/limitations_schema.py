from pydantic import BaseModel


class LimitationsRequest(BaseModel):
    text: str


class LimitationsResponse(BaseModel):
    limitations: str