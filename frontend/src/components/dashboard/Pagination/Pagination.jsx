import Button from "../../ui/Button/Button";
import styles from "./Pagination.module.css";

export default function Pagination({
  page,
  totalPages,
  onPageChange,
}) {
  if (totalPages <= 1) return null;

  return (
    <nav className={styles.pagination}>
      <Button
        variant="secondary"
        disabled={page === 1}
        onClick={() => onPageChange(page - 1)}
      >
        ← Previous
      </Button>

      <span className={styles.pageInfo}>
        Page <strong>{page}</strong> of{" "}
        <strong>{totalPages}</strong>
      </span>

      <Button
        variant="secondary"
        disabled={page === totalPages}
        onClick={() => onPageChange(page + 1)}
      >
        Next →
      </Button>
    </nav>
  );
}