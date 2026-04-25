from pydantic import BaseModel


class SentimentResult(BaseModel):
    symbol: str
    score: float
    label: str
    confidence: float
    headlines_analyzed: int
