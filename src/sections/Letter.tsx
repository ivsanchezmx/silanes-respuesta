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

interface TrackItem {
  year: string;
  role: string;
  org: string;
  note?: string;
}

const EXPERIENCE: TrackItem[] = [
  {
    year: "2026 →",
    role: "Sr. Consultant in AI",
    org: "FUNDES",
    note: "Estándar CONOCER de IA",
  },
  {
    year: "2025 →",
    role: "Sr. AI & Innovation Manager",
    org: "Innogyzer",
  },
  {
    year: "2022–2024",
    role: "Experimentation & Innovation Mgr.",
    org: "Grupo Rotoplas",
  },
  {
    year: "2019–2022",
    role: "Innovation Analyst → Coordinator",
    org: "Grupo Rotoplas",
  },
];

const EDUCATION: TrackItem[] = [
  {
    year: "2023–2026",
    role: "Doctorado en Alta Dirección",
    org: "UVP",
    note: "en curso",
  },
  {
    year: "2018–2019",
    role: "MSc. New Tech in Computer Science",
    org: "Univ. de Murcia",
    note: "Beca Fundación Carolina",
  },
  {
    year: "2016–2018",
    role: "MSc. Economics & Innovation Policy",
    org: "UAM",
    note: "Beca CONACYT · honores",
  },
  {
    year: "2010–2015",
    role: "B.Eng. Computer Engineering",
    org: "UA Tlaxcala",
    note: "honores",
  },
];

function TimelineCol({ label, items }: { label: string; items: TrackItem[] }) {
  return (
    <div className={styles.tlCol}>
      <header className={styles.tlHead}>
        <span className={styles.tlHeadMark}>//</span>
        <span className={styles.tlHeadLabel}>{label}</span>
        <span className={styles.tlHeadRule} aria-hidden />
      </header>
      <ol className={styles.tlList}>
        {items.map((item, i) => (
          <li key={i} className={styles.tlItem}>
            <span className={styles.tlYear}>{item.year}</span>
            <div className={styles.tlBody}>
              <span className={styles.tlRole}>{item.role}</span>
              <span className={styles.tlOrg}>{item.org}</span>
              {item.note && <span className={styles.tlNote}>{item.note}</span>}
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}

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
          Bienvenido y gracias por dedicar tiempo a revisar mi perfil. Preparé
          esta pieza estructurada para que puedas hojearla en 90 segundos o
          leerla a fondo en diez minutos —según tu necesidad— y compartirla
          sin perder contexto.
        </p>
        <p>
          Soy <strong>Iván Sánchez Martínez</strong>, consultor en estrategia
          de IA e innovación con más de ocho años diseñando programas de
          habilitación corporativa. Actualmente lidero el desarrollo del
          <strong> primer Estándar Nacional de Competencia en IA para MiPyMES
          en México</strong> (FUNDES + Google.org ante CONOCER) y acompaño a
          organizaciones desde <strong>Innogyzer</strong> en diagnóstico,
          definición de casos de uso y diseño de procesos asistidos por IA.
        </p>
        <p>
          En las siguientes secciones está mi respuesta al filtro de Atracción
          de Talento de Laboratorios Silanes: validación de indispensables,
          las tres preguntas de experiencia, evidencia con enlaces vivos y el
          encaje narrativo con la posición. Si tienes prisa,{" "}
          <strong>§02 Indispensables</strong> y <strong>§04 Evidencia</strong>{" "}
          cubren el filtro estricto; <strong>§05 Encaje</strong> contextualiza
          por qué este rol embona con el trabajo que ya hago; y en{" "}
          <strong>§07 Asistente</strong> hay un modelo IA que puede ampliar
          cualquier punto en vivo.
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

      <div className={styles.timeline}>
        <TimelineCol label="experiencia" items={EXPERIENCE} />
        <TimelineCol label="educación" items={EDUCATION} />
      </div>
    </section>
  );
}
