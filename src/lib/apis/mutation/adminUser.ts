"use server";

import { protectedMutation } from "../core/token-apis";

// block or unblock a customer from the admin dashboard
export const setUserBlocked = async (userId: string, isBlocked: boolean) => {
  const api = `${process.env.NEXT_PUBLIC_BASE_URL}/admin/users/${userId}/status`;
  const res = await protectedMutation(api, "PATCH", { isBlocked });

  const result = await res.json();

  if (!res.ok) {
    throw new Error(result.message ?? "Could not update this customer.");
  }
  return result;
};
