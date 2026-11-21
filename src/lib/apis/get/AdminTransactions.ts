import type { IAdminTransaction } from "@/types/admin-transaction";
import { readApiError } from "../core/errors";
import { getFetch } from "../core/token-apis";

/** Loads every successful Stripe transaction for the admin dashboard. */
export const getAdminTransactions = async (): Promise<
  IAdminTransaction[]
> => {
  const api = `${process.env.NEXT_PUBLIC_BASE_URL}/admin/transactions`;
  const res = await getFetch(api);

  if (!res.ok) {
    throw new Error(await readApiError(res, "Failed to load transactions."));
  }

  const data = await res.json().catch(() => null);

  return Array.isArray(data) ? (data as IAdminTransaction[]) : [];
};
