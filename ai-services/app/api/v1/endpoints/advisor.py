from fastapi import APIRouter, Depends
from app.schemas.advisor import AdvisorRequest, AdvisorResponse
from app.services.advisor_service import AdvisorService
from app.core.security import verify_api_key

router = APIRouter()


@router.post("", response_model=AdvisorResponse)
async def ask_advisor(
    body: AdvisorRequest,
    _: str = Depends(verify_api_key),
):
    service = AdvisorService()
    return await service.answer(body)
