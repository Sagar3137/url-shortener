import styles from "./StatCard.module.css";

export default function StatCard({
  icon: Icon,
  title,
  value,
  change,
}) {
  return (
    <article className={styles.card}>
      <div className={styles.top}>
        <div>
          <p className={styles.title}>{title}</p>
          <h3 className={styles.value}>{value}</h3>
        </div>

        <div className={styles.icon}>
          <Icon size={22} />
        </div>
      </div>

      {change && (
        <p className={styles.change}>
          {change}
        </p>
      )}
    </article>
  );
}