import styles from "./Logo.module.css";

// Styled text placeholder for the Richfield Connect brand mark, since no
// backend/network access is available at build time to pull the official
// institutional logo asset. Uses the official Richfield brand blue.
function Logo({ size = "md" }) {
  return (
    <span className={`${styles.logo} ${styles[size]}`}>
      <span className={styles.shield}>R</span>
      <span className={styles.wordmark}>
        Richfield <span className={styles.connect}>Connect</span>
      </span>
    </span>
  );
}

export default Logo;
