import { Plus } from "lucide-react";

import Button from "../../ui/Button/Button";
import styles from "./DashboardHeader.module.css";
import { useAuth } from "../../../hooks/useAuth";

function getGreeting() {
  const hour = new Date().getHours();

  if (hour < 12) return "Good Morning";
  if (hour < 17) return "Good Afternoon";
  return "Good Evening";
}

export default function DashboardHeader() {
  const { user } = useAuth();

  return (
    <section className={styles.header}>
      <div>
        <h1>
          {getGreeting()}
          {user ? `, ${user.username}` : ""} 👋
        </h1>

        <p>
          Welcome back. Manage your links and track
          their performance from one place.
        </p>
      </div>

      <Button
          onClick={() =>
            document
            .getElementById("quick-shortener")
            ?.scrollIntoView({
                      behavior: "smooth",
                  })
                }
      >
          <Plus size={18} />
          Create Link
      </Button>
    </section>
  );
}