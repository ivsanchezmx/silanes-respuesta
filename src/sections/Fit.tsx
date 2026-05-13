import { motion } from "framer-motion";
import styles from "./Fit.module.css";

interface Angle {
  num: string;
  label: string;
  title: string;
  body: string;
  bridge: string;
}

const ANGLES: Angle[] = [
  {
    num: "//01",
    label: "enablement",
    title:
      "Habilitación que escala más allá del que la diseña.",
    body:
      "En Rotoplas, el macroproceso corporativo de innovación que documentamos —criterios de intake, herramientas, KPIs, manuales operativos— fue adoptado por equipos en distintos países de LATAM sin mi presencia. Formamos a más de 1,500 colaboradores. Habilitación no es enseñar herramientas; es codificar capacidades para que los equipos las operen autónomamente.",
    bridge:
      "Aplicado a Silanes: un sistema de habilitación en IA que no dependa de una sola persona para sostenerse, y que pueda replicarse por unidad de negocio.",
  },
  {
    num: "//02",
    label: "standards",
    title:
      "Definiendo el primer Estándar Nacional de Competencia en IA en México.",
    body:
      "Como Líder de Diseño Normativo en FUNDES (Google.org + CONOCER-SEP), construyo los criterios oficiales con los que se certificará el uso aplicado de IA en MiPyMES: mapeo funcional, criterios de desempeño, bancos de reactivos y validación institucional ante el Sistema Nacional de Competencias.",
    bridge:
      "Aplicado a Silanes: definir qué significa \"IA bien usada\" en su contexto regulado, qué indicadores miden adopción, y qué evidencia certifica competencia por función.",
  },
  {
    num: "//03",
    label: "stack",
    title:
      "Claude, ChatGPT, Gemini y Copilot — uso diario, chat y API.",
    body:
      "Más de 500 personas capacitadas en uso aplicado de IA generativa a través de los cuatro ecosistemas (OpenAI, Anthropic, Google, Microsoft). System prompts especializados, bibliotecas de prompts reutilizables, agentes y dos plataformas propias (The Leap, Sherlock) que orquestan flujos end-to-end.",
    bridge:
      "Aplicado a Silanes: visión normativa + ejecución técnica con las cuatro plataformas + change management cierran el círculo de un rol de habilitación.",
  },
];

const STATS = [
  { num: "1,500+", label: "Colaboradores formados en Rotoplas" },
  { num: "500+", label: "Personas capacitadas en IA generativa" },
  { num: "~75%", label: "Tasa de éxito en hipótesis evaluadas" },
  { num: "$20M+", label: "MXN en inversión optimizada / evitada" },
];

export function Fit() {
  return (
    <section className={styles.wrap}>
      <div className={styles.angles}>
        {ANGLES.map((a, i) => (
          <motion.article
            key={a.num}
            className={styles.angle}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.45,
              delay: 0.1 + i * 0.08,
              ease: [0.2, 0.8, 0.2, 1],
            }}
          >
            <div className={styles.angleHead}>
              <span className={styles.angleNum}>{a.num}</span>
              <span className={styles.angleLabel}>{a.label}</span>
            </div>
            <h3 className={styles.angleTitle}>{a.title}</h3>
            <p className={styles.angleBody}>{a.body}</p>
            <div className={styles.bridge}>
              <span className={styles.bridgeArrow} aria-hidden>→</span>
              <span className={styles.bridgeText}>{a.bridge}</span>
            </div>
          </motion.article>
        ))}
      </div>

      <div className={styles.statsHead}>
        <span className="eyebrow">Cifras</span>
        <span className={styles.statsHint}>—lo que respalda lo anterior</span>
      </div>

      <motion.div
        className={styles.stats}
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: {
            transition: { staggerChildren: 0.08, delayChildren: 0.4 },
          },
        }}
      >
        {STATS.map((s) => (
          <motion.div
            key={s.label}
            className={styles.stat}
            variants={{
              hidden: { opacity: 0, y: 10 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.4, ease: [0.2, 0.8, 0.2, 1] }}
          >
            <div className={styles.statNum}>{s.num}</div>
            <div className={styles.statLabel}>{s.label}</div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
