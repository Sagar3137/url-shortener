import { Link, useNavigate } from "react-router-dom";
import { Link2 } from "lucide-react";
import { useAuth } from "../hooks/useAuth";
import Button from "./ui/Button/Button";
import styles from "./Navbar.module.css";
import UserMenu from "./layout/UserMenu/UserMenu";
import ThemeToggle from "./ui/ThemeToggle/ThemeToggle";

export default function Navbar() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  return (
    <nav className={styles.nav}>
      <div className={styles.inner}>
        <Link to={isAuthenticated ? "/dashboard" : "/"} className={styles.logo}>
          <Link2 className={styles.logoSlash} size={20} />
          <span className={styles.logoText}>snip.</span>
        </Link>

        {isAuthenticated ? (
          <div className={styles.rightSide}>
            <ThemeToggle />
            <UserMenu />
          </div>
        ) : (
          <div className={styles.authLinks}>
            <Link to="/login" className={styles.link}>Log in</Link>
            <Button size="sm" onClick={() => navigate("/register")}>Sign up</Button>
          </div>
        )}
      </div>
    </nav>
  );
}