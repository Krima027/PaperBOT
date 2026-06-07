from pydantic import BaseModel


class ResultsRequest(BaseModel):
    text: str


class ResultsResponse(BaseModel):
    results: str