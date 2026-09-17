import richfieldLogo from "../assets/richfield-logo.png";
import styles from "./Logo.module.css";

// Official Richfield institutional logo (shield mark + wordmark + tagline),
// extracted from the richfield_logo.pdf asset supplied for this assignment.
// "Connect" is appended as styled text to form the Richfield Connect brand.
function Logo({ size = "md" }) {
  return (
    <span className={`${styles.logo} ${styles[size]}`}>
      <img src={richfieldLogo} alt="Richfield" className={styles.logoImage} />
      <span className={styles.connect}>Connect</span>
    </span>
  );
}

export default Logo;
