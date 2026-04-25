import numpy as np


class PortfolioOptimizer:
    """Mean-variance portfolio optimizer using Monte Carlo simulation."""

    def optimize(
        self,
        symbols: list[str],
        returns: list[list[float]],
        num_portfolios: int = 5000,
    ) -> dict:
        """
        Simulate random portfolios and return the one with the highest Sharpe ratio.
        `returns` is a list of daily return series, one per symbol.
        """
        if not symbols or not returns:
            return {}

        returns_matrix = np.array(returns)  # shape: (n_assets, n_days)
        mean_returns = returns_matrix.mean(axis=1)
        cov_matrix = np.cov(returns_matrix)

        best_sharpe = -np.inf
        best_weights: np.ndarray = np.array([])

        for _ in range(num_portfolios):
            weights = np.random.dirichlet(np.ones(len(symbols)))
            port_return = float(np.dot(weights, mean_returns) * 252)
            port_risk = float(np.sqrt(weights @ cov_matrix @ weights) * np.sqrt(252))
            sharpe = port_return / port_risk if port_risk > 0 else 0.0
            if sharpe > best_sharpe:
                best_sharpe = sharpe
                best_weights = weights

        return {
            "weights": {sym: round(float(w), 4) for sym, w in zip(symbols, best_weights)},
            "expected_return": round(float(np.dot(best_weights, mean_returns) * 252), 4),
            "expected_risk": round(
                float(np.sqrt(best_weights @ cov_matrix @ best_weights) * np.sqrt(252)), 4
            ),
            "sharpe_ratio": round(best_sharpe, 4),
        }
