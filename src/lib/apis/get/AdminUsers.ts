import type { IAdminUser } from "@/types/admin-user";

/** Loads every registered customer for the admin dashboard. */
export const getAdminUsers = async (): Promise<IAdminUser[]> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/admin/users`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to load customers");
  }
  return res.json();
};
