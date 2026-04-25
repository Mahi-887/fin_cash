from fastapi import APIRouter, Depends
from app.services.portfolio_service import PortfolioService
from app.core.security import verify_api_key

router = APIRouter()


@router.get("/{portfolio_id}/insights")
async def get_portfolio_insights(
    portfolio_id: str,
    _: str = Depends(verify_api_key),
):
    service = PortfolioService()
    return await service.get_insights(portfolio_id)


@router.post("/{portfolio_id}/optimize")
async def optimize_portfolio(
    portfolio_id: str,
    _: str = Depends(verify_api_key),
):
    service = PortfolioService()
    return await service.optimize(portfolio_id)
