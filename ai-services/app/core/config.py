from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env", extra="ignore")

    OPENAI_API_KEY: str = ""
    REDIS_URL: str = "redis://localhost:6379"
    AI_SERVICE_API_KEY: str = "internal_api_key"
    ALPHA_VANTAGE_API_KEY: str = ""
    FINNHUB_API_KEY: str = ""
    DEBUG: bool = False

    # Model settings
    OPENAI_MODEL: str = "gpt-4o-mini"
    MAX_TOKENS: int = 1024
    TEMPERATURE: float = 0.7


settings = Settings()
