from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# FIX P1+P2: Register the correct (upload) router, not the dead extract router
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

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173", "https://paper-liv9q9cyi-krima027s-projects.vercel.app/"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

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


@app.get("/")
def home():
    return {"message": "PaperBOT API Running Successfully"}
