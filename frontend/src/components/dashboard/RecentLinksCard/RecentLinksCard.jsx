import { Link } from "react-router-dom";
import { Clock3, MousePointerClick } from "lucide-react";

import styles from "./RecentLinksCard.module.css";

export default function RecentLinksCard({ links = [] }) {
  return (
    <section className={styles.card}>
      <div className={styles.header}>
        <Clock3 size={20} />
        <h2>Recent Links</h2>
      </div>

      {links.length === 0 ? (
        <p className={styles.empty}>
          No links created yet.
        </p>
      ) : (
        <div className={styles.list}>
          {links.map((link, index) => (
            <Link
              key={link.id}
              to={`/urls/${link.short_code}`}
              className={styles.item}
            >
              <div className={styles.left}>
                <h3>/{link.short_code}</h3>

                <span>
                  {new Date(
                    link.created_at
                  ).toLocaleDateString()}
                </span>
              </div>

              <div className={styles.right}>
                <MousePointerClick size={14} />

                <strong>{link.clicks}</strong>
              </div>

              {index !== links.length - 1 && (
                <div className={styles.divider} />
              )}
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}