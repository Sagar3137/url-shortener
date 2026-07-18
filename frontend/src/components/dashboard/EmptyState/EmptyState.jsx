import { Link2 } from "lucide-react";

import Button from "../../ui/Button/Button";
import styles from "./EmptyState.module.css";

export default function EmptyState() {
  return (
    <section className={styles.empty}>
      <div className={styles.icon}>
        <Link2 size={42} />
      </div>

      <h2>No links yet</h2>

      <p>
        Create your first short link and start sharing it anywhere.
      </p>

        <Button
        onClick={() =>
            document
            .getElementById("quick-shortener")
            ?.scrollIntoView({
                behavior: "smooth",
                block: "center",
            })
        }
        >
        Create your first link
        </Button>
    </section>
  );
}