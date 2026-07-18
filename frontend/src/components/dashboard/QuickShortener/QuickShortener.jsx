import { useState } from "react";
import { Link2, Zap } from "lucide-react";

import Button from "../../ui/Button/Button";
import Input from "../../ui/Input/Input";
import { useCreateUrl } from "../../../hooks/useUrls";
import styles from "./QuickShortener.module.css";
import CreateResultCard from "../CreateResultCard/CreateResultCard";
import { useToast } from "../../../hooks/useToast";

export default function QuickShortener() {

  const [longUrl, setLongUrl] = useState("");
  const [customAlias, setCustomAlias] = useState("");
  const createMutation = useCreateUrl();

  const loading = createMutation.isPending;

  const [createdUrl, setCreatedUrl] = useState(null);

  const toast = useToast();

  async function handleSubmit(e) {
    e.preventDefault();

    if (!longUrl.trim()) return;

    setCreatedUrl(null);

    try {
      const response = await createMutation.mutateAsync({
        long_url: longUrl,
        alias: customAlias || null,
      });

      setCreatedUrl(response);
      toast.success("Short link created successfully!");
      setLongUrl("");
      setCustomAlias("");
    } catch (error) {
      console.error(error);
      toast.error(
        error.response?.data?.detail ??
        "Failed to create short link."
      );
    }
  }

  return (
    <section id="quick-shortener" className={styles.card}>
      <div className={styles.header}>


        <div>
          <h2><Zap size={20} />Quick Shortener</h2>
          <p>Create a new short link instantly.</p>
        </div>
      </div>

      <form
        className={styles.form}
        onSubmit={handleSubmit}
      >
        <Input
          label="Long URL"
          placeholder="https://example.com/article"
          value={longUrl}
          onChange={(e) => setLongUrl(e.target.value)}
          required
        />

        <div className={styles.bottomRow}>
          <Input
            label="Custom Alias (optional)"
            placeholder="portfolio"
            value={customAlias}
            onChange={(e) => setCustomAlias(e.target.value)}
          />

        </div>
          <Button
            type="submit"
            disabled={loading}
            className={styles.submit}
          >
            <Link2 size={16} />

            {loading
              ? "Creating..."
              : "Shorten"}
          </Button>
      </form>

      {createdUrl && (
        <CreateResultCard
          url={createdUrl}
          onCopy={async () => {
            await navigator.clipboard.writeText(createdUrl.short_url);
            toast.success("Copied to clipboard!");
          }}
          onVisit={() =>
            window.open(
              createdUrl.short_url,
              "_blank",
              "noopener,noreferrer"
            )
          }
          onQr={() => {
            // Open QR modal
          }}
        />
      )}
    </section>
  );
}