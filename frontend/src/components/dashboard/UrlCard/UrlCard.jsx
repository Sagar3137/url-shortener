import {
  Copy,
  ExternalLink,
  Link2,
  MousePointerClick,
  QrCode,
  Trash2,
  CalendarDays,
  ArrowRight,
} from "lucide-react";

import Button from "../../ui/Button/Button";
import styles from "./UrlCard.module.css";

const truncate = (text, max = 65) =>
  text.length > max ? `${text.slice(0, max)}...` : text;

export default function UrlCard({
  url,
  onCopy,
  onVisit,
  onDelete,
  onQr,
  onDetails,
}) {
  return (
    <article className={styles.card}>
      <div className={styles.top}>
        <div className={styles.info}>
          <div className={styles.alias}>
            <Link2 size={18} />
            <h3>/{url.short_code}</h3>
          </div>

          <a
            href={url.short_url}
            target="_blank"
            rel="noreferrer"
            className={styles.shortUrl}
          >
            {url.short_url}
          </a>

          <p className={styles.longUrl}>
            {truncate(url.long_url)}
          </p>
        </div>

        <div className={styles.summary}>
          <div className={styles.metric}>
            <MousePointerClick size={16} />
            <span className={styles.metricValue}>
              {url.clicks}
            </span>
            <span className={styles.metricLabel}>
              Clicks
            </span>
          </div>

          <div className={styles.date}>
            <CalendarDays size={16} />
            <span>
              {new Date(url.created_at).toLocaleDateString()}
            </span>
          </div>
        </div>
      </div>

      <div className={styles.footer}>
        <div className={styles.actions}>
          <Button variant="secondary" onClick={onCopy}>
            <Copy size={16} />
          </Button>

          <Button variant="secondary" onClick={onVisit}>
            <ExternalLink size={16} />
          </Button>

          <Button variant="secondary" onClick={onQr}>
            <QrCode size={16} />
          </Button>

          <Button
            variant="secondary"
            onClick={onDetails}
          >
            <ArrowRight size={16} />
          </Button>

          <Button
            variant="danger"
            onClick={onDelete}
          >
            <Trash2 size={16} />
          </Button>
        </div>
      </div>
    </article>
  );
}