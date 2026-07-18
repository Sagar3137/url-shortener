import styles from "./Button.module.css";

/**
 * @param {{ variant?: 'primary'|'ghost'|'danger', size?: 'sm'|'md', loading?: boolean } & React.ButtonHTMLAttributes} props
 */
export default function Button({
  children,
  variant = "primary",
  size = "md",
  loading = false,
  className = "",
  disabled,
  ...props
}) {
  return (
    <button
      className={[styles.btn, styles[variant], styles[size], className].join(" ")}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? <span className={styles.spinner} aria-hidden="true" /> : null}
      {children}
    </button>
  );
}