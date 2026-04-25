import uuid
from openai import AsyncOpenAI
from app.core.config import settings
from app.schemas.advisor import AdvisorRequest, AdvisorResponse

SYSTEM_PROMPT = """You are FinVerse AI, an expert financial advisor. You provide clear, 
actionable, and personalized financial advice based on the user's portfolio data and questions.
Always clarify that you provide educational information, not professional financial advice.
Be concise, friendly, and data-driven in your responses."""


class AdvisorService:
    def __init__(self):
        self.client = AsyncOpenAI(api_key=settings.OPENAI_API_KEY) if settings.OPENAI_API_KEY else None

    async def answer(self, request: AdvisorRequest) -> AdvisorResponse:
        session_id = request.session_id or str(uuid.uuid4())

        if not self.client:
            return AdvisorResponse(
                reply=(
                    "I'm sorry, the AI advisor is not configured. "
                    "Please set the OPENAI_API_KEY environment variable."
                ),
                session_id=session_id,
            )

        response = await self.client.chat.completions.create(
            model=settings.OPENAI_MODEL,
            messages=[
                {"role": "system", "content": SYSTEM_PROMPT},
                {"role": "user", "content": request.message},
            ],
            max_tokens=settings.MAX_TOKENS,
            temperature=settings.TEMPERATURE,
        )

        reply = response.choices[0].message.content or "I couldn't generate a response."
        return AdvisorResponse(reply=reply, session_id=session_id)
