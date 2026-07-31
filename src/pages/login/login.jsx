import "./login.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useStore } from "../../context/StoreContext";

function Login() {
  const { loginCustomer } = useStore();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await loginCustomer(email, password);
      navigate("/");
    } catch (err) {
      setError("Invalid email or password..");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="login">
      <form className="login-box" onSubmit={handleSubmit}>

        <h1>Welcome Back</h1>
        <p>Login to your account</p>

        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {error && <p className="login-error">{error}</p>}

        <button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>

        <span>
          Don't have an account? <Link to="/register">Register</Link>
        </span>

      </form>
    </section>
  );
}

export default Login;
