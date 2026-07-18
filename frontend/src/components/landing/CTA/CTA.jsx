import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

import Button from "../../ui/Button/Button";
import SectionHeader from "../../common/SectionHeader/SectionHeader";
import styles from "./CTA.module.css";

export default function CTA() {
  return (
    <section className={styles.cta}>
      <div className={styles.container}>
        <div className={styles.card}>
          <SectionHeader
            title="Ready to simplify your links?"
            subtitle="Join thousands of users managing, sharing, and tracking their links with snip."
          />

          <div className={styles.actions}>
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
      </div>
    </section>
  );
}