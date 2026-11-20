import type { IAdminDashboardStats } from "@/types/AdminDashboardStats";
import { getFetch } from "../core/token-apis";

export const GetDashboardStats = async (): Promise<IAdminDashboardStats> => {
  const api = `${process.env.NEXT_PUBLIC_BASE_URL}/admin/dashboard-stats`;
  const res = await getFetch(api);

  if (!res.ok) {
    throw new Error("Failed to fetch dashboard statistics");
  }

  return res.json();
};
