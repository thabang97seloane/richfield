import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import { hashPassword } from "../utils/hash";
import styles from "./LoginForm.module.css";

const initialFormData = { email: "", password: "" };

function LoginForm() {
  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState("");
  const { state, dispatch } = useAppContext();
  const navigate = useNavigate();

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
    if (formError) setFormError("");
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const fieldErrors = {};
    if (!formData.email.trim()) fieldErrors.email = "Email is required.";
    if (!formData.password) fieldErrors.password = "Password is required.";
    setErrors(fieldErrors);

    if (Object.keys(fieldErrors).length > 0) {
      return;
    }

    if (!state.user) {
      setFormError("No registered account found. Please sign up first.");
      return;
    }

    const enteredHash = await hashPassword(formData.password);
    const emailMatches =
      formData.email.trim().toLowerCase() === state.user.email.toLowerCase();

    if (!emailMatches || enteredHash !== state.user.passwordHash) {
      setFormError("Incorrect email or password.");
      return;
    }

    dispatch({ type: "LOGIN" });
    navigate("/profile");
  }

  return (
    <div className={styles.layout}>
      <form className={styles.form} onSubmit={handleSubmit} noValidate>
        <h2>Log In to Richfield Connect</h2>
        <p className={styles.intro}>
          Welcome back — log in with the email and password you registered
          with.
        </p>

        {formError && <p className={styles.formError}>{formError}</p>}

        <div className={styles.field}>
          <label htmlFor="loginEmail">Email Address</label>
          <input
            id="loginEmail"
            name="email"
            type="email"
            autoComplete="email"
            value={formData.email}
            onChange={handleChange}
            className={errors.email ? styles.invalid : ""}
          />
          {errors.email && (
            <span className={styles.error}>{errors.email}</span>
          )}
        </div>

        <div className={styles.field}>
          <label htmlFor="loginPassword">Password</label>
          <input
            id="loginPassword"
            name="password"
            type="password"
            autoComplete="current-password"
            value={formData.password}
            onChange={handleChange}
            className={errors.password ? styles.invalid : ""}
          />
          {errors.password && (
            <span className={styles.error}>{errors.password}</span>
          )}
        </div>

        <button type="submit" className={styles.submit}>
          Log In
        </button>

        <p className={styles.altAction}>
          Don&apos;t have an account? <Link to="/signup">Sign up</Link>
        </p>
      </form>
    </div>
  );
}

export default LoginForm;
