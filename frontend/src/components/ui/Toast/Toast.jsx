import {
  CheckCircle2,
  AlertCircle,
  Info,
} from "lucide-react";

import styles from "./Toast.module.css";

const icons = {
  success: CheckCircle2,
  error: AlertCircle,
  info: Info,
};

export default function Toast({
  message,
  type = "success",
}) {
  const Icon = icons[type];

  return (
    <div className={`${styles.toast} ${styles[type]}`}>
      <Icon size={20}
      style={{ flexShrink: 0 }} />

      <span>{message}</span>
    </div>
  );
}