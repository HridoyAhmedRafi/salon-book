import type { IAdminService } from "@/types/admin-service";

export const getAdminServices = async (): Promise<IAdminService[]> => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/admin/services`,
    {
      cache: "no-store",
    },
  );

  if (!res.ok) {
    throw new Error("Failed to load services");
  }

  return res.json();
};
