import { Link } from "react-router-dom";
import { Link2 } from "lucide-react";

import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>

        {/* Brand */}
        <div className={styles.brand}>
          <div className={styles.logo}>
            <Link2 size={20} />
            <span>snip.</span>
          </div>

          <p>
            Modern Link Management Platform built with
            React and FastAPI.
          </p>
        </div>

        {/* Quick Links */}
        <div className={styles.column}>
          <h4>Quick Links</h4>

          <a href="#features">Features</a>
          <a href="#how-it-works">How It Works</a>
          <Link to="/register">Get Started</Link>
        </div>

        {/* Resources */}
        <div className={styles.column}>
          <h4>Resources</h4>

          <a
            href="https://github.com"
            target="_blank"
            rel="noreferrer"
          >
{/*             <Github size={16} />
            GitHub */}
          </a>

          <span className={styles.comingSoon}>
            Documentation
            <small>Coming Soon</small>
          </span>
        </div>

      </div>

      <div className={styles.bottom}>

        <span>
          © 2026 <strong>snip.</strong> All rights reserved.
        </span>
      </div>
    </footer>
  );
}