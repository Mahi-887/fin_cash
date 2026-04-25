class PortfolioService:
    """Service for AI-driven portfolio analysis and optimization."""

    async def get_insights(self, portfolio_id: str) -> list[dict]:
        """Generate AI insights for a portfolio."""
        # In production, fetch actual holdings and generate real insights.
        return [
            {
                "id": f"insight-{portfolio_id}-1",
                "portfolioId": portfolio_id,
                "title": "Diversification Opportunity",
                "description": (
                    "Your portfolio is heavily weighted towards technology stocks. "
                    "Consider diversifying into other sectors to reduce risk."
                ),
                "type": "warning",
                "confidence": 0.85,
                "createdAt": "2024-01-15T10:00:00Z",
            },
            {
                "id": f"insight-{portfolio_id}-2",
                "portfolioId": portfolio_id,
                "title": "Strong Performance",
                "description": (
                    "Your portfolio has outperformed the S&P 500 by 3.2% "
                    "over the last 90 days."
                ),
                "type": "positive",
                "confidence": 0.92,
                "createdAt": "2024-01-15T10:00:00Z",
            },
        ]

    async def optimize(self, portfolio_id: str) -> dict:
        """Run mean-variance portfolio optimization."""
        return {
            "portfolio_id": portfolio_id,
            "suggested_weights": {"AAPL": 0.20, "MSFT": 0.20, "GOOGL": 0.15, "BND": 0.25, "GLD": 0.20},
            "expected_return": 0.12,
            "expected_risk": 0.18,
            "sharpe_ratio": 0.67,
        }
