import re

def clean_text(text: str) -> str:

    # Collapse horizontal whitespace (spaces/tabs) only — NOT newlines
    text = re.sub(r"[ \t]+", " ", text)

    # Collapse multiple blank lines into one — but keep single newlines
    text = re.sub(r"\n{3,}", "\n\n", text)

    return text.strip()
