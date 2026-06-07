from pydantic import BaseModel


class DatasetRequest(BaseModel):
    text: str


class DatasetResponse(BaseModel):
    dataset: str