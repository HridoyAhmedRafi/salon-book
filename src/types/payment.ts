"use server";

import type { ActionResult } from "@/lib/apis/core/errors";
import { readApiError } from "@/lib/apis/core/errors";
import { getFetch, protectedMutation } from "@/lib/apis/core/token-apis";

export const createCheckoutSession = async (
  appointmentId: string,
): Promise<ActionResult<string>> => {
  const api = `${process.env.NEXT_PUBLIC_BASE_URL}/payments/create-checkout-session`;

  const res = await protectedMutation(api, "POST", { appointmentId });

  if (!res.ok) {
    return {
      ok: false,
      status: res.status,
      message: await readApiError(res, "Could not create payment session."),
    };
  }

  const data = (await res.json().catch(() => null)) as {
    url?: string;
  } | null;

  if (!data?.url) {
    return {
      ok: false,
      status: res.status,
      message: "The payment link is missing. Please try again.",
    };
  }

  return { ok: true, data: data.url };
};

export const verifyPayment = async (sessionId: string) => {
  const api = `${process.env.NEXT_PUBLIC_BASE_URL}/payments/verify-session/${sessionId}`;

  const res = await getFetch(api);

  if (!res.ok) {
    throw new Error(await readApiError(res, "Could not verify payment."));
  }

  const data: {
    paid: boolean;
    message: string;
  } = await res.json();

  return data;
};
