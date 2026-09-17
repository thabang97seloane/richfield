import styles from "./Logo.module.css";

// Stylised brand mark for Richfield Connect: a shield-and-torch icon in the
// spirit of the Richfield institutional mark, drawn as inline SVG (no
// backend/network access is available at build time to pull the official
// logo asset). Uses the official Richfield brand blue plus a torch-red accent.
function Logo({ size = "md" }) {
  return (
    <span className={`${styles.logo} ${styles[size]}`}>
      <span className={styles.shield}>
        <svg viewBox="0 0 24 28" className={styles.shieldIcon} aria-hidden="true">
          <path
            d="M12 1.5 L20 1.5 C20.8 1.5 21.5 2.2 21.5 3 V12.5 C21.5 19.5 17.3 23.8 12 26.2 C6.7 23.8 2.5 19.5 2.5 12.5 V3 C2.5 2.2 3.2 1.5 4 1.5 Z"
            fill="none"
            stroke="#ffffff"
            strokeWidth="1.6"
          />
          <path
            d="M13 5.5c2.2 1 3 2.8 1.9 4.4 1.7-.4 2.6-2.3 1.8-4-.6 1.6-1.9.4-1.5-1.3-1.3.3-2.2.7-2.2.9z"
            fill="#e4402c"
          />
          <path d="M10.6 10.3h5.2l-1 2.6h-3.2z" fill="#ffffff" />
          <rect x="11.9" y="12.9" width="1.4" height="6.2" fill="#ffffff" />
        </svg>
      </span>
      <span className={styles.wordmark}>
        Richfield <span className={styles.connect}>Connect</span>
      </span>
    </span>
  );
}

export default Logo;
