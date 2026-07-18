import client from "./client";

export async function getCurrentUser() {
  const res = await client.get("/users/me");
  return res.data;
}

export async function updateProfile(data) {
  const res = await client.patch("/users/me", data);
  return res.data;
}

export async function changePassword(data) {
  const res = await client.patch("/users/me/password", data);
  return res.data;
}

export async function deleteAccount() {
  const res = await client.delete("/users/me");
  return res.data;
}