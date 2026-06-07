from pydantic import BaseModel
from typing import List


class ContributionRequest(BaseModel):
    text: str


class ContributionResponse(BaseModel):
    contributions: List[str]