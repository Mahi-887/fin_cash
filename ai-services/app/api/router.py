from fastapi import APIRouter
from app.api.v1.endpoints import advisor, portfolio, sentiment, forecast

api_router = APIRouter()

api_router.include_router(advisor.router, prefix="/v1/advisor", tags=["advisor"])
api_router.include_router(portfolio.router, prefix="/v1/portfolio", tags=["portfolio"])
api_router.include_router(sentiment.router, prefix="/v1/sentiment", tags=["sentiment"])
api_router.include_router(forecast.router, prefix="/v1/forecast", tags=["forecast"])
