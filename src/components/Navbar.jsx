import { NavLink, useNavigate } from "react-router-dom";
import Logo from "./Logo";
import { useAppContext } from "../context/AppContext";
import styles from "./Navbar.module.css";

const baseLinks = [
  { to: "/", label: "Home", end: true },
  { to: "/about", label: "About" },
];

const guestLinks = [
  { to: "/signup", label: "Sign Up" },
  { to: "/login", label: "Log In" },
];

const memberLinks = [
  { to: "/profile", label: "Profile" },
  { to: "/feed", label: "Feed" },
];

function Navbar() {
  const { state, dispatch } = useAppContext();
  const navigate = useNavigate();
  const links = [
    ...baseLinks,
    ...(state.isAuthenticated ? memberLinks : guestLinks),
  ];

  function handleLogout() {
    dispatch({ type: "LOGOUT" });
    navigate("/");
  }

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
        {state.isAuthenticated && (
          <button type="button" onClick={handleLogout} className={styles.logout}>
            Log Out
          </button>
        )}
      </nav>
    </header>
  );
}

export default Navbar;
