import re


def extract_sections(text):

    sections = {}

    patterns = {

        "abstract":
        r"^\s*(abstract)\b",

        "introduction":
        r"^\s*(\d+\.?\s*)?(introduction)\b",

        "methods":
        r"^\s*(\d+\.?\s*)?(methods?|methodology|framework|system design|experimental setup)\b",

        "results":
        r"^\s*(\d+\.?\s*)?(results|evaluation|findings|results and discussion)\b",

        "conclusion":
        r"^\s*(\d+\.?\s*)?(conclusion|conclusions|future work)\b",

        "references":
        r"^\s*(references|bibliography)\b"
    }

    positions = {}

    for section, pattern in patterns.items():

        match = re.search(
            pattern,
            text,
            re.IGNORECASE | re.MULTILINE
        )

        if match:
            positions[section] = match.start()

    sorted_sections = sorted(
        positions.items(),
        key=lambda x: x[1]
    )

    for i in range(len(sorted_sections)):

        current_name = sorted_sections[i][0]

        start = sorted_sections[i][1]

        if i < len(sorted_sections) - 1:
            end = sorted_sections[i + 1][1]
        else:
            end = len(text)

        content = text[start:end]

        sections[current_name] = content.strip()

    return sections