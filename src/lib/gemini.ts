/**
 * Cliente mínimo de Gemini con streaming SSE. Sin SDK — fetch directo.
 *
 * Doc API: https://ai.google.dev/api/generate-content
 */

import { SYSTEM_PROMPT } from "./context";

export interface ChatTurn {
  role: "user" | "assistant";
  text: string;
}

interface StreamOptions {
  history: ChatTurn[];
  signal?: AbortSignal;
  onChunk: (text: string) => void;
}

const DEFAULT_MODEL = "gemini-2.5-flash";

export class GeminiKeyMissingError extends Error {
  constructor() {
    super("Falta configurar VITE_GEMINI_API_KEY en .env");
    this.name = "GeminiKeyMissingError";
  }
}

export class GeminiRateLimitError extends Error {
  constructor() {
    super("Demasiadas preguntas. Espera unos segundos e intenta de nuevo.");
    this.name = "GeminiRateLimitError";
  }
}

export class GeminiError extends Error {
  status?: number;
  constructor(message: string, status?: number) {
    super(message);
    this.name = "GeminiError";
    this.status = status;
  }
}

function getConfig() {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY?.trim();
  const model = import.meta.env.VITE_GEMINI_MODEL?.trim() || DEFAULT_MODEL;
  if (!apiKey) throw new GeminiKeyMissingError();
  return { apiKey, model };
}

/**
 * Convierte historial en `contents` para la API.
 * Gemini usa role "user" y "model" (no "assistant").
 */
function toContents(history: ChatTurn[]) {
  return history.map((t) => ({
    role: t.role === "assistant" ? "model" : "user",
    parts: [{ text: t.text }],
  }));
}

/**
 * Stream tokens de Gemini vía SSE.
 * Invoca onChunk(text) por cada delta. Resuelve al terminar el stream.
 * Lanza GeminiKeyMissingError, GeminiRateLimitError o GeminiError.
 */
export async function streamGemini({
  history,
  signal,
  onChunk,
}: StreamOptions): Promise<void> {
  const { apiKey, model } = getConfig();

  const url = `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(
    model
  )}:streamGenerateContent?alt=sse&key=${encodeURIComponent(apiKey)}`;

  const body = {
    system_instruction: { parts: [{ text: SYSTEM_PROMPT }] },
    contents: toContents(history),
    generationConfig: {
      temperature: 0.6,
      topP: 0.95,
      maxOutputTokens: 1024,
    },
    safetySettings: [
      { category: "HARM_CATEGORY_HARASSMENT", threshold: "BLOCK_ONLY_HIGH" },
      { category: "HARM_CATEGORY_HATE_SPEECH", threshold: "BLOCK_ONLY_HIGH" },
      { category: "HARM_CATEGORY_SEXUALLY_EXPLICIT", threshold: "BLOCK_ONLY_HIGH" },
      { category: "HARM_CATEGORY_DANGEROUS_CONTENT", threshold: "BLOCK_ONLY_HIGH" },
    ],
  };

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
    signal,
  });

  if (res.status === 429) throw new GeminiRateLimitError();
  if (!res.ok) {
    let detail = "";
    try {
      const json = await res.json();
      detail = json?.error?.message || "";
    } catch {
      /* ignore */
    }
    throw new GeminiError(
      detail || `Gemini respondió ${res.status}`,
      res.status
    );
  }

  if (!res.body) {
    throw new GeminiError("Respuesta sin cuerpo");
  }

  const reader = res.body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    buffer += decoder.decode(value, { stream: true });

    let nlIdx;
    while ((nlIdx = buffer.indexOf("\n")) !== -1) {
      const line = buffer.slice(0, nlIdx).trim();
      buffer = buffer.slice(nlIdx + 1);
      if (!line.startsWith("data:")) continue;
      const payload = line.slice(5).trim();
      if (!payload || payload === "[DONE]") continue;
      try {
        const obj = JSON.parse(payload);
        const text: string | undefined =
          obj?.candidates?.[0]?.content?.parts?.[0]?.text;
        if (text) onChunk(text);
      } catch {
        // payload malformado, ignorar
      }
    }
  }
}

export function isGeminiConfigured(): boolean {
  return Boolean(import.meta.env.VITE_GEMINI_API_KEY?.trim());
}
