from app.ai_engine.llm.base import BaseLLMClient


class LocalLLMClient(BaseLLMClient):
    """
    Offline/local lightweight reasoning fallback.
    """

    def generate(self, prompt: str) -> dict:
        return {
            "root_cause": "Basic heuristic analysis from local model.",
            "fix": "Review logic manually and add validation checks.",
            "confidence": 0.6,
            "provider": "local",
        }