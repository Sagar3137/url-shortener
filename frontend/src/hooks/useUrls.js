import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { analyticsKeys } from "./useAnalytics";
import {
  getMyUrls,
  getUrlDetails,
  createShortUrl,
  updateUrl,
  deleteUrl,
} from "../api/urls";

// ── Query keys ──────────────────────────────────────────────
export const urlKeys = {
  all: ["urls"],
  list: ({
    page = 1,
    page_size = 10,
    search = "",
    sort_by = "created_at",
    order = "desc",
  }) => [
      "urls",
      page,
      page_size,
      search,
      sort_by,
      order,
  ],
  detail: (code) => ["urls", "detail", code],
};

// ── Queries ─────────────────────────────────────────────────

/** Paginated list of the user's URLs */
export function useMyUrls(params = {}) {
  return useQuery({
    queryKey: urlKeys.list(params),
    queryFn: () => getMyUrls(params),
    placeholderData: (previousData) => previousData, // smooth pagination — don't flash empty between pages
  });
}

/** Single URL detail (with click analytics) */
export function useUrlDetails(shortCode) {
  return useQuery({
    queryKey: urlKeys.detail(shortCode),
    queryFn: () => getUrlDetails(shortCode),
    enabled: Boolean(shortCode),
  });
}

// ── Mutations ────────────────────────────────────────────────

/** Create a new short URL */
export function useCreateUrl() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: createShortUrl,

    onSuccess: () => {
      qc.invalidateQueries({
        queryKey: urlKeys.all,
      });

      qc.invalidateQueries({
        queryKey: analyticsKeys.all,
      });
    },
  });
}

/** Update the destination of an existing short URL */
export function useUpdateUrl() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: ({ shortCode, data }) =>
      updateUrl(shortCode, data),

    onSuccess: (_, variables) => {
      qc.invalidateQueries({
        queryKey: urlKeys.all,
      });

      qc.invalidateQueries({
        queryKey: urlKeys.detail(
          variables.shortCode
        ),
      });

      qc.invalidateQueries({
        queryKey: analyticsKeys.all,
      });
    },
  });
}

/** Delete a short URL */
export function useDeleteUrl() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (shortCode) => deleteUrl(shortCode),

    onSuccess: () => {
      qc.invalidateQueries({
        queryKey: urlKeys.all,
      });

      qc.invalidateQueries({
        queryKey: analyticsKeys.all,
      });
    },
  });
}
