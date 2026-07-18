import { useQuery } from "@tanstack/react-query";
import { getAnalytics } from "../api/analytics";

export const analyticsKeys = {
  all: ["analytics"],
};

export function useAnalytics() {
  return useQuery({
    queryKey: analyticsKeys.all,
    queryFn: getAnalytics,
  });
}