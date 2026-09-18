import { Navigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import SignUpForm from "../components/SignUpForm";

function SignUp() {
  const { state } = useAppContext();

  // Already logged in — sending a signed-in student back to the
  // registration form would let them overwrite their existing profile.
  if (state.isAuthenticated) {
    return <Navigate to="/profile" replace />;
  }

  return <SignUpForm />;
}

export default SignUp;
