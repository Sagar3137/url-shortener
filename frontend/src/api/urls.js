import client from "./client";

/**
 * POST /urls
 * @param {{ long_url: string, alias?: string }} data
 * @returns {Promise<URLResponse>}
 */
export const createShortUrl = async (data) => {
  const res = await client.post("/urls", data);
  return res.data;
};

/**
 * GET /urls  (paginated + filterable)
 * @param {{ page?: number, page_size?: number, search?: string, sort_by?: string, order?: string }} params
 * @returns {Promise<PaginatedURLResponse>}
 */
export const getMyUrls = async ({
  page = 1,
  page_size = 10,
  search,
  sort_by = "created_at",
  order = "desc",
} = {}) => {
  const res = await client.get("/urls", {
    params: {
      page,
      page_size,
      search: search || undefined,
      sort_by,
      order,
    },
  });

  return res.data;
};

/**
 * GET /urls/:short_code
 * @param {string} shortCode
 * @returns {Promise<URLDetails>}
 */
export const getUrlDetails = async (shortCode) => {
  const res = await client.get(`/urls/${shortCode}`);
  return res.data;
};

/**
 * PATCH /urls/:short_code
 * @param {string} shortCode
 * @param {{ long_url: string }} data
 * @returns {Promise<URLResponse>}
 */
export const updateUrl = async (shortCode, data) => {
  const res = await client.patch(`/urls/${shortCode}`, data);
  return res.data;
};

/**
 * DELETE /urls/:short_code
 * @param {string} shortCode
 * @returns {Promise<void>}
 */
export const deleteUrl = async (shortCode) => {
  await client.delete(`/urls/${shortCode}`);
};