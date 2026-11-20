"use server";
import { IService } from "@/types/service";
import { protectedMutation } from "../core/token-apis";

// add service
export const AddService = async (data: IService) => {
  const api = `${process.env.NEXT_PUBLIC_BASE_URL}/add-service`;
  const res = await protectedMutation(api, "POST", data);
  const result = await res.json();
  if (!res.ok) {
    throw new Error(result.message);
  }
  return result;
};
