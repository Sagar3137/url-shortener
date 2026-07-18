import { ArrowRight } from "lucide-react";
import styles from "./HowItWorks.module.css";

export default function StepCard({
  step,
  icon: Icon,
  title,
  description,
  showConnector,
}) {
  return (
    <article className={styles.stepCard}>
      <span className={styles.stepNumber}>
        {step}
      </span>

      <div className={styles.iconWrapper}>
        <Icon
          size={28}
          className={styles.stepIcon}
        />
      </div>

      <h3 className={styles.stepTitle}>
        {title}
      </h3>

      <p className={styles.stepDescription}>
        {description}
      </p>

      {showConnector && (
        <ArrowRight className={styles.connector} size={26} />
      )}
    </article>
  );
}