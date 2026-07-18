import { ArrowRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import Button from "../../ui/Button/Button";
import styles from "./Hero.module.css";
import LinkPreview from "./LinkPreview/LinkPreview";

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.heroContent}>
        {/* Left Side */}
        <div className={styles.heroLeft}>
          <div className={styles.heroBadge}>
            <Sparkles size={14} />
            <span>Modern Link Management Platform</span>
          </div>

          <h1 className={styles.heroTitle}>
            Shorten.
            <br />
            Share.
            <br />
            Track.
          </h1>

          <p className={styles.heroDescription}>
            Create short links, generate QR codes, track analytics, and manage everything from one clean dashboard..
          </p>

          <div className={styles.heroActions}>
            <Link to="/register">
              <Button>
                Get Started
                <ArrowRight size={16} />
              </Button>
            </Link>

            <Link to="/login">
              <Button variant="ghost">
                Sign In
              </Button>
            </Link>
          </div>
        </div>

        <div className={styles.heroRight}>
            <LinkPreview />
        </div>
      </div>
    </section>
  );
}