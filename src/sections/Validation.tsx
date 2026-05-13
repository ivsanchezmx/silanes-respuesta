import styles from "./Validation.module.css";

interface Item {
  q: string;
  a: string;
  detail?: string;
  highlight?: string;
}

const ITEMS: Item[] = [
  {
    q: "Ciudad / zona de residencia actual",
    a: "Tlaxcala Centro",
    detail: "Estado de Tlaxcala, México",
  },
  {
    q: "Modalidad híbrida · 3 oficina + 2 home office · Paseo de las Palmas",
    a: "De acuerdo",
    highlight: "De acuerdo",
    detail: "Conforme con la modalidad y presencialidad indicada.",
  },
  {
    q: "¿Necesitarías realizar un cambio de residencia?",
    a: "Sí, con disposición a realizarlo",
    detail: "Cambio a CDMX previsto al confirmarse el ingreso.",
  },
  {
    q: "¿Eres o has sido parte de Laboratorios Silanes?",
    a: "No",
    detail: "No he formado parte de Laboratorios Silanes con anterioridad.",
  },
];

export function Validation() {
  return (
    <section className={styles.grid}>
      {ITEMS.map((item, i) => (
        <article key={item.q} className={styles.item} data-index={i + 1}>
          <div className={styles.q}>
            <span className={styles.qArrow} aria-hidden>
              →
            </span>
            {item.q}
          </div>
          <div className={styles.a}>
            {item.highlight ? (
              <>
                {item.a.split(item.highlight)[0]}
                <strong>{item.highlight}</strong>
                {item.a.split(item.highlight)[1]}
              </>
            ) : (
              item.a
            )}
          </div>
          {item.detail && <div className={styles.detail}>{item.detail}</div>}
        </article>
      ))}
    </section>
  );
}
