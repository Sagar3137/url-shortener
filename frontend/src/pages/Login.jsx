import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import Button from "../components/ui/Button/Button";
import Input from "../components/ui/Input/Input";
import styles from "./Auth.module.css";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(form);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.detail ?? "Invalid email or password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <div className={styles.brand}>
          <span className={styles.brandSlash}>⟋</span>snip.
        </div>
        <h1 className={styles.heading}>Welcome back</h1>
        <p className={styles.sub}>Log in to manage your short links.</p>

        <form className={styles.form} onSubmit={handleSubmit}>
          <Input
            label="Email"
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="you@example.com"
            required
            autoComplete="email"
          />
          <Input
            label="Password"
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="••••••••"
            required
            autoComplete="current-password"
          />

          {error && <p className={styles.formError}>{error}</p>}

          <Button type="submit" loading={loading} style={{ width: "100%" }}>
            Log in
          </Button>
        </form>

        <p className={styles.footer}>
          Don't have an account?{" "}
          <Link to="/register" className={styles.footerLink}>Sign up</Link>
        </p>
      </div>
    </div>
  );
}