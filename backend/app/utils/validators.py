from fastapi import HTTPException


ALLOWED_MIME = {"application/pdf"}
ALLOWED_EXTENSIONS = {".pdf"}


def validate_pdf(filename: str) -> None:
    """
    FIX P3: Raises HTTPException (not a plain dict) so FastAPI returns
    proper 400 status. Checks extension case-insensitively.
    """
    import os
    ext = os.path.splitext(filename)[-1].lower()
    if ext not in ALLOWED_EXTENSIONS:
        raise HTTPException(
            status_code=400,
            detail=f"Invalid file type '{ext}'. Only PDF files are accepted.",
        )
