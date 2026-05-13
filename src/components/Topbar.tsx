import styles from "./Topbar.module.css";

export function Topbar() {
  return (
    <header className={`${styles.topbar} no-print`} role="banner">
      <div className={styles.inner}>
        <div className={styles.left}>
          <span className={styles.brand}>
            <span className={styles.brandMark} aria-hidden>
              <span className={styles.brandMarkDot} />
              iS
            </span>
            <span className={styles.brandSep} aria-hidden>
              /
            </span>
            <span className={styles.brandPath}>respuesta · silanes · v1</span>
          </span>
        </div>
        <div className={styles.center}>
          <span className={styles.status}>
            <span className={styles.statusDot} aria-hidden />
            <span className={styles.statusLabel}>LIVE</span>
            <span className={styles.statusValue}>· 12 may 2026</span>
          </span>
        </div>
        <div className={styles.right}>
          <span className={styles.meta}>vacante</span>
          <span className={styles.metaValue}>
            <span className={styles.bracket}>[</span>
            gerente · habilitación IA
            <span className={styles.bracket}>]</span>
          </span>
        </div>
      </div>
    </header>
  );
}
