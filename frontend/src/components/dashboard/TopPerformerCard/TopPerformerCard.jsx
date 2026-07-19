import {
  Trophy,
  Copy,
  ExternalLink,
  QrCode,
  MousePointerClick,
  CalendarDays,
} from "lucide-react";

import Button from "../../ui/Button/Button";
import styles from "./TopPerformerCard.module.css";

export default function TopPerformerCard({
  link,
  onCopy,
  onVisit,
  onQr,
}) {
  return (
    <section className={styles.card}>
      <div className={styles.header}>
        <Trophy size={20} />
        <h2>Top Performer</h2>
      </div>

      {!link ? (
        <p className={styles.empty}>
          No links yet.
        </p>
      ) : (
        <>
          <div className={styles.code}>
            /{link.short_code}
          </div>

          <a
            href={link.short_url}
            target="_blank"
            rel="noreferrer"
            className={styles.url}
          >
            {link.short_url}
          </a>

          <div className={styles.stats}>
            <div>
              <MousePointerClick size={15} />
              <span>{link.clicks} clicks</span>
            </div>

            {link.created_at && (
              <div>
                <CalendarDays size={15} />
                <span>
                  {new Date(
                    link.created_at
                  ).toLocaleDateString()}
                </span>
              </div>
            )}
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
              onClick={() => onQr(link)}
            >
              <QrCode size={16} />
              QR
            </Button>
          </div>
        </>
      )}
    </section>
  );
}