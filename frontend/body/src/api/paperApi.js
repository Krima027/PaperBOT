// In production: same origin, so BASE_URL = ""
// In local dev: reads VITE_API_URL from .env (e.g. http://localhost:8000)
const BASE_URL = import.meta.env.VITE_API_URL ?? "";

// ====================
// Upload PDF
// ====================
export const uploadPaper = async (file) => {
  console.log("Uploading file:", file);
  const formData = new FormData();
  formData.append("file", file);
  const response = await fetch(`${BASE_URL}/upload`, {
    method: "POST",
    body: formData,
  });
  console.log("Status:", response.status);
  if (!response.ok) {
    const text = await response.text();
    console.log("Backend error:", text);
    throw new Error(text);
  }
  const data = await response.json();
  console.log("Success:", data);
  return data;
};

// ====================
// Summary
// ====================
export const getSummary = async (text) => {
  const response = await fetch(`${BASE_URL}/summary/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text }),
  });
  return response.json();
};

// ====================
// TLDR
// ====================
export const getTLDR = async (text) => {
  const response = await fetch(`${BASE_URL}/tldr/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text }),
  });
  return response.json();
};

// ====================
// Contributions
// ====================
export const getContributions = async (text) => {
  const response = await fetch(`${BASE_URL}/contributions/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text }),
  });
  return response.json();
};

// ====================
// Section Summaries
// ====================
export const getSectionSummaries = async (sections) => {
  const response = await fetch(`${BASE_URL}/section-summary/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ sections }),
  });
  return response.json();
};

// ====================
// Research Problem
// ====================
export const getResearchProblem = async (text) => {
  const response = await fetch(`${BASE_URL}/research-problem/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text }),
  });
  return response.json();
};

// ====================
// Methodology
// ====================
export const getMethodology = async (text) => {
  const response = await fetch(`${BASE_URL}/methodology/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text }),
  });
  return response.json();
};

// ====================
// Dataset
// ====================
export const getDataset = async (text) => {
  const response = await fetch(`${BASE_URL}/dataset/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text }),
  });
  return response.json();
};

// ====================
// Results
// ====================
export const getResults = async (text) => {
  const response = await fetch(`${BASE_URL}/results/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text }),
  });
  return response.json();
};

// ====================
// Limitations
// ====================
export const getLimitations = async (text) => {
  const response = await fetch(`${BASE_URL}/limitations/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text }),
  });
  return response.json();
};

// ====================
// Future Work
// ====================
export const getFutureWork = async (text) => {
  const response = await fetch(`${BASE_URL}/future-work/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text }),
  });
  return response.json();
};

// ====================
// References
// ====================
export const getReferences = async (text) => {
  const response = await fetch(`${BASE_URL}/references/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text }),
  });
  return response.json();
};

// ====================
// Literature Review
// ====================
export const getLiteratureReview = async (text) => {
  const response = await fetch(`${BASE_URL}/literature-review/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text }),
  });
  return response.json();
};

// ====================
// Paraphrase
// ====================
export const getParaphrase = async (text) => {
  const response = await fetch(`${BASE_URL}/paraphrase/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text }),
  });
  return response.json();
};

// ====================
// Abstract Generator
// ====================
export const generateAbstract = async (research_problem, methodology, results, conclusion) => {
  const response = await fetch(`${BASE_URL}/abstract-generator/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ research_problem, methodology, results, conclusion }),
  });
  return response.json();
};

// ====================
// Research Gap
// ====================
export const getResearchGap = async (text) => {
  const response = await fetch(`${BASE_URL}/research-gap/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text }),
  });
  return response.json();
};

// ====================
// Grammar Improvement
// ====================
export const improveGrammar = async (text) => {
  const response = await fetch(`${BASE_URL}/grammar/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text }),
  });
  return response.json();
};
