import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import Button from "../components/ui/Button/Button";
import Input from "../components/ui/Input/Input";
import styles from "./Auth.module.css";

export default function Register() {
  const { register, login } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setErrors((prev) => ({ ...prev, [e.target.name]: "" }));
  };

  const validate = () => {
    const errs = {};
    if (form.username.length < 3) errs.username = "Username must be at least 3 characters.";
    if (!form.email.includes("@")) errs.email = "Enter a valid email address.";
    if (form.password.length < 8) errs.password = "Password must be at least 8 characters.";
    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }

    setServerError("");
    setLoading(true);
    try {
      await register(form);
      // Auto-login after register
      await login({ email: form.email, password: form.password });
      navigate("/dashboard");
    } catch (err) {
      setServerError(err.response?.data?.detail ?? "Registration failed. Try again.");
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
        <h1 className={styles.heading}>Create an account</h1>
        <p className={styles.sub}>Start shortening links in seconds.</p>

        <form className={styles.form} onSubmit={handleSubmit}>
          <Input
            label="Username"
            type="text"
            name="username"
            value={form.username}
            onChange={handleChange}
            placeholder="johndoe"
            error={errors.username}
            required
            autoComplete="username"
          />
          <Input
            label="Email"
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="you@example.com"
            error={errors.email}
            required
            autoComplete="email"
          />
          <Input
            label="Password"
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="At least 8 characters"
            error={errors.password}
            required
            autoComplete="new-password"
          />

          {serverError && <p className={styles.formError}>{serverError}</p>}

          <Button type="submit" loading={loading} style={{ width: "100%" }}>
            Create account
          </Button>
        </form>

        <p className={styles.footer}>
          Already have an account?{" "}
          <Link to="/login" className={styles.footerLink}>Log in</Link>
        </p>
      </div>
    </div>
  );
}
