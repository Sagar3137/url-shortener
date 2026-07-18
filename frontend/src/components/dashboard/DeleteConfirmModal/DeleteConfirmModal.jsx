import Modal from "../../ui/Modal/Modal";
import Button from "../../ui/Button/Button";

import styles from "./DeleteConfirmModal.module.css";

export default function DeleteConfirmModal({
  open,
  url,
  loading,
  onCancel,
  onConfirm,
}) {
  if (!url) return null;

  return (
    <Modal
      open={open}
      onClose={onCancel}
      title="Delete Link"
    >
      <div className={styles.content}>
        <p>
          Are you sure you want to delete
        </p>

        <strong>/{url.short_code}</strong>

        <p className={styles.warning}>
          This action cannot be undone.
        </p>

        <div className={styles.actions}>
          <Button
            variant="ghost"
            onClick={onCancel}
          >
            Cancel
          </Button>

          <Button
            variant="danger"
            loading={loading}
            onClick={onConfirm}
          >
            Delete
          </Button>
        </div>
      </div>
    </Modal>
  );
}