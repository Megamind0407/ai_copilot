from fastapi import APIRouter
from app.schemas.analyze import AnalyzeRequest
from app.services.parser_service import parse_python_error

router = APIRouter()


@router.post("/analyze")
def analyze_log(request: AnalyzeRequest):
    parsed_data = parse_python_error(request.log_text, request.stack_trace)

    return {
        "status": "success",
        "parsed_error": parsed_data
    }
