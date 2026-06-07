from pydantic import BaseModel
from typing import List


class ReferenceRequest(BaseModel):
    text: str


class ReferenceResponse(BaseModel):
    references: List[str]