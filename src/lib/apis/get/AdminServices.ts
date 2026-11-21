import type { IAdminService } from "@/types/admin-service";
import { readApiError } from "../core/errors";
import { getFetch } from "../core/token-apis";

export const getAdminServices = async (): Promise<IAdminService[]> => {
  const api = `${process.env.NEXT_PUBLIC_BASE_URL}/admin/services`;
  const res = await getFetch(api);

  if (!res.ok) {
    throw new Error(await readApiError(res, "Failed to load services."));
  }

  const data = await res.json().catch(() => null);

  return Array.isArray(data) ? (data as IAdminService[]) : [];
};
