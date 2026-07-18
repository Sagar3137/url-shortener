import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import styles from "./Modal.module.css";

/**
 * @param {{ open: boolean, onClose: () => void, title: string, children: React.ReactNode }} props
 */
export default function Modal({ open, onClose, title, children }) {
  const overlayRef = useRef(null);

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const handler = (e) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [open, onClose]);

  // Prevent body scroll when open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  if (!open) return null;

  return createPortal(
    <div
      ref={overlayRef}
      className={styles.overlay}
      role="dialog"
      aria-modal="true"
      aria-label={title}
      onClick={(e) => { if (e.target === overlayRef.current) onClose(); }}
    >
      <div className={styles.panel}>
        <div className={styles.header}>
          <h2 className={styles.title}>{title}</h2>
          <button className={styles.close} onClick={onClose} aria-label="Close">
            ✕
          </button>
        </div>
        <div className={styles.body}>{children}</div>
      </div>
    </div>,
    document.body
  );
}