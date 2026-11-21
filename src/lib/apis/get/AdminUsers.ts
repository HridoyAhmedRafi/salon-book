import type { IAdminUser } from "@/types/admin-user";
import { readApiError } from "../core/errors";
import { getFetch } from "../core/token-apis";

/** Loads every registered customer for the admin dashboard. */
export const getAdminUsers = async (): Promise<IAdminUser[]> => {
  const api = `${process.env.NEXT_PUBLIC_BASE_URL}/admin/users`;
  const res = await getFetch(api);

  if (!res.ok) {
    throw new Error(await readApiError(res, "Failed to load customers."));
  }

  const data = await res.json().catch(() => null);

  return Array.isArray(data) ? (data as IAdminUser[]) : [];
};
