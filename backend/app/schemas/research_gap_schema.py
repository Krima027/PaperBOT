from pydantic import BaseModel


class ResearchGapRequest(BaseModel):
    text: str


class ResearchGapResponse(BaseModel):
    research_gap: str