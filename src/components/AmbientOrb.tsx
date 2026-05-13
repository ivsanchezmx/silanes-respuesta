import { motion } from "framer-motion";
import styles from "./AmbientOrb.module.css";

/**
 * Glow drift detrás del contenido. Solo decorativo.
 * Si el usuario prefiere reduced-motion, queda estático.
 */
export function AmbientOrb() {
  return (
    <div className={styles.host} aria-hidden>
      <motion.div
        className={styles.orb}
        animate={{
          x: ["-12%", "8%", "-6%", "-12%"],
          y: ["6%", "-4%", "10%", "6%"],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className={`${styles.orb} ${styles.orbAlt}`}
        animate={{
          x: ["10%", "-6%", "4%", "10%"],
          y: ["-4%", "8%", "-2%", "-4%"],
        }}
        transition={{
          duration: 28,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  );
}
