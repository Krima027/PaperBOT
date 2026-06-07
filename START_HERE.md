# PaperBOT – Quick Start Guide

## Prerequisites
- Python 3.10+
- Node.js 18+

---

## 1. Start the Backend

```bash
cd backend

# Install Python dependencies
pip install -r requirements.txt

# Run the server
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

The backend will be live at: http://127.0.0.1:8000  
Swagger docs: http://127.0.0.1:8000/docs

> **Note:** Your Gemini API key is already set in `backend/.env`.  
> If it expires, replace `GEMINI_API_KEY` in that file.

---

## 2. Start the Frontend

Open a **second terminal**:

```bash
cd frontend/body

# Install Node dependencies (first time only)
npm install

# Start the dev server
npm run dev
```

The app will open at: http://localhost:5173

---

## How to Use

1. **Upload** → Go to "Upload Paper", drag & drop a PDF
2. **Analysis** → See extracted sections + click "AI Deep Analysis" for research problem, methodology, results, etc.
3. **Summary** → Go to "Smart Summary" for TL;DR, key contributions, section summaries
4. **Writing** → Go to "AI Writing" for literature review, paraphrasing, abstract generator, grammar improvement, research gap finder

---

## Project Structure

```
backend/
  app/
    main.py              ← FastAPI app, all routes registered
    services/
      ai_service.py      ← All Gemini AI calls (fixed)
      pdf_extractor.py   ← PDF text extraction
      section_detector.py← Section parsing
      metadata_extractor.py
    routes/              ← One file per endpoint
    schemas/             ← Pydantic request/response models
  requirements.txt       ← Fixed (includes google-genai, python-dotenv)
  .env                   ← API key

frontend/body/
  src/
    api/paperApi.js      ← All backend API calls (fixed & complete)
    pages/
      UploadPage.jsx     ← Upload + stores result in localStorage
      AnalysisPage.jsx   ← Extracted sections + AI deep analysis tab (fixed)
      SummaryPage.jsx    ← TL;DR, contributions, section summaries
      WritingPage.jsx    ← All writing tools connected to real API (fixed)
    components/          ← Reusable UI components
    layouts/             ← Dashboard sidebar layout
