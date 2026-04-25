class SentimentAnalyzer:
    """Rule-based sentiment analyzer for financial headlines."""

    POSITIVE_WORDS = {
        "strong", "growth", "record", "beat", "upgrade", "buy", "outperform",
        "profit", "surge", "gain", "rise", "boost", "positive", "expand",
        "revenue", "earnings", "above", "exceed", "rally",
    }
    NEGATIVE_WORDS = {
        "loss", "decline", "downgrade", "sell", "underperform", "miss", "cut",
        "weak", "fall", "drop", "concern", "risk", "deficit", "below",
        "layoff", "recall", "investigation", "fine", "penalty",
    }

    def analyze(self, headlines: list[str]) -> dict:
        if not headlines:
            return {"score": 0.0, "label": "neutral", "confidence": 0.0, "headlines_analyzed": 0}

        scores = []
        for headline in headlines:
            words = set(headline.lower().split())
            pos = len(words & self.POSITIVE_WORDS)
            neg = len(words & self.NEGATIVE_WORDS)
            if pos + neg == 0:
                scores.append(0.0)
            else:
                scores.append((pos - neg) / (pos + neg))

        avg_score = sum(scores) / len(scores)
        label = "positive" if avg_score > 0.1 else "negative" if avg_score < -0.1 else "neutral"
        confidence = min(abs(avg_score) + 0.3, 1.0)

        return {
            "score": round(avg_score, 3),
            "label": label,
            "confidence": round(confidence, 3),
            "headlines_analyzed": len(headlines),
        }
