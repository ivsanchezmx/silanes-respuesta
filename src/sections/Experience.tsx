import { useState, type ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./Experience.module.css";

interface QA {
  num: string;
  question: string;
  body: () => ReactNode;
}

const QA_LIST: QA[] = [
  {
    num: "Pregunta 01",
    question:
      "¿Cuentas con 5 años o más de experiencia en roles operativos, procesos, mejora continua o implementación de proyectos en empresas medianas o grandes? Comparte brevemente en qué tipo de proyectos y cómo has utilizado herramientas de Inteligencia Artificial en ellos.",
    body: () => (
      <>
        <p>
          <strong>Sí.</strong> Sumo más de 6 años trabajando en procesos de
          innovación, experimentación y adopción tecnológica en empresas medianas
          y grandes de Latinoamérica.
        </p>
        <p>
          En <strong>Grupo Rotoplas (2019–2024)</strong>, el equipo del que formé
          parte diseñó e implementó el macroproceso corporativo de innovación a
          nivel regional. Coordinamos en promedio <strong>150 experimentos
          anuales</strong> para validar productos y modelos de negocio, y formamos
          a más de <strong>1,500 colaboradores</strong> en metodologías de
          innovación. Conforme las herramientas de IA fueron madurando, las
          incorporamos progresivamente como apoyo en análisis de tendencias,
          síntesis de hallazgos de experimentación y preparación de
          recomendaciones para la dirección.
        </p>
        <p>Actualmente combino dos frentes complementarios:</p>
        <ul>
          <li>
            Desde <strong>Innogyzer</strong> (consultoría enfocada en adopción de
            IA), acompaño a organizaciones en diagnóstico, definición de casos de
            uso y diseño de procesos asistidos por IA generativa.
          </li>
          <li>
            Soy responsable del desarrollo del <strong>primer Estándar de
            Competencia en Inteligencia Artificial para MiPyMES en México</strong>,
            en colaboración con Google.org. Este estándar definirá los criterios
            oficiales con los que se certificará a evaluadores y colaboradores en
            uso aplicado de IA a nivel nacional, ante CONOCER–SEP.
          </li>
        </ul>
      </>
    ),
  },
  {
    num: "Pregunta 02",
    question:
      "Describe tu experiencia utilizando plataformas de IA generativa como ChatGPT, Copilot, Claude o Gemini. ¿Qué tipo de instrucciones, comportamientos o configuraciones has desarrollado para casos de uso específicos?",
    body: () => (
      <>
        <p>
          Uso intensivo y cotidiano de <strong>Claude, ChatGPT, Gemini y
          Copilot</strong>, tanto en sus interfaces de chat como vía API. He
          capacitado a más de <strong>500 personas</strong> en uso aplicado de IA
          generativa a través de los cuatro ecosistemas (OpenAI, Anthropic, Google
          y Microsoft), en contextos corporativos y académicos.
        </p>
        <p>En cuanto a configuración y comportamiento, he desarrollado:</p>
        <ul>
          <li>
            <strong>System prompts y configuraciones especializadas</strong> para
            casos de uso específicos (diagnóstico organizacional, redacción
            técnica, evaluación de contenido, análisis comparativo, soporte a
            investigación).
          </li>
          <li>
            <strong>Bibliotecas de prompts reutilizables</strong> aplicadas en
            proyectos de consultoría, con criterios de calidad y validación.
          </li>
          <li>
            <strong>Flujos donde la IA opera como apoyo —no sustituto—</strong> a
            procesos analíticos y de toma de decisión.
          </li>
        </ul>
        <p>
          Complementariamente, manejo herramientas de automatización y
          orquestación para integrar IA en flujos de trabajo end-to-end.
        </p>
        <blockquote className={styles.pullquote}>
          Mi enfoque al configurar instrucciones: definir rol, contexto, criterios
          de éxito y formato de salida; restringir comportamiento donde la
          ambigüedad genera respuestas poco útiles; e iterar contra casos reales
          para calibrar.
        </blockquote>
      </>
    ),
  },
  {
    num: "Pregunta 03",
    question:
      "Comparte un ejemplo de un Custom GPT, Gem, agente o flujo automatizado que hayas construido directamente. Asimismo, menciona algún caso donde hayas realizado mapeo y documentación de procesos (diagramas, manuales o paso a paso) para facilitar su uso por otros equipos.",
    body: () => (
      <>
        <p>
          He construido Custom GPTs, Gems en Gemini, agentes y flujos
          automatizados que utilizo activamente en mi práctica de consultoría. En
          la sección <strong>§04 Evidencia</strong> encontrarás las ligas
          públicas a cada uno —puedes interactuar con ellos directamente.
        </p>
        <p>
          Más allá de los Custom GPTs individuales, he desarrollado <strong>dos
          plataformas propias</strong> que orquestan agentes para casos de uso
          end-to-end: <em>The Leap</em> para flujos de innovación, y
          <em> Sherlock</em> para investigación de mercado con usuarios
          sintéticos. Ambas tienen videos demo en sitio; con gusto puedo agendar
          una demo en vivo cuando sea de utilidad en el proceso.
        </p>
        <p>
          <strong>Mapeo y documentación de procesos</strong> — En Rotoplas, el
          equipo documentó el macroproceso corporativo de innovación (diagramas
          de flujo, criterios de priorización, herramientas asociadas y manuales
          operativos) que fue adoptado por equipos de innovación en distintos
          países de la región. En el proyecto FUNDES–CONOCER, mi trabajo actual
          consiste precisamente en desarrollar <strong>mapas funcionales,
          criterios de desempeño y guías de evaluación</strong> para terceros que
          no participaron en el diseño: documentación con estándar normativo
          nacional.
        </p>
      </>
    ),
  },
];

export function Experience() {
  const [open, setOpen] = useState(0);

  return (
    <section className={styles.wrap}>
      <div className={styles.tabs} role="tablist" aria-label="Preguntas del brief">
        {QA_LIST.map((qa, i) => {
          const isOpen = i === open;
          return (
            <button
              key={qa.num}
              type="button"
              role="tab"
              aria-selected={isOpen}
              aria-controls={`qa-panel-${i}`}
              id={`qa-tab-${i}`}
              className={`${styles.tab} ${isOpen ? styles.tabActive : ""}`}
              onClick={() => setOpen(i)}
            >
              <span className={styles.tabNum}>{qa.num}</span>
              <span className={styles.tabHint}>
                {isOpen ? "Abierta" : "Ver respuesta"}
              </span>
              {isOpen && (
                <motion.span
                  layoutId="qa-active"
                  className={styles.tabUnderline}
                  transition={{ type: "spring", stiffness: 380, damping: 32 }}
                />
              )}
            </button>
          );
        })}
      </div>

      <AnimatePresence mode="wait">
        <motion.article
          key={open}
          role="tabpanel"
          id={`qa-panel-${open}`}
          aria-labelledby={`qa-tab-${open}`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.34, ease: [0.2, 0.8, 0.2, 1] }}
          className={styles.panel}
        >
          <h3 className={styles.question}>{QA_LIST[open].question}</h3>
          <div className={`body-prose ${styles.answer}`}>{QA_LIST[open].body()}</div>
        </motion.article>
      </AnimatePresence>
    </section>
  );
}
