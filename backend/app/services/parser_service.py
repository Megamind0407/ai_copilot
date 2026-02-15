import re
from typing import Dict, Optional


def parse_python_error(log_text: str, stack_trace: str) -> Dict[str, Optional[str]]:
    """
    Parse Python error logs and return structured debugging info.
    """

    error_type = None
    error_message = None
    file_name = None
    line_number = None

    # -------- Extract error type & message --------
    error_match = re.search(r"(\w+Error):\s*(.*)", log_text)
    if error_match:
        error_type = error_match.group(1)
        error_message = error_match.group(2)

    # -------- Extract file & line number --------
    file_match = re.search(r'File "(.+?)", line (\d+)', stack_trace)
    if file_match:
        file_name = file_match.group(1)
        line_number = file_match.group(2)

    return {
        "error_type": error_type,
        "error_message": error_message,
        "file_name": file_name,
        "line_number": line_number,
    }
