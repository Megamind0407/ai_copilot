from app.ai_engine.validation.syntax_validator import validate_syntax
from app.ai_engine.validation.lint_validator import validate_lint


def validate_ai_fix(fix_code: str) -> dict:
    """
    Runs multi-stage validation on AI-generated fix.
    """

    syntax_result = validate_syntax(fix_code)

    if not syntax_result["valid"]:
        return {
            "approved": False,
            "reason": "Syntax Error",
            "details": syntax_result["error"],
        }

    lint_result = validate_lint(fix_code)

    if not lint_result["valid"]:
        return {
            "approved": False,
            "reason": "Lint Issues",
            "details": lint_result["issues"],
        }

    return {
        "approved": True,
        "reason": "Validation Passed",
        "details": None,
    }