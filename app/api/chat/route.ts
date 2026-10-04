import { GoogleGenAI } from "@google/genai";
import { createClient } from "@/lib/supabase/server";

const MAX_MESSAGES = 20;
const MAX_MESSAGE_LENGTH = 4_000;

type ChatMessage = {
  role: "user" | "model";
  content: string;
};

function isChatMessage(value: unknown): value is ChatMessage {
  if (!value || typeof value !== "object") return false;

  const message = value as Record<string, unknown>;
  return (
    (message.role === "user" || message.role === "model") &&
    typeof message.content === "string" &&
    message.content.trim().length > 0 &&
    message.content.length <= MAX_MESSAGE_LENGTH
  );
}

export async function POST(request: Request) {
  const supabase = await createClient();
  const { data } = await supabase.auth.getClaims();

  if (!data?.claims?.sub) {
    return Response.json({ error: "Sign in to use the assistant." }, { status: 401 });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return Response.json(
      { error: "Gemini is not configured. Add GEMINI_API_KEY to the server environment." },
      { status: 503 },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Request body must be valid JSON." }, { status: 400 });
  }

  const messages = (body as { messages?: unknown } | null)?.messages;
  if (
    !Array.isArray(messages) ||
    messages.length === 0 ||
    messages.length > MAX_MESSAGES ||
    !messages.every(isChatMessage) ||
    messages[messages.length - 1].role !== "user"
  ) {
    return Response.json({ error: "The conversation is invalid or too long." }, { status: 400 });
  }

  try {
    const ai = new GoogleGenAI({ apiKey });
    const response = await ai.models.generateContent({
      model: "gemini-flash-latest",
      contents: messages.map(({ role, content }) => ({
        role,
        parts: [{ text: content }],
      })),
    });
    const answer = response.text?.trim();

    if (!answer) {
      console.error("Gemini returned an empty response.");
      return Response.json(
        { error: "Gemini could not generate a response. Please try again." },
        { status: 502 },
      );
    }

    return Response.json({ answer });
  } catch (error) {
    console.error(
      "Gemini request failed:",
      error instanceof Error ? error.name : "Unknown error",
    );
    return Response.json(
      { error: "Gemini could not complete your request. Please try again." },
      { status: 502 },
    );
  }
}
