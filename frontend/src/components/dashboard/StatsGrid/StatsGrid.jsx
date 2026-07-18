import {
  Link2,
  MousePointerClick,
  Activity,
  QrCode,
} from "lucide-react";

import StatCard from "./StatCard";
import styles from "./StatsGrid.module.css";

export default function StatsGrid({
  totalLinks,
  totalClicks,
  activeLinks,
}) {
  const stats = [
    {
      title: "Total Links",
      value: totalLinks,
      icon: Link2,
    },
    {
      title: "Total Clicks",
      value: totalClicks,
      icon: MousePointerClick,
    },
    {
      title: "Active Links",
      value: activeLinks,
      icon: Activity,
    },
    {
      title: "QR Codes",
      value: totalLinks,
      icon: QrCode,
    },
  ];

  return (
    <section className={styles.grid}>
      {stats.map((stat) => (
        <StatCard
          key={stat.title}
          {...stat}
        />
      ))}
    </section>
  );
}