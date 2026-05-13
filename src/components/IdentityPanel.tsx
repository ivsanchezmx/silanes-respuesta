import { motion } from "framer-motion";
import { SECTIONS, type SectionId } from "../sections";
import styles from "./IdentityPanel.module.css";

interface Props {
  active: SectionId;
  onSelect: (id: SectionId) => void;
}

export function IdentityPanel({ active, onSelect }: Props) {
  return (
    <aside className={styles.panel} aria-label="Identidad y navegación">
      <div className={styles.scroll}>
        <div className={styles.identity}>
          <div className={styles.photoFrame}>
            <img
              src="/img/ivan.jpg"
              alt="Iván Sánchez Martínez"
              className={styles.photo}
              loading="eager"
            />
            <span className={styles.photoCorner} aria-hidden />
            <span className={styles.photoStatus} aria-hidden>
              <span className={styles.photoStatusDot} />
              available
            </span>
          </div>
          <div className={styles.identityBody}>
            <div className={styles.identityKicker}>
              candidato<span className={styles.cursor} aria-hidden>_</span>
            </div>
            <h2 className={styles.name}>
              Iván Sánchez<br />
              <em className={styles.nameAccent}>Martínez</em>
            </h2>
            <p className={styles.role}>
              <span className={styles.roleLabel}>role</span>
              <span className={styles.roleValue}>
                gerente · habilitación IA
              </span>
            </p>
            <p className={styles.role}>
              <span className={styles.roleLabel}>track</span>
              <span className={styles.roleValue}>silanes / mayo 2026</span>
            </p>
          </div>
        </div>

        <nav className={styles.nav} aria-label="Secciones">
          <div className={styles.navHead}>
            <span className={styles.navLabel}>// índice</span>
            <span className={styles.navHint}>
              {SECTIONS.length.toString().padStart(2, "0")} caps
            </span>
          </div>
          <ul className={styles.navList}>
            {SECTIONS.map((s) => {
              const isActive = s.id === active;
              return (
                <li key={s.id}>
                  <button
                    type="button"
                    onClick={() => onSelect(s.id)}
                    className={`${styles.navItem} ${isActive ? styles.navItemActive : ""}`}
                    aria-current={isActive ? "page" : undefined}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="active-pill"
                        className={styles.navItemPill}
                        transition={{ type: "spring", stiffness: 380, damping: 32 }}
                      />
                    )}
                    <span className={styles.navItemContent}>
                      <span className={styles.navNum}>{s.num}</span>
                      <span className={styles.navItemLabel}>{s.label}</span>
                      <span className={styles.navItemArrow} aria-hidden>
                        →
                      </span>
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className={styles.contact}>
          <div className={styles.contactHead}>
            <span className={styles.navLabel}>// contacto</span>
          </div>
          <div className={styles.contactRow}>
            <span className={styles.contactLabel}>email</span>
            <a
              href="mailto:ivsanchezmx@gmail.com"
              className={styles.contactValue}
            >
              ivsanchezmx@gmail.com
            </a>
          </div>
          <div className={styles.contactRow}>
            <span className={styles.contactLabel}>tel</span>
            <a href="tel:+522461271067" className={styles.contactValue}>
              +52 246 127 1067
            </a>
          </div>
          <div className={styles.contactRow}>
            <span className={styles.contactLabel}>linkedin</span>
            <a
              href="https://linkedin.com/in/ivsanchezm"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.contactValue}
            >
              /in/ivsanchezm
            </a>
          </div>
          <a
            href="/docs/Ivan_Sanchez_CV_2026_v2.pdf"
            download
            className={styles.cvButton}
          >
            <span className={styles.cvButtonText}>Descargar CV</span>
            <span className={styles.cvButtonArrow} aria-hidden>
              ↓
            </span>
          </a>
        </div>

        <div className={styles.footMark}>
          <span className={styles.footMeta}>tlaxcala · mx</span>
          <span className={styles.footHint}>
            <kbd className={styles.kbd}>←</kbd>
            <kbd className={styles.kbd}>→</kbd>
            <span> nav</span>
          </span>
        </div>
      </div>
    </aside>
  );
}
