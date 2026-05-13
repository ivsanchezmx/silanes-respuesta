import { useEffect, useRef, useState, type ComponentType } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Topbar } from "./components/Topbar";
import { IdentityPanel } from "./components/IdentityPanel";
import { AmbientOrb } from "./components/AmbientOrb";
import { Letter } from "./sections/Letter";
import { Validation } from "./sections/Validation";
import { Experience } from "./sections/Experience";
import { Evidence } from "./sections/Evidence";
import { Fit } from "./sections/Fit";
import { Contact } from "./sections/Contact";
import { Assistant } from "./sections/Assistant";
import { SECTIONS, type SectionId } from "./sections";
import { SectionNavContext } from "./lib/sectionNav";
import styles from "./App.module.css";

const SECTION_COMPONENTS: Record<SectionId, ComponentType> = {
  letter: Letter,
  validation: Validation,
  experience: Experience,
  evidence: Evidence,
  fit: Fit,
  contact: Contact,
  assistant: Assistant,
};

export default function App() {
  const [active, setActive] = useState<SectionId>("letter");
  const contentRef = useRef<HTMLElement | null>(null);

  // Keyboard nav: ←/→ y números 1–7 cambian sección.
  // No captura teclas si el foco está en un input/textarea/contenteditable
  // (para no interrumpir cuando el usuario escribe en el chat).
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      const t = e.target as HTMLElement | null;
      if (t) {
        const tag = t.tagName?.toLowerCase();
        if (tag === "input" || tag === "textarea" || t.isContentEditable) {
          return;
        }
      }
      const idx = SECTIONS.findIndex((s) => s.id === active);
      if (e.key === "ArrowRight") {
        const next = SECTIONS[Math.min(idx + 1, SECTIONS.length - 1)];
        if (next) setActive(next.id);
      } else if (e.key === "ArrowLeft") {
        const prev = SECTIONS[Math.max(idx - 1, 0)];
        if (prev) setActive(prev.id);
      } else if (/^[1-7]$/.test(e.key)) {
        const target = SECTIONS[parseInt(e.key, 10) - 1];
        if (target) setActive(target.id);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active]);

  // Reset scroll del panel de contenido al cambiar sección
  useEffect(() => {
    contentRef.current?.scrollTo({ top: 0, behavior: "auto" });
  }, [active]);

  const ActiveSection = SECTION_COMPONENTS[active];
  const meta = SECTIONS.find((s) => s.id === active)!;

  const idx = SECTIONS.findIndex((s) => s.id === active);

  return (
    <SectionNavContext.Provider value={setActive}>
    <div className={styles.app}>
      <AmbientOrb />
      <Topbar />
      <div className={styles.shell}>
        <IdentityPanel active={active} onSelect={setActive} />
        <main className={styles.content} ref={contentRef} id="content">
          <header className={styles.contentHead}>
            <div className={styles.contentMeta}>
              <span className={styles.contentNum}>{meta.num}</span>
              <span className={styles.contentSeparator}>/</span>
              <span className={styles.contentTotal}>
                {String(idx + 1).padStart(2, "0")} of {String(SECTIONS.length).padStart(2, "0")}
              </span>
            </div>
            <h1 className={`display-title ${styles.contentTitle}`}>{meta.title}</h1>
            <p className={styles.contentSubtitle}>{meta.subtitle}</p>
          </header>
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.22, ease: [0.2, 0.8, 0.2, 1] }}
              className={styles.contentBody}
            >
              <ActiveSection />
            </motion.div>
          </AnimatePresence>
          <footer className={`${styles.contentFoot} no-print`} aria-label="Navegación entre secciones">
            <NavPager active={active} onSelect={setActive} />
          </footer>
        </main>
      </div>
    </div>
    </SectionNavContext.Provider>
  );
}

function NavPager({
  active,
  onSelect,
}: {
  active: SectionId;
  onSelect: (id: SectionId) => void;
}) {
  const idx = SECTIONS.findIndex((s) => s.id === active);
  const prev = SECTIONS[idx - 1];
  const next = SECTIONS[idx + 1];
  return (
    <div className={styles.pager}>
      <button
        type="button"
        className={styles.pagerBtn}
        onClick={() => prev && onSelect(prev.id)}
        disabled={!prev}
        aria-label={prev ? `Anterior: ${prev.label}` : "Sin sección anterior"}
      >
        <span className={styles.pagerArrow} aria-hidden>←</span>
        <span className={styles.pagerMeta}>
          <span className="eyebrow-muted">{prev ? prev.num : "·"}</span>
          <span className={styles.pagerLabel}>{prev ? prev.label : "Inicio"}</span>
        </span>
      </button>
      <button
        type="button"
        className={`${styles.pagerBtn} ${styles.pagerBtnRight}`}
        onClick={() => next && onSelect(next.id)}
        disabled={!next}
        aria-label={next ? `Siguiente: ${next.label}` : "Sin sección siguiente"}
      >
        <span className={styles.pagerMeta}>
          <span className="eyebrow-muted">{next ? next.num : "·"}</span>
          <span className={styles.pagerLabel}>{next ? next.label : "Fin"}</span>
        </span>
        <span className={styles.pagerArrow} aria-hidden>→</span>
      </button>
    </div>
  );
}
