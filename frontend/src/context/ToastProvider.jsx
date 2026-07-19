import {
  useState,
  useCallback,
  useRef,
} from "react";

import { ToastContext } from "./ToastContext";
import Toast from "../components/ui/Toast/Toast";

export function ToastProvider({ children }) {
  const [toast, setToast] = useState(null);
  const timeoutRef = useRef(null);

  const showToast = useCallback((message, type = "success") => {
    setToast({
      id: Date.now(),
      message,
      type,
    });

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      setToast(null);
    }, 3000);
  }, []);

  const success = (message) => showToast(message, "success");
  const error = (message) => showToast(message, "error");
  const info = (message) => showToast(message, "info");

  return (
    <ToastContext.Provider
      value={{
        success,
        error,
        info,
      }}
    >
      {children}

      {toast && (
        <Toast
          key={toast.id}
          message={toast.message}
          type={toast.type}
        />
      )}
    </ToastContext.Provider>
  );
}