import styles from "./SectionHeader.module.css";

export default function SectionHeader({
  title,
  subtitle,
  align = "center",
}) {
  return (
    <div
      className={`${styles.sectionHeader} ${
        align === "left" ? styles.left : ""
      }`}
    >
      <h2>{title}</h2>
      {subtitle && <p>{subtitle}</p>}
    </div>
  );
}