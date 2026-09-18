import { Link } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import styles from "./Footer.module.css";

function Footer() {
  const { state } = useAppContext();
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.column}>
        <strong>Richfield Connect</strong>
        <p>
          The academic social engagement platform for Richfield Graduate
          Institute of Technology students.
        </p>
      </div>

      <div className={styles.column}>
        <strong>Navigate</strong>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        {state.isAuthenticated ? (
          <>
            <Link to="/profile">Profile</Link>
            <Link to="/feed">Feed</Link>
          </>
        ) : (
          <>
            <Link to="/signup">Sign Up</Link>
            <Link to="/login">Log In</Link>
          </>
        )}
      </div>

      <div className={styles.column}>
        <strong>Institution</strong>
        <span>Richfield Graduate Institute of Technology (Pty) Ltd</span>
        <span>Registration No. 2000/HE07/008</span>
        <a href="https://richfield.ac.za" target="_blank" rel="noreferrer">
          richfield.ac.za
        </a>
      </div>

      <div className={styles.bottom}>
        &copy; {year} Richfield Connect. Built for the Web Technology 512
        assignment.
      </div>
    </footer>
  );
}

export default Footer;
