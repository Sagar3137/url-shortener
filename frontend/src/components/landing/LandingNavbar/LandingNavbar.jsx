import { Link } from "react-router-dom";
import {
  Link2,
  Menu,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";
import Button from "../../ui/Button/Button";
import styles from "./LandingNavbar.module.css";
import ThemeToggle from "../../ui/ThemeToggle/ThemeToggle";

const navItems = [
  {
    id: "features",
    label: "Features",
  },
  {
    id: "how-it-works",
    label: "How It Works",
  },
  {
    id: "cta",
    label: "Get Started",
  },
];


export default function LandingNavbar() {

  const [activeSection, setActiveSection] = useState("");

  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const sections = document.querySelectorAll("section[id]");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        threshold: 0.4,
      }
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);



  return (
    <header className={styles.landingNav}>
      <div className={styles.navContainer}>
        {/* Brand */}
        <Link to="/" className={styles.navBrand}>
          <Link2 size={20} />
          <span>snip.</span>
        </Link>

        <nav className={styles.navLinks}>
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={`${styles.navLink} ${activeSection === item.id ? styles.active : ""
                }`}
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Actions */}
        <div className={styles.navActions}>
          <ThemeToggle />

          <Link to="/login">
            <Button variant="ghost">
              Sign In
            </Button>
          </Link>

          <Link to="/register">
            <Button>
              Get Started
            </Button>
          </Link>
        </div>
        <button
          type="button"
          className={styles.menuButton}
          onClick={() => setMenuOpen(prev => !prev)}
          aria-label="Toggle navigation"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

      </div>
      {menuOpen && (
        <div className={styles.mobileMenu}>

          {navItems.map(item => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={() => setMenuOpen(false)}
            >
              {item.label}
            </a>
          ))}

          <Link
            to="/login"
            onClick={() => setMenuOpen(false)}
          >
            Sign In
          </Link>

          <Link
            to="/register"
            onClick={() => setMenuOpen(false)}
          >
            Get Started
          </Link>

        </div>
      )}
    </header>
  );
}