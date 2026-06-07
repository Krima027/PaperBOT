from pydantic import BaseModel


class SectionSummaryRequest(BaseModel):
    sections: dict


class SectionSummaryResponse(BaseModel):
    abstract_summary: str
    introduction_summary: str
    methodology_summary: str
    results_summary: str
    conclusion_summary: str