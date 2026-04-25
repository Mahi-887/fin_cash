from pydantic import BaseModel
from typing import Optional


class HoldingSchema(BaseModel):
    symbol: str
    name: str
    quantity: float
    current_value: float
    weight: Optional[float] = None


class PortfolioSchema(BaseModel):
    id: str
    name: str
    total_value: float
    holdings: list[HoldingSchema]


class OptimizationResult(BaseModel):
    portfolio_id: str
    suggested_weights: dict[str, float]
    expected_return: float
    expected_risk: float
    sharpe_ratio: float
