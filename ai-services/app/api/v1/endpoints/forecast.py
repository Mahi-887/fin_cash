from fastapi import APIRouter, Depends
from pydantic import BaseModel
from app.models.forecaster import Forecaster
from app.services.market_service import MarketService
from app.core.security import verify_api_key

router = APIRouter()


class ForecastRequest(BaseModel):
    symbol: str
    days: int = 30


@router.post("")
async def forecast_price(
    body: ForecastRequest,
    _: str = Depends(verify_api_key),
):
    market_service = MarketService()
    forecaster = Forecaster()
    prices = await market_service.get_historical_prices(body.symbol.upper(), days=90)
    return forecaster.forecast(body.symbol.upper(), prices, horizon=body.days)
