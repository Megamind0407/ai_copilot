def validate_lint(code: str) -> dict:
    """
    Basic heuristic lint check.
    Can be extended to use pylint or flake8.
    """

    issues = []

    if "eval(" in code:
        issues.append("Use of eval() detected — security risk.")

    if "while True" in code:
        issues.append("Infinite loop risk detected.")

    return {
        "valid": len(issues) == 0,
        "issues": issues,
    }