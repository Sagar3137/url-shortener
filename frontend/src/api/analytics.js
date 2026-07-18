import client from "./client";

/**
 * GET /analytics
 * @returns {Promise<DashboardAnalytics>}
 */
export async function getAnalytics() {
  const res = await client.get("/analytics");
  return res.data;
}