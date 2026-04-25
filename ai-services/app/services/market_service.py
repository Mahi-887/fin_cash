import aiohttp
from app.core.config import settings


class MarketService:
    """Fetches market data from external APIs."""

    async def get_news_headlines(self, symbol: str) -> list[str]:
        """Retrieve recent news headlines for a stock symbol."""
        if not settings.FINNHUB_API_KEY:
            return [
                f"{symbol} reports strong quarterly earnings",
                f"Analysts upgrade {symbol} to buy",
                f"{symbol} expands into new markets",
            ]

        url = f"https://finnhub.io/api/v1/company-news?symbol={symbol}&from=2024-01-01&to=2024-12-31&token={settings.FINNHUB_API_KEY}"
        async with aiohttp.ClientSession() as session:
            async with session.get(url) as resp:
                if resp.status == 200:
                    data = await resp.json()
                    return [item["headline"] for item in data[:20] if "headline" in item]
        return []

    async def get_historical_prices(self, symbol: str, days: int = 90) -> list[float]:
        """Fetch historical closing prices for a symbol."""
        if not settings.ALPHA_VANTAGE_API_KEY:
            # Return synthetic data for demo
            import random
            base = 150.0
            prices = []
            for _ in range(days):
                base *= 1 + random.gauss(0, 0.01)
                prices.append(round(base, 2))
            return prices

        url = (
            f"https://www.alphavantage.co/query?function=TIME_SERIES_DAILY"
            f"&symbol={symbol}&apikey={settings.ALPHA_VANTAGE_API_KEY}&outputsize=compact"
        )
        async with aiohttp.ClientSession() as session:
            async with session.get(url) as resp:
                if resp.status == 200:
                    data = await resp.json()
                    ts = data.get("Time Series (Daily)", {})
                    prices = [float(v["4. close"]) for v in list(ts.values())[:days]]
                    return prices[::-1]
        return []
