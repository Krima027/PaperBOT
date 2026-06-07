# Render Deployment — Single Service (No CORS)

Frontend + Backend run on ONE Render service. Zero CORS issues.

## How it works
FastAPI serves the React build as static files.
All API calls use relative URLs (/upload, /summary, etc.)
Same origin = no CORS needed.

## Render Settings (Web Service)

| Setting | Value |
|---|---|
| **Root Directory** | *(leave blank — repo root)* |
| **Build Command** | `bash build.sh` |
| **Start Command** | `cd backend && uvicorn app.main:app --host 0.0.0.0 --port $PORT` |

## Environment Variables (set in Render dashboard)

| Key | Value |
|---|---|
| `GROQ_API_KEY` | your groq key |

> Do NOT set VITE_API_URL in Render — leaving it unset makes the frontend use relative URLs.

## Local Development

**Backend:**
```bash
cd backend
uvicorn app.main:app --reload --port 8000
```

**Frontend (separate terminal):**
```bash
cd frontend/body
npm install
npm run dev   # runs on http://localhost:5173
```

The frontend .env has VITE_API_URL=http://localhost:8000 for local dev.
