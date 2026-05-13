import { motion } from "framer-motion";
import { useGoToSection } from "../lib/sectionNav";
import type { SectionId } from "../sections";
import styles from "./Evidence.module.css";

interface EvidenceItem {
  kind: string;
  title: string;
  description: string;
  href: string;
  host: string;
  /** Si está presente, el card es interno y navega a esa sección. */
  internalTarget?: SectionId;
}

interface EvidenceGroup {
  label: string;
  items: EvidenceItem[];
}

const GROUPS: EvidenceGroup[] = [
  {
    label: "Asistente para esta vacante",
    items: [
      {
        kind: "Asistente · IA en vivo",
        title: "Pregunta · respuesta sobre Iván",
        description:
          "Modelo entrenado con CV, LinkedIn y esta landing. Responde en vivo sobre experiencia, indispensables del filtro, evidencia y encaje con la vacante. Construido para este proceso.",
        href: "#assistant",
        host: "§07 · aquí mismo",
        internalTarget: "assistant",
      },
    ],
  },
  {
    label: "Plataformas propias",
    items: [
      {
        kind: "Plataforma · Orquestación",
        title: "The Leap",
        description:
          "Orquestación de flujos de agentes para procesos de innovación. Producto vivo de Innogyzer con video demo en sitio.",
        href: "https://theleap.innogyzer.com",
        host: "theleap.innogyzer.com",
      },
      {
        kind: "Plataforma · Fundador",
        title: "Sherlock",
        description:
          "Usuarios sintéticos para estudio de mercado preliminar en desarrollo de nuevos productos. Fundador y desarrollador.",
        href: "https://www.ask-sherlock.app",
        host: "ask-sherlock.app",
      },
    ],
  },
  {
    label: "Custom GPTs públicos",
    items: [
      {
        kind: "Custom GPT · Estrategia",
        title: "Experto en JTBD",
        description:
          "Asistente experto en el marco Jobs to Be Done para entrevistas, síntesis y oportunidades de innovación.",
        href: "https://chatgpt.com/g/g-67a114fbd6cc8191b3414808b6b71bbb-experto-en-jtbd",
        host: "chatgpt.com/g/experto-en-jtbd",
      },
      {
        kind: "Custom GPT · Experimentación",
        title: "Xperimenta by Innogyzer",
        description:
          "Diseño y planificación de experimentos para validar hipótesis de producto y modelo de negocio.",
        href: "https://chatgpt.com/g/g-0v021tXCJ-xperimenta-by-innogyzer",
        host: "chatgpt.com/g/Xperimenta",
      },
      {
        kind: "Custom GPT · Prototipado",
        title: "Yprototiper by Innogyzer",
        description:
          "Generación rápida de prototipos conceptuales para acelerar ciclos de validación.",
        href: "https://chatgpt.com/g/g-6799b2dba3048191bd7a4318a64de702-yprototiper-by-innogyzer",
        host: "chatgpt.com/g/Yprototiper",
      },
      {
        kind: "Custom GPT · Negocios",
        title: "Canvas Maestro",
        description:
          "Asistente para articular Business Model Canvas y refinar propuestas de valor en sesiones ejecutivas.",
        href: "https://chatgpt.com/g/g-wGAIdb1yZ-canvas-maestro-modelos-de-negocio",
        host: "chatgpt.com/g/Canvas-Maestro",
      },
      {
        kind: "Custom GPT · UX",
        title: "Arquetipos UX",
        description:
          "Construcción de arquetipos y personas con base en investigación cualitativa para equipos de producto.",
        href: "https://chatgpt.com/g/g-67c0aa7f498c819183294fc62937ae41-arquetipos-ux",
        host: "chatgpt.com/g/Arquetipos-UX",
      },
    ],
  },
];

export function Evidence() {
  const goTo = useGoToSection();

  return (
    <section className={styles.wrap}>
      <p className={styles.intro}>
        Todo lo siguiente es público y puede explorarse en este momento. Cada
        tarjeta abre el recurso real, no una captura. Si quieres profundizar en
        cualquiera, en <strong>§07 Asistente</strong> puedes preguntarle al
        modelo —entrenado con el CV, LinkedIn y esta landing— o agendar una
        <strong> demo en vivo</strong> de The Leap o Sherlock conmigo
        directamente (datos en la sidebar izquierda).
      </p>

      {GROUPS.map((group, gi) => (
        <div key={group.label} className={styles.group}>
          <header className={styles.groupHead}>
            <h3 className={styles.groupLabel}>{group.label}</h3>
            <span className={styles.groupCount}>
              {String(group.items.length).padStart(2, "0")}
            </span>
          </header>
          <div className={styles.grid}>
            {group.items.map((item, i) => {
              const motionProps = {
                initial: { opacity: 0, y: 10 },
                animate: { opacity: 1, y: 0 },
                transition: {
                  duration: 0.4,
                  delay: 0.05 * i + 0.08 * gi,
                  ease: [0.2, 0.8, 0.2, 1] as const,
                },
                whileHover: { y: -2 },
              };

              const content = (
                <>
                  <span className={styles.cardArrow} aria-hidden>
                    {item.internalTarget ? "→" : "↗"}
                  </span>
                  <span className={styles.cardKind}>{item.kind}</span>
                  <h4 className={styles.cardTitle}>{item.title}</h4>
                  <p className={styles.cardDesc}>{item.description}</p>
                  <span className={styles.cardHost}>{item.host}</span>
                </>
              );

              if (item.internalTarget) {
                return (
                  <motion.button
                    key={item.title}
                    type="button"
                    onClick={() => goTo(item.internalTarget!)}
                    className={`${styles.card} ${styles.cardInternal}`}
                    {...motionProps}
                  >
                    {content}
                  </motion.button>
                );
              }

              return (
                <motion.a
                  key={item.title}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.card}
                  {...motionProps}
                >
                  {content}
                </motion.a>
              );
            })}
          </div>
        </div>
      ))}
    </section>
  );
}
