"use server";

import type { IService } from "@/types/service";
import type { ActionResult } from "../core/errors";
import { readApiError } from "../core/errors";
import { protectedMutation } from "../core/token-apis";

// add service
export const AddService = async (
  data: IService,
): Promise<ActionResult<{ acknowledged?: boolean }>> => {
  const api = `${process.env.NEXT_PUBLIC_BASE_URL}/add-service`;
  const res = await protectedMutation(api, "POST", data);

  if (!res.ok) {
    return {
      ok: false,
      status: res.status,
      message: await readApiError(res, "Could not add the service."),
    };
  }

  const result = (await res.json().catch(() => null)) as {
    acknowledged?: boolean;
  } | null;

  return { ok: true, data: result ?? {} };
};
