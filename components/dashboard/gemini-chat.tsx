"use client";

import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";

type Message = {
  role: "user" | "model";
  content: string;
};

export function GeminiChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [prompt, setPrompt] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function sendMessage(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const content = prompt.trim();

    if (!content || isLoading) return;

    const conversation = [...messages.slice(-18), { role: "user" as const, content }];
    setMessages(conversation);
    setPrompt("");
    setError("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: conversation }),
      });
      const result: { answer?: string; error?: string } = await response.json();

      if (!response.ok || !result.answer) {
        throw new Error(result.error ?? "Gemini could not complete your request.");
      }

      setMessages([...conversation, { role: "model", content: result.answer }]);
    } catch (requestError) {
      setMessages(messages);
      setPrompt(content);
      setError(
        requestError instanceof Error
          ? requestError.message
          : "Gemini could not complete your request. Please try again.",
      );
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <section className="space-y-4 rounded-xl border border-border bg-card p-6">
      <div>
        <h2 className="text-lg font-semibold">Ask Gemini</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Research a topic or ask a question. Powered by Gemini Flash.
        </p>
      </div>

      <div
        aria-live="polite"
        className="max-h-[28rem] min-h-32 space-y-4 overflow-y-auto rounded-lg bg-muted/50 p-4"
      >
        {messages.length === 0 ? (
          <p className="py-8 text-center text-sm text-muted-foreground">
            Your conversation will appear here.
          </p>
        ) : (
          messages.map((message, index) => (
            <div
              key={`${index}-${message.role}`}
              className={`max-w-[85%] whitespace-pre-wrap rounded-lg px-4 py-3 text-sm ${
                message.role === "user"
                  ? "ml-auto bg-primary text-primary-foreground"
                  : "bg-card text-card-foreground"
              }`}
            >
              {message.content}
            </div>
          ))
        )}
        {isLoading && (
          <p className="text-sm text-muted-foreground">Gemini is thinking…</p>
        )}
      </div>

      <form onSubmit={sendMessage} className="space-y-3">
        <label htmlFor="gemini-prompt" className="sr-only">
          Message Gemini
        </label>
        <textarea
          id="gemini-prompt"
          value={prompt}
          onChange={(event) => setPrompt(event.target.value)}
          maxLength={4_000}
          rows={3}
          placeholder="What would you like to research?"
          className="w-full resize-y rounded-md border border-input bg-background px-3 py-2 text-sm outline-none placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring/30"
          disabled={isLoading}
        />
        {error && (
          <p role="alert" className="text-sm text-destructive">
            {error}
          </p>
        )}
        <div className="flex justify-end">
          <Button type="submit" size="lg" disabled={isLoading || !prompt.trim()}>
            {isLoading ? "Sending..." : "Send"}
          </Button>
        </div>
      </form>
    </section>
  );
}
