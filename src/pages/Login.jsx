import { Navigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import LoginForm from "../components/LoginForm";

function Login() {
  const { state } = useAppContext();

  // Already logged in — the login form has nothing left to do here.
  if (state.isAuthenticated) {
    return <Navigate to="/profile" replace />;
  }

  return <LoginForm />;
}

export default Login;
