"use server";

import type { IService, ServiceStatus } from "@/types/service";
import { protectedMutation } from "../core/token-apis";

const getErrorMessage = async (res: Response, fallback: string) => {
  try {
    const data: { message?: unknown } = await res.json();

    return typeof data.message === "string" ? data.message : fallback;
  } catch {
    return fallback;
  }
};

export const updateService = async (id: string, data: IService) => {
  const api = `${process.env.NEXT_PUBLIC_BASE_URL}/services/${id}`;
  const res = await protectedMutation(api, "PATCH", data);

  if (!res.ok) {
    throw new Error(
      await getErrorMessage(res, "Could not update this service."),
    );
  }

  return res.json();
};

export const updateServiceStatus = async (
  id: string,
  status: ServiceStatus,
) => {
  const api = `${process.env.NEXT_PUBLIC_BASE_URL}/services/${id}/status`;
  const res = await protectedMutation(api, "PATCH", { status });

  if (!res.ok) {
    throw new Error(
      await getErrorMessage(res, "Could not update the service status."),
    );
  }

  return res.json();
};

export const deleteService = async (id: string) => {
  const api = `${process.env.NEXT_PUBLIC_BASE_URL}/services/${id}`;
  const res = await protectedMutation(api, "DELETE");

  if (!res.ok) {
    throw new Error(
      await getErrorMessage(res, "Could not delete this service."),
    );
  }

  return res.json();
};
