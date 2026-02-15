from pydantic import BaseModel
from typing import Optional


class AnalyzeRequest(BaseModel):
    log_text: str
    stack_trace: str
    code_snippet: Optional[str] = None
