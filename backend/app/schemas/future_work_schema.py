from pydantic import BaseModel


class FutureWorkRequest(BaseModel):
    text: str


class FutureWorkResponse(BaseModel):
    future_work: str