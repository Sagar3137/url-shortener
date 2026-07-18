import styles from "./Features.module.css";

export default function FeatureCard({ icon: Icon, title, description }) {
  return (
    <article className={styles.featureCard}>
      <div className={styles.featureIcon}>
        <Icon size={28} />
      </div>

      <h3 className={styles.featureTitle}>
        {title}
      </h3>

      <p className={styles.featureDescription}>
        {description}
      </p>
    </article>
  );
}