from fastapi import APIRouter, Depends
from app.services.market_service import MarketService
from app.models.sentiment_analyzer import SentimentAnalyzer
from app.core.security import verify_api_key

router = APIRouter()


@router.get("/{symbol}")
async def get_sentiment(
    symbol: str,
    _: str = Depends(verify_api_key),
):
    market_service = MarketService()
    analyzer = SentimentAnalyzer()
    headlines = await market_service.get_news_headlines(symbol.upper())
    result = analyzer.analyze(headlines)
    return {"symbol": symbol.upper(), **result}
