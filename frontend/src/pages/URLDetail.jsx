import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import {
  useUrlDetails,
  useUpdateUrl,
  useDeleteUrl,
} from "../hooks/useUrls";
import { useToast } from "../hooks/useToast";

import Button from "../components/ui/Button/Button";
import Input from "../components/ui/Input/Input";
import Modal from "../components/ui/Modal/Modal";
import ShortCodePill from "../components/ui/ShortCodePill/ShortCodePill";

import DeleteConfirmModal from "../components/dashboard/DeleteConfirmModal/DeleteConfirmModal";
import QRModal from "../components/dashboard/QRModal/QRModal";

import styles from "./URLDetail.module.css";

export default function LinkDetail() {
  const { shortCode } = useParams();
  const navigate = useNavigate();
  const toast = useToast();

  const {
    data: url,
    isLoading,
    isError,
  } = useUrlDetails(shortCode);

  const updateUrl = useUpdateUrl(shortCode);
  const deleteUrl = useDeleteUrl();

  const [editOpen, setEditOpen] = useState(false);
  const [editUrl, setEditUrl] = useState("");
  const [editAlias, setEditAlias] = useState("");
  const [editError, setEditError] = useState("");

  const [deleteOpen, setDeleteOpen] = useState(false);
  const [qrOpen, setQrOpen] = useState(false);

  const openEdit = () => {
    setEditUrl(String(url?.long_url ?? ""));
    setEditAlias(url?.short_code ?? "");
    setEditError("");
    setEditOpen(true);
  };

  async function handleUpdate(e) {
    e.preventDefault();

    setEditError("");

    try {
      await updateUrl.mutateAsync({
        long_url: editUrl,
        alias: editAlias,
      });

      toast.success("Link updated successfully.");

      setEditOpen(false);
    } catch (err) {
      const message =
        err.response?.data?.detail ??
        "Failed to update URL.";

      setEditError(message);
      toast.error(message);
    }
  }

  if (isLoading) {
    return (
      <div className={styles.page}>
        <div className={styles.inner}>
          <div className={styles.skeletonHeader} />
          <div className={styles.skeletonBody} />
        </div>
      </div>
    );
  }

  if (isError || !url) {
    return (
      <div className={styles.page}>
        <div className={styles.inner}>
          <div className={styles.notFound}>
            <p>
              Link not found or you don't have access.
            </p>

            <Button
              variant="ghost"
              onClick={() =>
                navigate("/dashboard")
              }
            >
              ← Back to dashboard
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <div className={styles.inner}>

        <button
          className={styles.back}
          onClick={() =>
            navigate("/dashboard")
          }
        >
          <strong>← Back</strong>
        </button>

        <div className={styles.titleRow}>
          <ShortCodePill
            shortUrl={url.short_url}
            shortCode={url.short_code}
          />

          <div className={styles.actions}>

            <Button
              variant="secondary"
              size="sm"
              onClick={async () => {
                await navigator.clipboard.writeText(
                  url.short_url
                );

                toast.success("Link copied!");
              }}
            >
              Copy
            </Button>

            <Button
              variant="secondary"
              size="sm"
              onClick={() =>
                window.open(
                  url.short_url,
                  "_blank",
                  "noopener,noreferrer"
                )
              }
            >
              Visit
            </Button>

            <Button
              variant="secondary"
              size="sm"
              onClick={() => setQrOpen(true)}
            >
              QR
            </Button>

            <Button
              variant="secondary"
              size="sm"
              onClick={openEdit}
            >
              Edit
            </Button>

            <Button
              variant="primary"
              size="sm"
              onClick={() =>
                setDeleteOpen(true)
              }
            >
              Delete
            </Button>

          </div>
        </div>

        <a
          href={String(url.long_url)}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.longUrl}
          title={String(url.long_url)}
        >
          {String(url.long_url)}
        </a>

        <div className={styles.statsRow}>
          <div className={styles.stat}>
            <span className={styles.statVal}>
              {url.clicks}
            </span>

            <span className={styles.statLabel}>
              Total clicks
            </span>
          </div>

          <div className={styles.stat}>
            <span className={styles.statVal}>
              {new Date(
                url.created_at
              ).toLocaleDateString()}
            </span>

            <span className={styles.statLabel}>
              Created
            </span>
          </div>

          <div className={styles.stat}>
            <span className={styles.statVal}>
              {url.last_accessed
                ? new Date(
                    url.last_accessed
                  ).toLocaleDateString()
                : "Never"}
            </span>

            <span className={styles.statLabel}>
              Last accessed
            </span>
          </div>
        </div>

        {(url.clicks ?? 0) === 0 && (
          <div className={styles.noClicks}>
            <span className={styles.noClicksIcon}>
              ⟋
            </span>

            <p>
              No clicks yet. Share your link
              to start tracking.
            </p>
          </div>
        )}
      </div>

      <Modal
        open={editOpen}
        onClose={() => setEditOpen(false)}
        title="Edit Link"
      >
        <form
          onSubmit={handleUpdate}
          className={styles.editForm}
        >
          <Input
            label="New URL"
            type="url"
            value={editUrl}
            onChange={(e) =>
              setEditUrl(e.target.value)
            }
            required
          />

          <Input
            label="Custom Alias"
            value={editAlias}
            placeholder="youtube"
            onChange={(e) =>
              setEditAlias(
                e.target.value
                  .toLowerCase()
                  .replace(/\s+/g, "-")
                  .replace(/[^a-z0-9_-]/g, "")
              )
            }
          />

          <p className={styles.aliasPreview}>
            Preview:
            <strong>
              {" "}
              {url.short_url.replace(url.short_code, editAlias || url.short_code)}
            </strong>
          </p>

          {editError && (
            <p className={styles.editError}>
              {editError}
            </p>
          )}

          <div className={styles.editActions}>
            <Button
              type="button"
              variant="ghost"
              onClick={() =>
                setEditOpen(false)
              }
            >
              Cancel
            </Button>

            <Button
              type="submit"
              loading={updateUrl.isPending}
            >
              Save Changes
            </Button>
          </div>
        </form>
      </Modal>

      <DeleteConfirmModal
        open={deleteOpen}
        url={url}
        loading={deleteUrl.isPending}
        onCancel={() =>
          setDeleteOpen(false)
        }
        onConfirm={() => {
          deleteUrl.mutate(url.short_code, {
            onSuccess: () => {
              toast.success(
                "Link deleted."
              );

              navigate("/dashboard");
            },
            onError: () => {
              toast.error(
                "Failed to delete link."
              );
            },
          });
        }}
      />

      <QRModal
        open={qrOpen}
        url={url}
        onClose={() =>
          setQrOpen(false)
        }
      />
    </div>
  );
}