import { NavLink } from "react-router-dom";
import Logo from "./Logo";
import styles from "./Navbar.module.css";

const links = [
  { to: "/", label: "Home", end: true },
  { to: "/about", label: "About" },
  { to: "/signup", label: "Sign Up" },
  { to: "/profile", label: "Profile" },
  { to: "/feed", label: "Feed" },
];

function Navbar() {
  return (
    <header className={styles.navbar}>
      <NavLink to="/" className={styles.brand} end>
        <Logo />
      </NavLink>
      <nav className={styles.links}>
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            end={link.end}
            className={({ isActive }) =>
              isActive ? `${styles.link} ${styles.active}` : styles.link
            }
          >
            {link.label}
          </NavLink>
        ))}
      </nav>
    </header>
  );
}

export default Navbar;
