import os
from groq import Groq
from dotenv import load_dotenv

load_dotenv()

client = Groq(api_key=os.getenv("GROQ_API_KEY"))


def _ask(prompt: str) -> str:
    try:
        response = client.chat.completions.create(
            model="llama-3.3-70b-versatile",
            messages=[{"role": "user", "content": prompt}],
            max_tokens=1024,
        )
        return response.choices[0].message.content.strip()
    except Exception as e:
        return f"AI error: {str(e)}"


class AIService:

    @staticmethod
    def generate_summary(text: str):
        if not text.strip():
            return "No text provided."
        return _ask(
            f"Summarize the following research paper text in 4-6 clear sentences. "
            f"Focus on the main contribution, method, and findings:\n\n{text[:4000]}"
        )

    @staticmethod
    def generate_tldr(text: str):
        if not text.strip():
            return "No text provided."
        return _ask(
            f"Write a TL;DR (1-2 sentences max) for this research paper:\n\n{text[:3000]}"
        )

    @staticmethod
    def summarize_section(text: str):
        if not text.strip():
            return "No content available."
        return _ask(
            f"Summarize this section of a research paper in 2-3 sentences:\n\n{text[:2000]}"
        )

    @staticmethod
    def generate_section_summaries(sections: dict):
        return {
            "abstract_summary":     AIService.summarize_section(sections.get("abstract", "")),
            "introduction_summary": AIService.summarize_section(sections.get("introduction", "")),
            "methodology_summary":  AIService.summarize_section(sections.get("methodology", "")),
            "results_summary":      AIService.summarize_section(sections.get("results", "")),
            "conclusion_summary":   AIService.summarize_section(sections.get("conclusion", "")),
        }

    @staticmethod
    def extract_contributions(text: str):
        if not text.strip():
            return []
        result = _ask(
            f"List the key contributions of this research paper as bullet points. "
            f"Return only the bullet list, no intro text:\n\n{text[:3000]}"
        )
        lines = [l.lstrip("-•* ").strip() for l in result.split("\n") if l.strip()]
        return lines

    @staticmethod
    def extract_research_problem(text: str):
        if not text.strip():
            return "No research problem found."
        return _ask(
            f"In 1-2 sentences, what is the core research problem or objective "
            f"of this paper?\n\n{text[:3000]}"
        )

    @staticmethod
    def extract_dataset(text: str):
        if not text.strip():
            return "Dataset not found."
        return _ask(
            f"What dataset(s) were used in this research paper? "
            f"If none are mentioned, say 'No dataset mentioned':\n\n{text[:3000]}"
        )

    @staticmethod
    def extract_methodology(text: str):
        if not text.strip():
            return "Methodology not found."
        return _ask(
            f"Describe the methodology or approach used in this research paper "
            f"in 2-3 sentences:\n\n{text[:3000]}"
        )

    @staticmethod
    def extract_results(text: str):
        if not text.strip():
            return "Results not found."
        return _ask(
            f"What were the main results or findings of this research paper? "
            f"Be specific with any numbers or metrics mentioned:\n\n{text[:3000]}"
        )

    @staticmethod
    def extract_limitations(text: str):
        if not text.strip():
            return "Limitations not found."
        return _ask(
            f"What are the limitations of this research paper? "
            f"If not explicitly stated, infer from context:\n\n{text[:3000]}"
        )

    @staticmethod
    def extract_future_work(text: str):
        if not text.strip():
            return "Future work not found."
        return _ask(
            f"What future work or directions do the authors suggest "
            f"in this paper?\n\n{text[:3000]}"
        )

    @staticmethod
    def extract_references(text: str):
        if not text.strip():
            return []
        result = _ask(
            f"Extract and list the references from this text. "
            f"Return only the reference list, one per line:\n\n{text[:4000]}"
        )
        return [l.strip() for l in result.split("\n") if l.strip()]

    @staticmethod
    def generate_literature_review(text: str):
        if not text.strip():
            return "No content provided."
        return _ask(
            f"Write a short literature review paragraph (150-200 words) based on "
            f"this research paper's related work and background:\n\n{text[:4000]}"
        )

    @staticmethod
    def paraphrase_text(text: str):
        if not text.strip():
            return "No text provided."
        return _ask(
            f"Paraphrase the following text in academic style. "
            f"Keep the meaning but rephrase completely:\n\n{text}"
        )

    @staticmethod
    def generate_abstract(research_problem, methodology, results, conclusion):
        return _ask(
            f"Write a professional academic abstract using these components:\n"
            f"Research Problem: {research_problem}\n"
            f"Methodology: {methodology}\n"
            f"Results: {results}\n"
            f"Conclusion: {conclusion}\n\n"
            f"Keep it 150-250 words, formal academic tone."
        )

    @staticmethod
    def identify_research_gap(text: str):
        if not text.strip():
            return "Research gap not found."
        return _ask(
            f"Identify the research gap this paper addresses, or gaps that still "
            f"exist after this work. Answer in 2-3 sentences:\n\n{text[:3000]}"
        )

    @staticmethod
    def improve_grammar(text: str):
        if not text.strip():
            return "No text provided."
        return _ask(
            f"Improve the grammar and academic style of this text. "
            f"Return only the corrected text, no explanations:\n\n{text}"
        )
