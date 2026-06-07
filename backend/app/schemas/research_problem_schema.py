from pydantic import BaseModel


class ResearchProblemRequest(BaseModel):
    text: str


class ResearchProblemResponse(BaseModel):
    research_problem: str