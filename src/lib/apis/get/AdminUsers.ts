import type { IAdminUser } from "@/types/admin-user";
import { getFetch } from "../core/token-apis";

/** Loads every registered customer for the admin dashboard. */
export const getAdminUsers = async (): Promise<IAdminUser[]> => {
  const api = `${process.env.NEXT_PUBLIC_BASE_URL}/admin/users`;
  const res = await getFetch(api);
  if (!res.ok) {
    throw new Error("Failed to load customers");
  }
  return res.json();
};
