from pathlib import Path
from fastapi import APIRouter, UploadFile, File, HTTPException

from app.services.pdf_extractor import extract_text_from_pdf
from app.services.section_detector import extract_sections
from app.services.metadata_extractor import extract_metadata
from app.schemas.extraction_schema import ExtractionResponse

from app.utils.text_cleaner import clean_text
from app.utils.validators import validate_pdf
from app.utils.file_handler import save_text, save_json, create_directory

# FIX P7: Anchor all paths relative to this file, not the CWD
BASE_DIR = Path(__file__).resolve().parent.parent.parent  # → backend/

UPLOAD_DIR = BASE_DIR / "uploads"
EXTRACTED_DIR = BASE_DIR / "extracted"

create_directory(str(UPLOAD_DIR))
create_directory(str(EXTRACTED_DIR))

router = APIRouter()


@router.post("/upload", response_model=ExtractionResponse)  # FIX P6: typed response
async def upload_pdf(file: UploadFile = File(...)):

    # FIX P3: Proper validation with HTTPException
    validate_pdf(file.filename)

    file_path = UPLOAD_DIR / file.filename

    # FIX P8: Wrap I/O in try/except
    try:
        with open(file_path, "wb") as buffer:
            buffer.write(await file.read())
    except OSError as e:
        raise HTTPException(status_code=500, detail=f"Failed to save uploaded file: {e}")

    try:
        raw_text = extract_text_from_pdf(str(file_path))
    except Exception as e:
        raise HTTPException(status_code=422, detail=f"Failed to read PDF: {e}")

    # FIX P5: clean_text now preserves newlines
    cleaned_text = clean_text(raw_text)

    sections = extract_sections(cleaned_text)
    metadata = extract_metadata(cleaned_text)

    # FIX P4: Actually save extracted text and sections to disk
    stem = Path(file.filename).stem  # e.g. "ijsst07"
    paper_dir = EXTRACTED_DIR / stem
    create_directory(str(paper_dir))

    try:
        save_text(cleaned_text, str(paper_dir / "full_text.txt"))
        save_json(sections, str(paper_dir / "sections.json"))
        save_json(metadata, str(paper_dir / "metadata.json"))
    except OSError as e:
        raise HTTPException(status_code=500, detail=f"Failed to save extracted files: {e}")

    return ExtractionResponse(
        filename=file.filename,
        metadata=metadata,
        sections=sections,
        full_text=cleaned_text,
        saved_to=str(paper_dir),
    )