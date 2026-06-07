from pydantic import BaseModel
from typing import Dict, List


class MetadataSchema(BaseModel):
    title: str
    year: str
    keywords: List[str]


class ExtractionResponse(BaseModel):
    filename: str
    metadata: MetadataSchema
    sections: Dict[str, str]
    full_text: str
    saved_to: str