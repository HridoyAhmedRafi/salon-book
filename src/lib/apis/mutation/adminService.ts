"use server";

import type { IService, ServiceStatus } from "@/types/service";
import type { ActionResult } from "../core/errors";
import { readApiError } from "../core/errors";
import { protectedMutation } from "../core/token-apis";

export const updateService = async (
  id: string,
  data: IService,
): Promise<ActionResult<unknown>> => {
  const api = `${process.env.NEXT_PUBLIC_BASE_URL}/services/${id}`;
  const res = await protectedMutation(api, "PATCH", data);

  if (!res.ok) {
    return {
      ok: false,
      status: res.status,
      message: await readApiError(res, "Could not update this service."),
    };
  }

  return { ok: true, data: await res.json().catch(() => null) };
};

export const updateServiceStatus = async (
  id: string,
  status: ServiceStatus,
): Promise<ActionResult<unknown>> => {
  const api = `${process.env.NEXT_PUBLIC_BASE_URL}/services/${id}/status`;
  const res = await protectedMutation(api, "PATCH", { status });

  if (!res.ok) {
    return {
      ok: false,
      status: res.status,
      message: await readApiError(res, "Could not update the service status."),
    };
  }

  return { ok: true, data: await res.json().catch(() => null) };
};

export const deleteService = async (id: string): Promise<ActionResult<unknown>> => {
  const api = `${process.env.NEXT_PUBLIC_BASE_URL}/services/${id}`;
  const res = await protectedMutation(api, "DELETE");

  if (!res.ok) {
    return {
      ok: false,
      status: res.status,
      message: await readApiError(res, "Could not delete this service."),
    };
  }

  return { ok: true, data: await res.json().catch(() => null) };
};
