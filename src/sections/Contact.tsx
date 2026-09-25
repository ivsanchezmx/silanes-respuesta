import styles from "./Contact.module.css";

export function Contact() {
  return (
    <section className={styles.wrap}>
      <div className={styles.grid}>
        <div className={styles.side}>
          <div className="eyebrow">Datos directos</div>
          <ul className={styles.directList}>
            <li>
              <span className={styles.directLabel}>Correo</span>
              <a className={styles.directValue} href="mailto:ivsanchezmx@gmail.com">
                ivsanchezmx@gmail.com
              </a>
            </li>
            <li>
              <span className={styles.directLabel}>Alterno</span>
              <a className={styles.directValue} href="mailto:computoisz@gmail.com">
                computoisz@gmail.com
              </a>
            </li>
            <li>
              <span className={styles.directLabel}>Teléfono</span>
              <a className={styles.directValue} href="tel:+522461271067">
                +52 246 127 1067
              </a>
            </li>
            <li>
              <span className={styles.directLabel}>LinkedIn</span>
              <a
                className={styles.directValue}
                href="https://linkedin.com/in/ivsanchezm"
                target="_blank"
                rel="noopener noreferrer"
              >
                linkedin.com/in/ivsanchezm
              </a>
            </li>
            <li>
              <span className={styles.directLabel}>Residencia</span>
              <span className={styles.directValue}>Tlaxcala · Puebla · CDMX</span>
            </li>
          </ul>
        </div>
      </div>

      <div className={styles.cta}>
        <h3 className={styles.ctaTitle}>
          Quedo a disposición para los <em>siguientes pasos del proceso.</em>
        </h3>
        <p className={styles.ctaBody}>
          Puedo agendar una demo en vivo de The Leap o Sherlock, ampliar
          cualquier caso de habilitación con IA que haya documentado, o avanzar
          directamente a entrevista con el líder de la posición cuando el
          proceso lo requiera.
        </p>
        <div className={styles.buttons}>
          <a
            className={`${styles.btn} ${styles.btnPrimary}`}
            href="/docs/Ivan_Sanchez_CV_2026_JUN.pdf"
            download
          >
            Descargar CV (PDF) <span className={styles.btnArrow}>↓</span>
          </a>
          <a
            className={styles.btn}
            href="https://linkedin.com/in/ivsanchezm"
            target="_blank"
            rel="noopener noreferrer"
          >
            Ver LinkedIn <span className={styles.btnArrow}>↗</span>
          </a>
        </div>
      </div>
    </section>
  );
}
