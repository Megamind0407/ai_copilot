from app.ai_engine.testing.test_generator import generate_test_case
from app.ai_engine.testing.test_runner import run_test


def execute_test_pipeline(parsed_error: dict) -> dict:
    """
    Full test pipeline:
    Generate → Execute → Return result
    """

    test_code = generate_test_case(parsed_error)
    result = run_test(test_code)

    return {
        "test_code": test_code,
        "test_result": result,
    }