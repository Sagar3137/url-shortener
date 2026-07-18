import { Search } from "lucide-react";
import styles from "./UrlToolbar.module.css";

export default function UrlToolbar({
  search,
  onSearch,
  sort,
  order,
  onSort,
  onOrderChange,
  total = 0,
}) {
  return (
    <section className={styles.toolbar}>
      <div className={styles.searchBox}>
        <Search size={18} />

        <input
          type="text"
          placeholder="Search by alias or URL..."
          value={search}
          onChange={(e) => onSearch(e.target.value)}
        />
      </div>

      <div className={styles.sortSection}>
        <label className={styles.label}>Sort By:</label>

        <select
          className={styles.select}
          value={sort}
          onChange={(e) => onSort(e.target.value)}
        >
          <option value="created_at">Date Created</option>
          <option value="clicks">Clicks</option>
          <option value="short_code">Alias</option>
        </select>

        <select
          className={styles.select}
          value={order}
          onChange={(e) => onOrderChange(e.target.value)}
        >
          {sort === "created_at" && (
            <>
              <option value="desc">Newest First</option>
              <option value="asc">Oldest First</option>
            </>
          )}

          {sort === "clicks" && (
            <>
              <option value="desc">Highest First</option>
              <option value="asc">Lowest First</option>
            </>
          )}

          {sort === "short_code" && (
            <>
              <option value="asc">A → Z</option>
              <option value="desc">Z → A</option>
            </>
          )}
        </select>
      </div>

      <span className={styles.total}>
        {total} {total === 1 ? "Link" : "Links"}
      </span>
    </section>
  );
}