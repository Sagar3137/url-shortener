import {
  CheckCircle2,
  Copy,
  ExternalLink,
  QrCode,
} from "lucide-react";

import Button from "../../ui/Button/Button";
import styles from "./CreateResultCard.module.css";

export default function CreateResultCard({
  url,
  onCopy,
  onVisit,
  onQr,
}) {
  if (!url) return null;

  const truncate = (text, max = 60) =>
  text.length > max
    ? `${text.slice(0, max)}...`
    : text;

  return (
    <article className={styles.card}>
      <div className={styles.header}>
        <CheckCircle2
          size={22}
          className={styles.successIcon}
        />

        <div>
          <h3>Link created successfully!</h3>
          <p>Share it anywhere.</p>
        </div>
      </div>

      <div className={styles.body}>
        <div className={styles.field}>
            <span>Alias</span>
            <strong>/{url.short_code}</strong>
        </div>
        <div className={styles.field}>
          <span>Short URL</span>

          <strong>{url.short_url}</strong>
        </div>

        <div className={styles.field}>
          <span>Original URL</span>

          <p>{truncate(url.long_url)}</p>
        </div>

        <div className={styles.field}>
          <span>Created</span>

            <p>
                {new Date(url.created_at).toLocaleString()}
            </p>
        </div>
      </div>

      <div className={styles.actions}>
        <Button
          variant="secondary"
          onClick={onCopy}
        >
          <Copy size={16} />
          Copy
        </Button>

        <Button
          variant="secondary"
          onClick={onVisit}
        >
          <ExternalLink size={16} />
          Visit
        </Button>

        <Button
          variant="secondary"
          onClick={onQr}
        >
          <QrCode size={16} />
          QR Code
        </Button>
      </div>
    </article>
  );
}