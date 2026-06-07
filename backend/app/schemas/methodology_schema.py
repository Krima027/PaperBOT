from pydantic import BaseModel


class MethodologyRequest(BaseModel):
    text: str


class MethodologyResponse(BaseModel):
    methodology: str