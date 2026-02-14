from fastapi import APIRouter
from app.schemas.analyze import AnalyzeRequest
from app.services.parser_service import parse_stack_trace

router = APIRouter()


@router.post("/analyze-error")
def analyze_error(request: AnalyzeRequest):
    parsed = parse_stack_trace(request.stack_trace)

    return {
        "parsed_error": parsed,
        "status": "analysis_complete"
    }
