from app.ai_engine.reasoning.root_cause import generate_root_cause
from app.ai_engine.llm.prompt_builder import build_debug_prompt
from app.ai_engine.llm.router import LLMRouter
from app.ai_engine.validation.validation_engine import validate_ai_fix
from app.ai_engine.testing.test_engine import execute_test_pipeline

CONFIDENCE_THRESHOLD = 0.85
llm_router = LLMRouter()


def hybrid_debug(parsed_error: dict, code_snippet: str | None) -> dict:
    """
    Combines rule-based reasoning with multi-LLM fallback.
    """

    # Step 1 — rule engine
    rule_result = generate_root_cause(parsed_error)

    if rule_result["confidence"] >= CONFIDENCE_THRESHOLD:
        return {
            "source": "rule_engine",
            **rule_result,
        }

    # Step 2 — build prompt
    prompt = build_debug_prompt(parsed_error, code_snippet)

    # Step 3 — route to best LLM
    llm_result = llm_router.generate(prompt)

    # Validate fix suggestion if code exists
    fix_code = llm_result.get("fix", "")

    validation = validate_ai_fix(fix_code)

    test_results = execute_test_pipeline(parsed_error)

return {
    "source": "llm_router",
    "analysis": llm_result,
    "validation": validation,
    "testing": test_results,
}