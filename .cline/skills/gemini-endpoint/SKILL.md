---
name: gemini-endpoint
description: Add a new authenticated Next.js route handler that calls Google Gemini (@google/genai) for Seeker AI, following the existing /api/chat pattern with input validation, limits, error handling, and structured output. Use when creating or modifying AI features or Gemini API routes.
---
# Gemini Endpoint

Add `app/api/<name>/route.ts` following the established pattern in
`app/api/chat/route.ts`.

## Pattern
1. **Auth gate first** (import `createClient` from `@/lib/supabase/server`):
   ```ts
   const supabase = await createClient();
   const { data } = await supabase.auth.getClaims();
   if (!data?.claims?.sub) {
     return Response.json({ error: "Sign in to use the assistant." }, { status: 401 });
   }
   ```
2. **Config check:**
   ```ts
   const apiKey = process.env.GEMINI_API_KEY;
   if (!apiKey) {
     return Response.json({ error: "Gemini is not configured." }, { status: 503 });
   }
   ```
3. **Parse + validate** the body defensively (type guards; named `MAX_*` constants).
   Invalid input → `400`.
4. **Call Gemini:**
   ```ts
   const ai = new GoogleGenAI({ apiKey });
   const response = await ai.models.generateContent({
     model: "gemini-flash-latest",
     contents: messages.map(({ role, content }) => ({ role, parts: [{ text: content }] })),
   });
   const answer = response.text?.trim();
   ```
5. Empty output → log + `502`. Wrap the call in `try/catch`; log real error, return safe
   message with `502`.

## Structured output (for job features)
- Ask for JSON, parse with a schema/validator, and **validate before any DB write**.
- Never execute model output as SQL/HTML.
- Batch and cache embeddings; avoid re-embedding unchanged text.

## Checklist
- [ ] Auth-gated (401)
- [ ] Env check (503)
- [ ] Defensive validation (400)
- [ ] `try/catch` → safe 502
- [ ] Server-only key; no client-side Gemini
- [ ] Consistent `Response.json({ error })` shape
