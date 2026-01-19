import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate, useLocation } from "react-router-dom";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegister, setIsRegister] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    // fake validation
    if (!email || !password) {
      alert("Email & password wajib diisi");
      return;
    }

    login(); // set isAuth = true
    navigate(location.state?.from || "/checkout");
  };

  return (
    <div className="container auth-box">
      <h2>{isRegister ? "Register" : "Login"}</h2>

      <form onSubmit={handleSubmit} className="auth-form">
        <input
          type="email"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">
          {isRegister ? "Create Account" : "Login"}
        </button>
      </form>

      <p className="auth-switch">
        {isRegister ? "Already have an account?" : "Don’t have an account?"}
        <span onClick={() => setIsRegister(!isRegister)}>
          {isRegister ? " Login" : " Register"}
        </span>
      </p>
    </div>
  );
};

export default Login;
