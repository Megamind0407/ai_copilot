from app.ai_engine.llm.base import BaseLLMClient


class GeminiClient(BaseLLMClient):
    """
    Simulated Gemini LLM client.
    """

    def generate(self, prompt: str) -> dict:
        return {
            "root_cause": "Gemini analysis suggests incorrect variable state handling.",
            "fix": "Add guards and verify state transitions before computation.",
            "confidence": 0.86,
            "provider": "gemini",
        }