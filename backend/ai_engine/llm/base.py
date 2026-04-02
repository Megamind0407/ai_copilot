from abc import ABC, abstractmethod


class BaseLLMClient(ABC):
    """
    Abstract base class for all LLM providers.
    Ensures every provider implements the same method.
    """

    @abstractmethod
    def generate(self, prompt: str) -> dict:
        pass