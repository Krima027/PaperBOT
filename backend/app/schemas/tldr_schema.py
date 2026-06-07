from pydantic import BaseModel


class TLDRRequest(BaseModel):
    text: str


class TLDRResponse(BaseModel):
    tldr: str