import {
  Link2,
  Sparkles,
  BarChart3,
} from "lucide-react";

import StepCard from "./StepCard";
import SectionHeader from "../../common/SectionHeader/SectionHeader";
import styles from "./HowItWorks.module.css";

const steps = [
  {
    step: "01",
    icon: Link2,
    title: "Paste Your URL",
    description:
      "Paste any long URL to instantly generate a clean and shareable short link.",
  },
  {
    step: "02",
    icon: Sparkles,
    title: "Generate Short Link",
    description:
      "Create a branded short link with an optional custom alias in seconds.",
  },
  {
    step: "03",
    icon: BarChart3,
    title: "Track Performance",
    description:
      "Monitor clicks, generate QR codes, and manage every link from one dashboard.",
  },
];

export default function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className={styles.howItWorks}
    >
      <div className={styles.container}>
        <SectionHeader
          title="How It Works"
          subtitle="Create, share and track your links in three simple steps."
        />

        <div className={styles.steps}>
          {steps.map((step, index) => (
            <StepCard
              key={step.step}
              {...step}
              showConnector={index !== steps.length - 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}