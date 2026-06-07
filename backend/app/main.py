from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from pathlib import Path

from app.routes.upload import router as upload_router
from app.routes.summary import router as summary_router
from app.routes.tldr import router as tldr_router
from app.routes.section_summary import router as section_summary_router
from app.routes.contributions import router as contributions_router
from app.routes.research_problem import router as research_problem_router
from app.routes.dataset import router as dataset_router
from app.routes.methodology import router as methodology_router
from app.routes.results import router as results_router
from app.routes.limitations import router as limitations_router
from app.routes.future_work import router as future_work_router
from app.routes.references import router as references_router
from app.routes.literature_review import router as literature_review_router
from app.routes.paraphrase import router as paraphrase_router
from app.routes.abstract_generator import router as abstract_generator_router
from app.routes.research_gap import router as research_gap_router
from app.routes.grammar import router as grammar_router

app = FastAPI(title="PaperBOT API", version="1.0.0")

# CORS only needed for local dev now (same origin in production)
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "https://paperbot-1-54ll.onrender.com"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ── API routes ──────────────────────────────────────────────
app.include_router(upload_router)
app.include_router(summary_router)
app.include_router(tldr_router)
app.include_router(section_summary_router)
app.include_router(contributions_router)
app.include_router(research_problem_router)
app.include_router(dataset_router)
app.include_router(methodology_router)
app.include_router(results_router)
app.include_router(limitations_router)
app.include_router(future_work_router)
app.include_router(references_router)
app.include_router(literature_review_router)
app.include_router(paraphrase_router)
app.include_router(abstract_generator_router)
app.include_router(research_gap_router)
app.include_router(grammar_router)

# ── Serve React frontend build ───────────────────────────────
FRONTEND_BUILD = Path(__file__).resolve().parent.parent.parent / "frontend" / "body" / "dist"

if FRONTEND_BUILD.exists():
    # Serve static assets (JS, CSS, images)
    app.mount("/assets", StaticFiles(directory=str(FRONTEND_BUILD / "assets")), name="assets")

    # Catch-all: serve index.html for any non-API route (React Router support)
    @app.get("/{full_path:path}")
    async def serve_react(full_path: str):
        index = FRONTEND_BUILD / "index.html"
        return FileResponse(str(index))
else:
    @app.get("/")
    def home():
        return {"message": "PaperBOT API Running. Frontend not built yet."}
