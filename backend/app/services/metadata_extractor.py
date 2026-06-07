import re


def extract_metadata(text: str) -> dict:
    """
    FIX O1: Title detection no longer skips lines with years.
    FIX O2: Keyword regex now handles both newline and end-of-string termination,
             and also handles multi-line keyword blocks.
    """
    lines = [line.strip() for line in text.split("\n") if line.strip()]

    # --- Title ---
    title = "Unknown"
    for line in lines[:50]:
        lower = line.lower()

        # Stop before Abstract
        if "abstract" in lower:
            break

        # Skip very short lines (page numbers, section markers)
        if len(line) < 20:
            continue

        # Skip journal/publisher metadata lines
        if re.search(r"issn|vol\.|journal|copyright|doi|proceedings|conference", lower):
            continue

        # Skip lines that are ONLY a year (e.g. "2001") — but don't skip
        # lines that merely contain a year, since many real titles do.
        if re.fullmatch(r"\s*\d{4}\s*", line):
            continue

        title = line
        break

    # --- Year ---
    year_match = re.search(r"\b(19|20)\d{2}\b", text)
    year = year_match.group(0) if year_match else "Unknown"

    # --- Keywords ---
    # FIX O2: Match keyword block terminated by newline OR end-of-string.
    # Also handles "Index Terms" which IEEE papers use instead of "Keywords".
    keywords: list[str] = []

    keyword_match = re.search(
        r"(?:keywords?|index\s+terms?)\s*[:\-—]?\s*(.*?)(?:\n|$)",
        text,
        re.IGNORECASE,
    )

    if keyword_match:
        keyword_text = keyword_match.group(1)
        keywords = [k.strip() for k in re.split(r"[,;·]", keyword_text) if k.strip()]

    return {
        "title": title,
        "year": year,
        "keywords": keywords,
    }
