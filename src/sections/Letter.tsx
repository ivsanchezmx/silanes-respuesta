import styles from "./Letter.module.css";

const META = [
  { label: "Fecha", value: "12 mayo 2026" },
  { label: "Fecha límite", value: "13 mayo 2026 · cumplida" },
  { label: "Posición", value: "Gerente de Habilitación IA" },
  { label: "Sede", value: "Paseo de las Palmas · CDMX" },
  { label: "Modalidad", value: "Híbrida · 3+2" },
];

const TAGS = [
  "8+ años en innovación",
  "FUNDES · Google.org",
  "Custom GPTs públicos",
  "Plataformas propias",
  "CONOCER · Estándar IA",
];

export function Letter() {
  return (
    <section className={styles.wrap}>
      <aside className={styles.meta}>
        {META.map((m) => (
          <div key={m.label} className={styles.metaRow}>
            <span className={styles.metaLabel}>{m.label}</span>
            <span className={styles.metaValue}>{m.value}</span>
          </div>
        ))}
      </aside>
      <div className={styles.body}>
        <p className={styles.firstPara}>
          Andrea, gracias por avanzar mi candidatura y por la claridad del
          proceso. Recibí tu correo esta mañana y preferí responder en este
          formato —que te permite leer la información de forma estructurada y
          compartirla con el líder de la posición sin perder contexto— en lugar
          de devolverlo como respuesta plana al hilo.
        </p>
        <p>
          A lo largo de esta pieza encontrarás las seis validaciones
          indispensables, mis respuestas a las tres preguntas de experiencia
          profesional, y un bloque de evidencia con enlaces a Custom GPTs,
          plataformas y agentes que he construido directamente y que hoy operan
          con usuarios reales. Si tienes prisa, <strong>§02 Indispensables</strong>{" "}
          y <strong>§04 Evidencia</strong> cubren el filtro estricto; <strong>§05 Encaje</strong>{" "}
          contextualiza por qué este rol embona con el trabajo que ya hago.
        </p>
        <p>
          Cualquier punto puede ampliarse en entrevista o en una demo en vivo
          de las plataformas propias; los datos directos para contactarme están
          en el panel de la izquierda, junto con el botón de descarga del CV.
        </p>
        <div className={styles.signature}>
          <span className={styles.signatureDash}>—</span> Iván Sánchez Martínez
        </div>

        <div className={styles.tags}>
          {TAGS.map((t) => (
            <span key={t} className={styles.tag}>
              {t}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
