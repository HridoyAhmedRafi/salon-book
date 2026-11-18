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

export const getServiceById = async (
  id: string,
): Promise<IServicePost | null> => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/services/${id}`,
    {
      cache: "no-store",
    },
  );
  return res.json();
};

export const getFeaturedServices = async (): Promise<IServicePost[]> => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/featured-services`,
    {
      cache: "no-store",
    },
  );

  return res.json();
};
