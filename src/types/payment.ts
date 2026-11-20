"use server";

import { getFetch, protectedMutation } from "@/lib/apis/core/token-apis";

const getErrorMessage = async (res: Response, fallback: string) => {
  try {
    const data: { message?: unknown } = await res.json();

    return typeof data.message === "string" ? data.message : fallback;
  } catch {
    return fallback;
  }
};

export const createCheckoutSession = async (appointmentId: string) => {
  const api = `${process.env.NEXT_PUBLIC_BASE_URL}/payments/create-checkout-session`;

  const res = await protectedMutation(api, "POST", { appointmentId });

  if (!res.ok) {
    throw new Error(
      await getErrorMessage(res, "Could not create payment session."),
    );
  }

  const data: { url?: string } = await res.json();

  if (!data.url) {
    throw new Error("Checkout URL not found.");
  }

  return data.url;
};

export const verifyPayment = async (sessionId: string) => {
  const api = `${process.env.NEXT_PUBLIC_BASE_URL}/payments/verify-session/${sessionId}`;

  const res = await getFetch(api);

  if (!res.ok) {
    throw new Error(await getErrorMessage(res, "Could not verify payment."));
  }

  const data: {
    paid: boolean;
    message: string;
  } = await res.json();

  return data;
};
