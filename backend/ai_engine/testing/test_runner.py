import subprocess
import tempfile
import os


def run_test(test_code: str) -> dict:
    """
    Runs the generated test safely in a temporary file.
    """

    try:
        with tempfile.TemporaryDirectory() as temp_dir:
            test_file = os.path.join(temp_dir, "test_case.py")

            with open(test_file, "w") as f:
                f.write(test_code)

            result = subprocess.run(
                ["python", test_file],
                capture_output=True,
                text=True,
                timeout=5
            )

            return {
                "passed": result.returncode == 0,
                "output": result.stdout,
                "error": result.stderr,
            }

    except Exception as e:
        return {
            "passed": False,
            "error": str(e),
        }