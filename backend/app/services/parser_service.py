import re
from typing import Dict


def parse_stack_trace(trace: str) -> Dict:
    """
    Parse a Python stack trace and extract:
    - exception type
    - error message
    - file name
    - line number
    """

    # Default response structure
    parsed_data = {
        "exception": "UnknownError",
        "message": "No message found",
        "file": "Unknown file",
        "line": -1,
    }

    if not trace or not trace.strip():
        return parsed_data

    # Extract exception and message
    exception_match = re.search(r"(\w+Error): (.+)", trace)
    if exception_match:
        parsed_data["exception"] = exception_match.group(1)
        parsed_data["message"] = exception_match.group(2)

    # Extract last file + line occurrence (most relevant frame)
    file_matches = re.findall(r'File "(.+?)", line (\d+)', trace)
    if file_matches:
        last_file, last_line = file_matches[-1]
        parsed_data["file"] = last_file
        parsed_data["line"] = int(last_line)

    return parsed_data
