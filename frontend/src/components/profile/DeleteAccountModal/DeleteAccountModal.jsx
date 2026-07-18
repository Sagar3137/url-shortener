import Modal from "../../ui/Modal/Modal";
import Button from "../../ui/Button/Button";

import styles from "./DeleteAccountModal.module.css";

export default function DeleteAccountModal({
  open,
  loading,
  onCancel,
  onConfirm,
}) {
  return (
    <Modal
      open={open}
      onClose={onCancel}
      title="Delete Account"
    >
      <div className={styles.content}>
        <p>
          Are you sure you want to permanently delete
          your account?
        </p>

        <p className={styles.warning}>
          This action cannot be undone.
          <br />
          All of your shortened links will also be
          permanently deleted.
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
            Delete Account
          </Button>
        </div>
      </div>
    </Modal>
  );
}