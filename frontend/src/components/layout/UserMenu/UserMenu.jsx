import { useState, useRef, useEffect } from "react";
import { NavLink} from "react-router-dom";
import {
  User,
  LayoutDashboard,
  LogOut,
/*   ChevronDown, */
/*     UserCircle2 */
} from "lucide-react";

import { useAuth } from "../../../hooks/useAuth";
import Button from "../../ui/Button/Button";

import styles from "./UserMenu.module.css";

export default function UserMenu() {
  const { user, logout } = useAuth();

  const [open, setOpen] = useState(false);

  const menuRef = useRef(null);

  useEffect(() => {
    function handleClick(e) {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target)
      ) {
        setOpen(false);
      }
    }

    document.addEventListener(
      "mousedown",
      handleClick
    );

    return () =>
      document.removeEventListener(
        "mousedown",
        handleClick
      );
  }, []);

  return (
    <div
      className={styles.wrapper}
      ref={menuRef}
    >
      <Button
        variant="ghost"
        onClick={() => setOpen(!open)}
      >
            <User size={18} />

{/*         <span>{user?.username.charAt(0).toUpperCase()}</span> */}

{/*         <ChevronDown size={16} />
 */}      </Button>

      {open && (
        <div className={styles.menu}>

          <div className={styles.userInfo}>
            <strong>{user?.username}</strong>

            <span>{user?.email}</span>
          </div>

            <NavLink
            to="/dashboard"
            onClick={() => setOpen(false)}
            className={({ isActive }) =>
                isActive
                ? `${styles.menuItem} ${styles.active}`
                : styles.menuItem
            }
            >
            <LayoutDashboard size={16} />
            Dashboard
            </NavLink>

            <NavLink
            to="/profile"
            onClick={() => setOpen(false)}
            className={({ isActive }) =>
                isActive
                ? `${styles.menuItem} ${styles.active}`
                : styles.menuItem
            }
            >
            <User size={16} />
            My Profile
            </NavLink>

          <button
            onClick={logout}
            className={styles.logout}
          >
            <LogOut size={16} />
            Logout
          </button>

        </div>
      )}
    </div>
  );
}