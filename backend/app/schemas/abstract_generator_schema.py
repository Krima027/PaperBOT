from pydantic import BaseModel


class AbstractGeneratorRequest(BaseModel):
    research_problem: str
    methodology: str
    results: str
    conclusion: str


class AbstractGeneratorResponse(BaseModel):
    abstract: str