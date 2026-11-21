"use server";

import type { ActionResult } from "../core/errors";
import { readApiError } from "../core/errors";
import { protectedMutation } from "../core/token-apis";

// block or unblock a customer from the admin dashboard
export const setUserBlocked = async (
  userId: string,
  isBlocked: boolean,
): Promise<ActionResult<unknown>> => {
  const api = `${process.env.NEXT_PUBLIC_BASE_URL}/admin/users/${userId}/status`;
  const res = await protectedMutation(api, "PATCH", { isBlocked });

  if (!res.ok) {
    return {
      ok: false,
      status: res.status,
      message: await readApiError(res, "Could not update this customer."),
    };
  }

  return { ok: true, data: await res.json().catch(() => null) };
};
