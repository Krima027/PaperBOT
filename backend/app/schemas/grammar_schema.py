from pydantic import BaseModel


class GrammarRequest(BaseModel):
    text: str


class GrammarResponse(BaseModel):
    improved_text: str