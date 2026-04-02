import ast


def validate_syntax(code: str) -> dict:
    """
    Validates whether the AI-generated code
    is syntactically correct Python.
    """

    try:
        ast.parse(code)
        return {
            "valid": True,
            "error": None,
        }
    except SyntaxError as e:
        return {
            "valid": False,
            "error": str(e),
        }