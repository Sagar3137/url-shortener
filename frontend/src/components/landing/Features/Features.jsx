import {
  BarChart3,
  QrCode,
  Link2,
  ShieldCheck,
} from "lucide-react";

import FeatureCard from "./FeatureCard";
import styles from "./Features.module.css";
import SectionHeader from "../../common/SectionHeader/SectionHeader";

const features = [
  {
    icon: BarChart3,
    title: "Detailed Analytics",
    description:
      "Track clicks, monitor performance, and understand how your links are being used.",
  },
  {
    icon: QrCode,
    title: "QR Code Generation",
    description:
      "Generate QR codes instantly for every short link and share them anywhere.",
  },
  {
    icon: Link2,
    title: "Custom Aliases",
    description:
      "Create memorable and branded short links instead of random characters.",
  },
  {
    icon: ShieldCheck,
    title: "Smart Link Management",
    description:
      "Manage your links securely with authentication and a protected dashboard.",
  },
];

export default function Features() {
  return (
    <section
      id="features"
      className={styles.features}
    >
      <div className={styles.featuresContainer}>
        <SectionHeader
            title="Everything You Need"
            subtitle="Everything you need to create, manage, share, and track your links—all in one place."
        />

        <div className={styles.featuresGrid}>
          {features.map((feature) => (
            <FeatureCard
              key={feature.title}
              {...feature}
            />
          ))}
        </div>
      </div>
    </section>
  );
}