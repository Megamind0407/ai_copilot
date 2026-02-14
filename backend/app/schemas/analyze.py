from pydantic import BaseModel
from typing import Optional


class AnalyzeRequest(BaseModel):
    stack_trace: str
    code_snippet: Optional[str] = None
