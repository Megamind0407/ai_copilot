from app.ai_engine.llm.openai_client import OpenAIClient
from app.ai_engine.llm.gemini_client import GeminiClient
from app.ai_engine.llm.local_client import LocalLLMClient


class LLMRouter:
    """
    Routes prompts to the best available LLM provider.
    """

    def __init__(self):
        self.openai = OpenAIClient()
        self.gemini = GeminiClient()
        self.local = LocalLLMClient()

    def generate(self, prompt: str) -> dict:
        """
        Routing strategy:
        1. Try OpenAI (best quality)
        2. Fallback to Gemini
        3. Final fallback to local model
        """

        try:
            result = self.openai.generate(prompt)
            if result["confidence"] >= 0.85:
                return result
        except Exception:
            pass

        try:
            result = self.gemini.generate(prompt)
            if result["confidence"] >= 0.8:
                return result
        except Exception:
            pass

        # Final fallback
        return self.local.generate(prompt)