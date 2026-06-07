from pathlib import Path


def load_prompt(filename: str):

    prompt_path = (
        Path(__file__).parent.parent
        / "prompts"
        / filename
    )

    with open(
        prompt_path,
        "r",
        encoding="utf-8"
    ) as f:

        return f.read()