import type { IAdminDashboardStats } from "@/types/AdminDashboardStats";
import { readApiError } from "../core/errors";
import { getFetch } from "../core/token-apis";

export const GetDashboardStats = async (): Promise<IAdminDashboardStats> => {
  const api = `${process.env.NEXT_PUBLIC_BASE_URL}/admin/dashboard-stats`;
  const res = await getFetch(api);

  if (!res.ok) {
    throw new Error(await readApiError(res, "Failed to fetch dashboard statistics."));
  }

  const data = await res.json().catch(() => null);

  if (!data || typeof data !== "object" || Array.isArray(data)) {
    throw new Error("The dashboard statistics response was not valid.");
  }

  return data as IAdminDashboardStats;
};
