import { Chat } from "../components/Chat";
import styles from "./Assistant.module.css";

export function Assistant() {
  return (
    <section className={styles.wrap}>
      <div className={styles.intro}>
        <p className={styles.lede}>
          <strong className={styles.ledeAccent}>
            Pregúntale sobre experiencia,
          </strong>{" "}
          proyectos, indispensables del filtro, evidencia, salario, mudanza o
          lo que necesites.
        </p>
        <div className={styles.metaRow}>
          <span className={styles.metaTag}>// modelo</span>
          <span className={styles.metaValue}>gemini-2.5-flash</span>
          <span className={styles.metaTag}>// idioma</span>
          <span className={styles.metaValue}>es-MX</span>
        </div>
      </div>
      <Chat />
    </section>
  );
}
