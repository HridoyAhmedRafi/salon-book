import type { IAdminService } from "@/types/admin-service";
import { getFetch } from "../core/token-apis";

export const getAdminServices = async (): Promise<IAdminService[]> => {
  const api = `${process.env.NEXT_PUBLIC_BASE_URL}/admin/services`;
  const res = await getFetch(api);

  if (!res.ok) {
    throw new Error("Failed to load services");
  }

  return res.json();
};
