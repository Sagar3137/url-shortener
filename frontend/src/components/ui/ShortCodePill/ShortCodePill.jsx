import { useState } from "react";
import styles from "./ShortCodePill.module.css";

/**
 * @param {{ shortUrl: string, shortCode: string }} props
 * shortUrl  — full URL from backend e.g. "http://localhost:8000/abc123"
 * shortCode — just the code e.g. "abc123" (displayed in the pill)
 */
export default function ShortCodePill({ shortUrl, shortCode }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(shortUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <button
      className={styles.pill}
      onClick={handleCopy}
      title={`Click to copy: ${shortUrl}`}
      aria-label={`Copy short URL: ${shortUrl}`}
    >
      <span className={styles.slash}>⟋</span>
      <span className={styles.code}>{shortCode}</span>
      <span className={styles.action}>{copied ? "copied!" : "copy"}</span>
    </button>
  );
}
