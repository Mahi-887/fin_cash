from pydantic import BaseModel
from typing import Optional


class AdvisorRequest(BaseModel):
    user_id: str
    message: str
    session_id: Optional[str] = None
    portfolio_id: Optional[str] = None


class AdvisorResponse(BaseModel):
    reply: str
    session_id: str
    sources: Optional[list[str]] = None
