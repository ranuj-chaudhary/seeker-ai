---
paths:
  - "app/api/chat/**"
  - "components/dashboard/**"
---
# AI — Google Gemini

- Client library: `@google/genai`. Create it per request:
  `const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });`
- **Default model:** `gemini-flash-latest`. If you change it, note the reason in
  `memory-bank/techContext.md`.
- **`GEMINI_API_KEY` is server-only.** All Gemini calls happen in route handlers —
  never call Gemini from a `"use client"` component.
- Message shape: `{ role: "user" | "model", parts: [{ text: content }] }`.
- Enforce input limits as named constants (currently `MAX_MESSAGES = 20`,
  `MAX_MESSAGE_LENGTH = 4000`) and require the last message to be from the user.
- Read output with `response.text?.trim()`; if empty, log and return **502** with a
  friendly message.
- For job-search features: prefer **structured JSON output**, validate the shape
  before any DB write, batch/cache embeddings to control API cost, and never trust
  model output as SQL or HTML.
