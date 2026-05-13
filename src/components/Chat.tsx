import { useEffect, useRef, useState, type ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  streamGemini,
  isGeminiConfigured,
  GeminiKeyMissingError,
  GeminiRateLimitError,
  type ChatTurn,
} from "../lib/gemini";
import { SUGGESTED_QUESTIONS } from "../lib/context";
import styles from "./Chat.module.css";

function formatTime(d: Date): string {
  return `${String(d.getHours()).padStart(2, "0")}:${String(
    d.getMinutes()
  ).padStart(2, "0")}`;
}

interface RenderedTurn extends ChatTurn {
  time: string;
}

/* ── Mini-renderer de markdown inline ───────────────────────
   Soporta **bold**, *italic* y `code`. Ignora HTML por seguridad.
   Bloques: párrafos separados por \n\n; listas con líneas que
   inicien con "- " o "* ".                                     */

function renderInline(text: string, keyBase: string): ReactNode[] {
  const out: ReactNode[] = [];
  const pattern = /(\*\*([^*\n]+?)\*\*|\*([^*\n]+?)\*|`([^`\n]+?)`)/g;
  let lastIdx = 0;
  let m: RegExpExecArray | null;
  let i = 0;
  while ((m = pattern.exec(text)) !== null) {
    if (m.index > lastIdx) out.push(text.slice(lastIdx, m.index));
    if (m[2] !== undefined) {
      out.push(<strong key={`${keyBase}-b-${i++}`}>{m[2]}</strong>);
    } else if (m[3] !== undefined) {
      out.push(<em key={`${keyBase}-i-${i++}`}>{m[3]}</em>);
    } else if (m[4] !== undefined) {
      out.push(<code key={`${keyBase}-c-${i++}`}>{m[4]}</code>);
    }
    lastIdx = m.index + m[0].length;
  }
  if (lastIdx < text.length) out.push(text.slice(lastIdx));
  return out;
}

function renderMessageBody(text: string): ReactNode[] {
  const elements: ReactNode[] = [];
  const paragraphs = text.split(/\n\n+/);
  let keyN = 0;

  paragraphs.forEach((para, pi) => {
    const lines = para.split("\n").filter((l) => l.trim().length > 0);
    let i = 0;
    while (i < lines.length) {
      const isList = /^\s*[-*]\s+/.test(lines[i]);
      if (isList) {
        const items: string[] = [];
        while (i < lines.length && /^\s*[-*]\s+/.test(lines[i])) {
          items.push(lines[i].replace(/^\s*[-*]\s+/, ""));
          i++;
        }
        elements.push(
          <ul key={`p${pi}-l${keyN++}`} className={styles.list}>
            {items.map((it, k) => (
              <li key={k}>{renderInline(it, `p${pi}-li${k}`)}</li>
            ))}
          </ul>
        );
      } else {
        const textLines: string[] = [];
        while (i < lines.length && !/^\s*[-*]\s+/.test(lines[i])) {
          textLines.push(lines[i]);
          i++;
        }
        if (textLines.length > 0) {
          elements.push(
            <p key={`p${pi}-t${keyN++}`} className={styles.turnPara}>
              {textLines.map((tl, ti) => (
                <span key={ti}>
                  {renderInline(tl, `p${pi}-t${ti}`)}
                  {ti < textLines.length - 1 && " "}
                </span>
              ))}
            </p>
          );
        }
      }
    }
  });

  return elements;
}

export function Chat() {
  const configured = isGeminiConfigured();
  const [messages, setMessages] = useState<RenderedTurn[]>([]);
  const [input, setInput] = useState("");
  const [streaming, setStreaming] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const abortRef = useRef<AbortController | null>(null);
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    return () => abortRef.current?.abort();
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, streaming]);

  async function send(text: string) {
    const trimmed = text.trim();
    if (!trimmed || streaming) return;
    setError(null);

    const userTurn: RenderedTurn = {
      role: "user",
      text: trimmed,
      time: formatTime(new Date()),
    };
    const placeholderTurn: RenderedTurn = {
      role: "assistant",
      text: "",
      time: formatTime(new Date()),
    };

    const historyForApi: ChatTurn[] = [...messages, userTurn].map(
      ({ role, text }) => ({ role, text })
    );

    setMessages((prev) => [...prev, userTurn, placeholderTurn]);
    setInput("");
    setStreaming(true);

    const abort = new AbortController();
    abortRef.current?.abort();
    abortRef.current = abort;

    try {
      await streamGemini({
        history: historyForApi,
        signal: abort.signal,
        onChunk: (chunk) => {
          setMessages((prev) => {
            const next = [...prev];
            const last = next[next.length - 1];
            if (last?.role === "assistant") {
              next[next.length - 1] = { ...last, text: last.text + chunk };
            }
            return next;
          });
        },
      });
    } catch (e) {
      if ((e as Error).name === "AbortError") return;
      let msg = "Algo salió mal. Intenta de nuevo.";
      if (e instanceof GeminiKeyMissingError) {
        msg = e.message;
      } else if (e instanceof GeminiRateLimitError) {
        msg = e.message;
      } else if (e instanceof Error) {
        msg = e.message;
      }
      setError(msg);
      setMessages((prev) => {
        const next = [...prev];
        const last = next[next.length - 1];
        if (last?.role === "assistant" && !last.text) {
          next.pop();
        }
        return next;
      });
    } finally {
      setStreaming(false);
    }
  }

  function onKey(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send(input);
    }
  }

  function clearAll() {
    abortRef.current?.abort();
    setMessages([]);
    setError(null);
    setInput("");
    inputRef.current?.focus();
  }

  if (!configured) {
    return (
      <div className={styles.unconfigured}>
        <div className={styles.unconfiguredLabel}>// asistente · sin api key</div>
        <h3 className={styles.unconfiguredTitle}>
          El asistente está apagado en esta build
        </h3>
        <p className={styles.unconfiguredBody}>
          Para activarlo, agrega <code>VITE_GEMINI_API_KEY</code> en{" "}
          <code>.env</code> y reinicia el dev server. Obtén tu key gratis en{" "}
          <a
            href="https://aistudio.google.com/apikey"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.unconfiguredLink}
          >
            aistudio.google.com/apikey
          </a>
          . La key se incluye en el bundle público — restríngela por dominio
          antes de desplegar.
        </p>
      </div>
    );
  }

  return (
    <div className={styles.chat}>
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <span className={styles.statusDot} aria-hidden />
          <span className={styles.headerLabel}>asistente.ivan</span>
          <span className={styles.headerMeta}>· gemini-2.5-flash</span>
        </div>
        <button
          type="button"
          onClick={clearAll}
          className={styles.clearBtn}
          disabled={messages.length === 0 && !streaming}
          aria-label="Limpiar conversación"
        >
          limpiar
        </button>
      </div>

      <div className={styles.scroll} ref={scrollRef} aria-live="polite">
        {messages.length === 0 ? (
          <div className={styles.empty}>
            <div className={styles.suggestions}>
              {SUGGESTED_QUESTIONS.map((q) => (
                <button
                  key={q}
                  type="button"
                  className={styles.suggestion}
                  onClick={() => send(q)}
                >
                  <span className={styles.suggestionArrow} aria-hidden>
                    →
                  </span>
                  {q}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <ul className={styles.messages}>
            {messages.map((m, i) => {
              const isUser = m.role === "user";
              const isLastAssistant =
                !isUser && i === messages.length - 1 && streaming;
              const isPendingFirstChunk =
                !isUser && streaming && i === messages.length - 1 && !m.text;
              return (
                <li
                  key={i}
                  className={`${styles.turn} ${
                    isUser ? styles.turnUser : styles.turnAssistant
                  }`}
                >
                  <div className={styles.turnHead}>
                    <span className={styles.turnAuthor}>
                      {isUser ? "> visitante" : "> ivan_asistente"}
                    </span>
                    <span className={styles.turnTime}>· {m.time}</span>
                    <span className={styles.turnRule} aria-hidden />
                  </div>
                  <div className={styles.turnBody}>
                    {isPendingFirstChunk ? (
                      <span className={styles.thinking}>
                        <span className={styles.thinkingDot} />
                        <span className={styles.thinkingDot} />
                        <span className={styles.thinkingDot} />
                      </span>
                    ) : isUser ? (
                      <p className={styles.turnPara}>{m.text}</p>
                    ) : (
                      <>
                        {renderMessageBody(m.text)}
                        {isLastAssistant && (
                          <span className={styles.cursor} aria-hidden>
                            ▍
                          </span>
                        )}
                      </>
                    )}
                  </div>
                </li>
              );
            })}
          </ul>
        )}

        <AnimatePresence>
          {error && (
            <motion.div
              className={styles.error}
              role="alert"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
            >
              <span className={styles.errorTag}>error</span>
              <span>{error}</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <form
        className={styles.form}
        onSubmit={(e) => {
          e.preventDefault();
          send(input);
        }}
      >
        <textarea
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={onKey}
          placeholder="Pregunta lo que quieras sobre Iván…"
          rows={1}
          className={styles.input}
          disabled={streaming}
          aria-label="Pregunta para el asistente"
        />
        <button
          type="submit"
          className={styles.send}
          disabled={!input.trim() || streaming}
          aria-label="Enviar pregunta"
        >
          <span className={styles.sendLabel}>enviar</span>
          <span className={styles.sendArrow} aria-hidden>
            →
          </span>
        </button>
      </form>

      <p className={styles.disclaimer}>
        Puede equivocarse — para datos críticos confirma con Iván directamente.
      </p>
    </div>
  );
}
