import { ArrowLeft, UserCircle2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

import Button from "../../ui/Button/Button";
import styles from "./ProfileHeader.module.css";

export default function ProfileHeader() {
  const navigate = useNavigate();

  return (
    <header className={styles.header}>

      <Button
        variant="ghost"
        onClick={() => navigate("/dashboard")}
      >
        <ArrowLeft size={18} />
        Back
      </Button>
      <div className={styles.content}>
        <div className={styles.icon}>
          <UserCircle2 size={34} />
        </div>

        <div>
          <h1>Profile Settings</h1>

          <p>
            Manage your account information and
            security settings.
          </p>
        </div>
      </div>
    </header>
  );
}