import { IServicePost } from "@/types/service";

export const getServices = async (query = ""): Promise<IServicePost[]> => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/services?${query}`,
    {
      cache: "no-store",
    },
  );
  return res.json();
};
