import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import { validateField, validateForm } from "../utils/validation";
import ProfilePreview from "./ProfilePreview";
import styles from "./SignUpForm.module.css";

const CAMPUSES = [
  "Durban Campus",
  "Johannesburg Campus",
  "Cape Town Campus",
  "Pretoria Campus",
  "Online Campus",
];

const INTERESTS = [
  "Programming",
  "Design",
  "Data Science",
  "Networking",
  "Cybersecurity",
];

const initialFormData = {
  fullName: "",
  studentNumber: "",
  campus: "",
  email: "",
  password: "",
  confirmPassword: "",
  interests: [],
  bio: "",
  termsAccepted: false,
};

function SignUpForm() {
  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});
  const { dispatch } = useAppContext();
  const navigate = useNavigate();

  function updateField(name, value) {
    const nextData = { ...formData, [name]: value };
    setFormData(nextData);

    // Clear an existing error the moment the field becomes valid again.
    if (errors[name]) {
      const fieldError = validateField(name, value, nextData);
      setErrors((prev) => ({ ...prev, [name]: fieldError }));
    }

    // Re-check confirmPassword whenever password itself changes.
    if (name === "password" && errors.confirmPassword) {
      const confirmError = validateField(
        "confirmPassword",
        nextData.confirmPassword,
        nextData
      );
      setErrors((prev) => ({ ...prev, confirmPassword: confirmError }));
    }
  }

  function handleChange(event) {
    const { name, value, type, checked } = event.target;
    updateField(name, type === "checkbox" ? checked : value);
  }

  function handleInterestToggle(interest) {
    const nextInterests = formData.interests.includes(interest)
      ? formData.interests.filter((item) => item !== interest)
      : [...formData.interests, interest];
    updateField("interests", nextInterests);
  }

  function handleBlur(event) {
    const { name, value, type, checked } = event.target;
    const fieldValue = type === "checkbox" ? checked : value;
    const error = validateField(name, fieldValue, formData);
    setErrors((prev) => ({ ...prev, [name]: error }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    const formErrors = validateForm(formData);
    setErrors(formErrors);

    if (Object.keys(formErrors).length > 0) {
      return;
    }

    const userProfile = {
      fullName: formData.fullName.trim(),
      studentNumber: formData.studentNumber.trim(),
      campus: formData.campus,
      email: formData.email.trim(),
      interests: formData.interests,
      bio: formData.bio.trim(),
      registeredAt: new Date().toISOString(),
    };

    dispatch({ type: "REGISTER_USER", payload: userProfile });
    navigate("/profile");
  }

  return (
    <div className={styles.layout}>
      <form className={styles.form} onSubmit={handleSubmit} noValidate>
        <h2>Create Your Academic Profile</h2>
        <p className={styles.intro}>
          Join Richfield Connect to share ideas and build your academic
          network.
        </p>

        <div className={styles.field}>
          <label htmlFor="fullName">Full Name</label>
          <input
            id="fullName"
            name="fullName"
            type="text"
            value={formData.fullName}
            onChange={handleChange}
            onBlur={handleBlur}
            className={errors.fullName ? styles.invalid : ""}
          />
          {errors.fullName && (
            <span className={styles.error}>{errors.fullName}</span>
          )}
        </div>

        <div className={styles.field}>
          <label htmlFor="studentNumber">Student Number</label>
          <input
            id="studentNumber"
            name="studentNumber"
            type="text"
            inputMode="numeric"
            value={formData.studentNumber}
            onChange={handleChange}
            onBlur={handleBlur}
            className={errors.studentNumber ? styles.invalid : ""}
          />
          {errors.studentNumber && (
            <span className={styles.error}>{errors.studentNumber}</span>
          )}
        </div>

        <div className={styles.field}>
          <label htmlFor="campus">Campus</label>
          <select
            id="campus"
            name="campus"
            value={formData.campus}
            onChange={handleChange}
            onBlur={handleBlur}
            className={errors.campus ? styles.invalid : ""}
          >
            <option value="">Select a campus</option>
            {CAMPUSES.map((campus) => (
              <option key={campus} value={campus}>
                {campus}
              </option>
            ))}
          </select>
          {errors.campus && (
            <span className={styles.error}>{errors.campus}</span>
          )}
        </div>

        <div className={styles.field}>
          <label htmlFor="email">Email Address</label>
          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            onBlur={handleBlur}
            className={errors.email ? styles.invalid : ""}
          />
          {errors.email && (
            <span className={styles.error}>{errors.email}</span>
          )}
        </div>

        <div className={styles.row}>
          <div className={styles.field}>
            <label htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="new-password"
              value={formData.password}
              onChange={handleChange}
              onBlur={handleBlur}
              className={errors.password ? styles.invalid : ""}
            />
            {errors.password && (
              <span className={styles.error}>{errors.password}</span>
            )}
          </div>

          <div className={styles.field}>
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              autoComplete="new-password"
              value={formData.confirmPassword}
              onChange={handleChange}
              onBlur={handleBlur}
              className={errors.confirmPassword ? styles.invalid : ""}
            />
            {errors.confirmPassword && (
              <span className={styles.error}>{errors.confirmPassword}</span>
            )}
          </div>
        </div>

        <div className={styles.field}>
          <span className={styles.groupLabel}>Interests</span>
          <div className={styles.checkboxGrid}>
            {INTERESTS.map((interest) => (
              <label key={interest} className={styles.checkboxOption}>
                <input
                  type="checkbox"
                  name="interests"
                  checked={formData.interests.includes(interest)}
                  onChange={() => handleInterestToggle(interest)}
                  onBlur={handleBlur}
                />
                {interest}
              </label>
            ))}
          </div>
          {errors.interests && (
            <span className={styles.error}>{errors.interests}</span>
          )}
        </div>

        <div className={styles.field}>
          <label htmlFor="bio">Short Bio</label>
          <textarea
            id="bio"
            name="bio"
            rows={4}
            value={formData.bio}
            onChange={handleChange}
            onBlur={handleBlur}
            className={errors.bio ? styles.invalid : ""}
          />
          {errors.bio && <span className={styles.error}>{errors.bio}</span>}
        </div>

        <div className={styles.field}>
          <label className={styles.checkboxOption}>
            <input
              type="checkbox"
              name="termsAccepted"
              checked={formData.termsAccepted}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            I accept the Terms and Conditions
          </label>
          {errors.termsAccepted && (
            <span className={styles.error}>{errors.termsAccepted}</span>
          )}
        </div>

        <button type="submit" className={styles.submit}>
          Register
        </button>
      </form>

      <ProfilePreview
        fullName={formData.fullName}
        bio={formData.bio}
        campus={formData.campus}
        interests={formData.interests}
      />
    </div>
  );
}

export default SignUpForm;
