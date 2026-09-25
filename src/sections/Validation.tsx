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
    q: "Modalidad de trabajo",
    a: "Abierto a esquemas híbridos",
    highlight: "híbridos",
    detail: "Con presencialidad en oficina según lo requiera la posición.",
  },
  {
    q: "¿Disposición a cambio de residencia?",
    a: "Sí, con disposición a realizarlo",
    detail: "Por ejemplo, a CDMX al confirmarse el ingreso.",
  },
  {
    q: "Condiciones económicas",
    a: "A conversar en entrevista",
    detail: "Según paquete integral y alcance del rol.",
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
