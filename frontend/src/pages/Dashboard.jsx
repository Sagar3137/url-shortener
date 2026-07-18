import { useState } from "react";
import { useToast } from "../hooks/useToast";
import { useNavigate } from "react-router-dom";

import { useAnalytics } from "../hooks/useAnalytics";
import DashboardHeader from "../components/dashboard/DashboardHeader/DashboardHeader";
import StatsGrid from "../components/dashboard/StatsGrid/StatsGrid";
import QuickShortener from "../components/dashboard/QuickShortener/QuickShortener";
import UrlToolbar from "../components/dashboard/UrlToolbar/UrlToolbar";
import UrlList from "../components/dashboard/UrlList/UrlList";
import Pagination from "../components/dashboard/Pagination/Pagination";
import DeleteConfirmModal from "../components/dashboard/DeleteConfirmModal/DeleteConfirmModal";
import QRModal from "../components/dashboard/QRModal/QRModal";
import TopPerformerCard from "../components/dashboard/TopPerformerCard/TopPerformerCard";
import RecentLinksCard from "../components/dashboard/RecentLinksCard/RecentLinksCard";
import {
  useMyUrls,
  useDeleteUrl,
} from "../hooks/useUrls";

import styles from "./Dashboard.module.css";


export default function Dashboard() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("created_at");
  const [order, setOrder] = useState("desc");
  const [page, setPage] = useState(1);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [selectedUrl, setSelectedUrl] = useState(null);
  const [qrOpen, setQrOpen] = useState(false);
  const [selectedQrUrl, setSelectedQrUrl] = useState(null);
  const toast = useToast();

  const { data: analytics } = useAnalytics();

  const {
    data,
    isLoading,
    isError,
    error,
  } = useMyUrls({
    page,
    page_size: 10,
    search,
    sort_by: sortBy,
    order,
  });

  const deleteMutation = useDeleteUrl();

  if (isError) {
    return (
      <main className={styles.dashboard}>
        <p>
          {error?.response?.data?.detail ??
            "Something went wrong."}
        </p>
      </main>
    );
  }

  return (
    <main className={styles.dashboard}>
      <DashboardHeader />

      
      <StatsGrid
        totalLinks={analytics?.total_links ?? 0}
        totalClicks={analytics?.total_clicks ?? 0}
        activeLinks={analytics?.active_links ?? 0}
      />

      <QuickShortener />

      <div className={styles.analyticsRow}>

        <TopPerformerCard
          link={analytics?.top_link}
          onCopy={async () => {
            await navigator.clipboard.writeText(
              analytics.top_link.short_url
            );

            toast.success("Link copied!");
          }}
          onVisit={() =>
            window.open(
              analytics.top_link.short_url,
              "_blank",
              "noopener,noreferrer"
            )
          }
        />

        <RecentLinksCard
          links={analytics?.recent_links ?? []}
        />

      </div>


      <UrlToolbar
        search={search}
        onSearch={(value) => {
          setSearch(value);
          setPage(1);
        }}
        sort={sortBy}
        order={order}
        total={data?.total ?? 0}
        onSort={(field) => {
          setSortBy(field);

          // Set sensible default order when changing field
          if (field === "created_at") {
            setOrder("desc"); // Newest first
          } else if (field === "clicks") {
            setOrder("desc"); // Highest first
          } else {
            setOrder("asc"); // A-Z
          }

          setPage(1);
        }}
        onOrderChange={(value) => {
          setOrder(value);
          setPage(1);
        }}
      />

      <UrlList
        urls={data?.items ?? []}
        isLoading={isLoading}
        onCopy={async (url) => {
          await navigator.clipboard.writeText(url.short_url);
          toast.success("Link copied!");
        }}
        onVisit={(url) =>
          window.open(
            url.short_url,
            "_blank",
            "noopener,noreferrer"
          )
        }
        onQr={(url) => {
          setSelectedQrUrl(url);
          setQrOpen(true);
        }}
        onDetails={(url) => {
          navigate(`/urls/${url.short_code}`);
        }}
        onDelete={(url) => {
          setSelectedUrl(url);
          setDeleteOpen(true);
        }}
      />

      <Pagination
        page={page}
        totalPages={data?.total_pages ?? 1}
        onPageChange={setPage}
      />

      <DeleteConfirmModal
        open={deleteOpen}
        url={selectedUrl}
        loading={deleteMutation.isPending}
        onCancel={() => {
          setDeleteOpen(false);
          setSelectedUrl(null);
        }}
        onConfirm={() => {
          deleteMutation.mutate(selectedUrl.short_code, {
            onSuccess: () => {
              setDeleteOpen(false);
              setSelectedUrl(null);
              toast.success("Link deleted.");
            },

            onError: () => {
              toast.error("Failed to delete link.");
            }
          });
        }}
      />

      <QRModal
        open={qrOpen}
        url={selectedQrUrl}
        onClose={() => {
          setQrOpen(false);
          setSelectedQrUrl(null);
        }}
      />
    </main>
  );
}