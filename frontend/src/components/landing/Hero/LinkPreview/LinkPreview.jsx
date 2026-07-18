import {
  Link2,
  QrCode,
  Copy,
  ExternalLink,
  MousePointerClick,
} from "lucide-react";

import styles from "./LinkPreview.module.css";

const previewLinks = [
  {
    code: "/github",
    short: "snip.dev/github",
    clicks: 245,
    status: "Active",
  },
  {
    code: "/resume",
    short: "snip.dev/resume",
    clicks: 102,
    status: "Active",
  },
  {
    code: "/portfolio",
    short: "snip.dev/portfolio",
    clicks: 58,
    status: "Active",
  },
];

const totalLinks = previewLinks.length;

const totalClicks = previewLinks.reduce(
  (sum, link) => sum + link.clicks,
  0
);

export default function LinkPreview() {
  return (
    <div className={styles.previewCard}>
      <div className={styles.previewHeader}>
        <h3>Your Links</h3>
      </div>

      <div className={styles.previewBody}>
        {previewLinks.map((link) => (
          <div key={link.code} className={styles.previewLink}>
            <div className={styles.previewInfo}>
              <div className={styles.previewTitle}>
                <div className={styles.previewCode}>
                  <Link2 size={16} />
                  <strong>{link.code}</strong>
                </div>

                <span className={styles.statusBadge}>
                  {link.status}
                </span>
              </div>

              <p>{link.short}</p>
            </div>

            <div className={styles.previewMeta}>
              <span className={styles.previewClicks}>
                <MousePointerClick size={14} />
                {link.clicks} Clicks
              </span>

              <div className={styles.previewActions}>
                <button type="button" title="Generate QR Code">
                  <QrCode size={14} />
                  <span>QR</span>
                </button>

                <button type="button" title="Copy Link">
                  <Copy size={14} />
                  <span>Copy</span>
                </button>

                <button type="button" title="Visit Link">
                  <ExternalLink size={14} />
                  <span>Visit</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className={styles.previewFooter}>
        <div className={styles.footerStat}>
          <strong>{totalLinks}</strong>
          <span>Active Links</span>
        </div>

        <div className={styles.footerStat}>
          <strong>{totalClicks}</strong>
          <span>Total Clicks</span>
        </div>
      </div>
    </div>
  );
}