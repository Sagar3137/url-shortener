import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import styles from "./Input.module.css";

/**
 * @param {{ label?: string, error?: string, hint?: string } & React.InputHTMLAttributes} props
 */
export default function Input({
  ref,
  label,
  error,
  hint,
  id,
  className = "",
  type = "text",
  ...props
}) {
  const inputId = id ?? label?.toLowerCase().replace(/\s+/g, "-");

  const isPassword = type === "password";
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className={styles.field}>
      {label && (
        <label htmlFor={inputId} className={styles.label}>
          {label}
        </label>
      )}

      <div className={styles.inputWrapper}>
        <input
          ref={ref}
          id={inputId}
          type={isPassword && showPassword ? "text" : type}
          className={[
            styles.input,
            error ? styles.inputError : "",
            className,
          ].join(" ")}
          {...props}
        />

        {isPassword && (
          <button
            type="button"
            className={styles.eyeButton}
            onClick={() => setShowPassword((prev) => !prev)}
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? <Eye size={16} strokeWidth={2} /> : <EyeOff size={16} strokeWidth={2} />}
          </button>
        )}
      </div>

      {error && <p className={styles.error}>{error}</p>}
      {hint && !error && <p className={styles.hint}>{hint}</p>}
    </div>
  );
}