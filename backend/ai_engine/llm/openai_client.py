from app.ai_engine.llm.base import BaseLLMClient


class OpenAIClient(BaseLLMClient):
    """
    Simulated OpenAI LLM client.
    Replace with real API call later.
    """

    def generate(self, prompt: str) -> dict:
        return {
            "root_cause": "Detected runtime logic error from OpenAI reasoning.",
            "fix": "Validate inputs and ensure safe execution before operation.",
            "confidence": 0.88,
            "provider": "openai",
        }