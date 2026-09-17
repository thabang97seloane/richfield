// Shared validation rules for the registration form (section 5.3.3 of the brief).

export function validateField(name, value, formData) {
  switch (name) {
    case "fullName":
      return value.trim() ? "" : "Full name is required.";

    case "studentNumber":
      if (!value.trim()) return "Student number is required.";
      if (!/^\d+$/.test(value)) return "Student number must be numeric only.";
      if (value.length < 6) return "Student number must be at least 6 digits.";
      return "";

    case "campus":
      return value ? "" : "Please select a campus.";

    case "email":
      if (!value.trim()) return "Email address is required.";
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        return "Enter a valid email address (e.g. name@example.com).";
      }
      return "";

    case "password":
      return value.length >= 8
        ? ""
        : "Password must be at least 8 characters long.";

    case "confirmPassword":
      return value === formData.password ? "" : "Passwords do not match.";

    case "interests":
      return value.length > 0 ? "" : "Select at least one interest.";

    case "bio":
      return value.trim().length >= 20
        ? ""
        : "Bio must be at least 20 characters long.";

    case "termsAccepted":
      return value ? "" : "You must accept the Terms and Conditions.";

    default:
      return "";
  }
}

export function validateForm(formData) {
  const errors = {};
  Object.keys(formData).forEach((key) => {
    const error = validateField(key, formData[key], formData);
    if (error) errors[key] = error;
  });
  return errors;
}
