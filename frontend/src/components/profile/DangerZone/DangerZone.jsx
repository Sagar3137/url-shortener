import Button from "../../ui/Button/Button";

import styles from "./DangerZone.module.css";

export default function DangerZone({
  onDelete,
  loading,
}) {
  return (
    <section className={styles.card}>
      <div className={styles.header}>
        <h2>Danger Zone</h2>

        <p>
          Permanently delete your account and all
          of your shortened links.
        </p>
      </div>

      <div className={styles.content}>
        <div>
          <h3>Delete Account</h3>

          <p>
            This action cannot be undone. Your
            profile and every shortened link you've
            created will be permanently removed.
          </p>
        </div>

        <Button
          variant="danger"
          loading={loading}
          onClick={onDelete}
        >
          Delete Account
        </Button>
      </div>
    </section>
  );
}