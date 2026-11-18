import { IServicePost } from "@/types/service";

export const getFeaturedServices = async (): Promise<IServicePost[]> => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/featured-services`,
    {
      cache: "no-store",
    },
  );

  return res.json();
};
