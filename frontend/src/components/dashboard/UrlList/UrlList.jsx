import UrlCard from "../UrlCard/UrlCard";
import EmptyState from "../EmptyState/EmptyState";

import styles from "./UrlList.module.css";

export default function UrlList({
  urls = [],
  isLoading = false,
  onCopy,
  onVisit,
  onDelete,
  onQr,
  onDetails
}) {

  if (isLoading) {
    return (
      <div className={styles.loading}>
        Loading your links...
      </div>
    );
  }

  if (urls.length === 0) {
    return <EmptyState />;
  }

  return (
    <section className={styles.list}>
      {urls.map((url) => (
        <UrlCard
          key={url.id}
          url={url}
          onCopy={() => onCopy(url)}
          onVisit={() => onVisit(url)}
          onQr={() => onQr(url)}
          onDetails={() => onDetails(url)}
          onDelete={() => onDelete(url)}
        />
      ))}
    </section>
  );
}