import styles from "./Contact.module.css";

const VIDEO_YT_EMBED = "https://www.youtube.com/embed/i3JsnDymEiM";
const VIDEO_DRIVE_URL =
  "https://drive.google.com/file/d/1UkJV3Y9SF2iGmD6lHTjwQI6EzDasogjI/view?usp=sharing";

export function Contact() {
  return (
    <section className={styles.wrap}>
      <div className={styles.grid}>
        <div className={styles.videoCard}>
          <div className="eyebrow">Video de presentación</div>
          <h3 className={styles.videoTitle}>
            2 minutos de presentación para <em>esta vacante</em>.
          </h3>

          <figure className={styles.videoPlayer}>
            <iframe
              src={VIDEO_YT_EMBED}
              title="Iván Sánchez · respuesta a Silanes"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
              className={styles.videoEl}
            />
            <figcaption className={styles.videoCaption}>
              <span className={styles.videoCaptionDot} aria-hidden />
              Iván Sánchez · respuesta a Silanes · mayo 2026
            </figcaption>
          </figure>

          <div className={styles.videoActions}>
            <a
              href={VIDEO_DRIVE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.videoBtn}
            >
              <span>Abrir en Drive</span>
              <span className={styles.videoBtnArrow} aria-hidden>↗</span>
            </a>
          </div>
        </div>

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
              <span className={styles.directValue}>Tlaxcala · MX</span>
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
            href="/docs/Ivan_Sanchez_CV_2026_v2.pdf"
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
