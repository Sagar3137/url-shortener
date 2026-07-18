import client from "./client";

/**
 * POST /auth/register
 * @param {{ email: string, password: string, username?: string }} data
 * @returns {Promise<UserResponse>}
 */
export const register = async (data) => {
  const res = await client.post("/auth/register", data);
  return res.data;
};

/**
 * POST /auth/login
 * @param {{ email: string, password: string }} data
 * @returns {Promise<{ access_token: string, token_type: string }>}
 */
export const login = async (data) => {
  const res = await client.post("/auth/login", data);
  return res.data;
};
