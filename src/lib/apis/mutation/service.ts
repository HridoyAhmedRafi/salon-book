import { IService } from "@/types/service";

export const AddService = async (data: IService) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/add-service`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return res.json();
};
