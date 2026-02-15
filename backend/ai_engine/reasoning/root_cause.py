from typing import Dict, List


def generate_root_cause(parsed_error: Dict) -> Dict:
    """
    Generate root cause explanation, reproduction steps,
    and possible fixes based on parsed error.

    MVP uses rule-based reasoning.
    Later this will be replaced by an LLM.
    """

    exception = parsed_error.get("exception", "UnknownError")
    message = parsed_error.get("message", "")

    root_cause = "Unable to determine root cause."
    reproduction: List[str] = []
    fixes: List[str] = []

    # ---- Rule-based reasoning ----

    if exception == "ZeroDivisionError":
        root_cause = "A division operation attempted to divide by zero."
        reproduction = [
            "Create a Python file.",
            "Write code that divides a number by 0.",
            "Run the script to trigger ZeroDivisionError.",
        ]
        fixes = [
            "Check if denominator is zero before division.",
            "Use try-except block to handle ZeroDivisionError.",
        ]

    elif exception == "ModuleNotFoundError":
        root_cause = "Python cannot find the required module in the environment."
        reproduction = [
            "Import a module that is not installed.",
            "Run the script to trigger ModuleNotFoundError.",
        ]
        fixes = [
            "Install the missing module using pip.",
            "Verify the correct virtual environment is activated.",
        ]

    elif exception == "TypeError":
        root_cause = "An operation was applied to an incompatible data type."
        reproduction = [
            "Use an unsupported operation between mismatched types.",
            "Run the script to trigger TypeError.",
        ]
        fixes = [
            "Ensure variables have correct data types.",
            "Add explicit type conversion where required.",
        ]

    else:
        root_cause = f"Unhandled exception type: {exception}. Manual debugging required."
        reproduction = ["Run the original script to observe the failure."]
        fixes = ["Inspect stack trace and validate input values."]

    return {
        "root_cause": root_cause,
        "reproduction_steps": reproduction,
        "possible_fixes": fixes,
        "confidence": 0.6,  # MVP static confidence
    }
