def generate_test_case(parsed_error: dict) -> str:
    """
    Generates a simple unit test based on error type.
    """

    error_type = parsed_error.get("error_type")

    if error_type == "ZeroDivisionError":
        return """
def test_zero_division():
    try:
        x = 10 / 0
        assert False, "Expected ZeroDivisionError"
    except ZeroDivisionError:
        assert True
"""

    elif error_type == "IndexError":
        return """
def test_index_error():
    try:
        arr = [1, 2, 3]
        x = arr[5]
        assert False, "Expected IndexError"
    except IndexError:
        assert True
"""

    return """
def test_generic():
    assert True
"""