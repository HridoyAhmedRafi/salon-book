"use server";

import type { IAppointment } from "@/types/appointment";
import type { ActionResult } from "../core/errors";
import { readApiError } from "../core/errors";
import { protectedMutation } from "../core/token-apis";

// cancel a pending appointment
export const cancelAppointment = async (
  appointmentId: string,
  customerId: string,
): Promise<ActionResult<unknown>> => {
  const api = `${process.env.NEXT_PUBLIC_BASE_URL}/appointments/${appointmentId}/cancel`;
  const res = await protectedMutation(api, "PATCH", { customerId });

  if (!res.ok) {
    return {
      ok: false,
      status: res.status,
      message: await readApiError(res, "Could not cancel this appointment."),
    };
  }

  return { ok: true, data: await res.json().catch(() => null) };
};

// book appointment
export const BookAppointment = async (
  data: IAppointment,
): Promise<ActionResult<{ acknowledged?: boolean }>> => {
  const api = `${process.env.NEXT_PUBLIC_BASE_URL}/book-appointment`;
  const res = await protectedMutation(api, "POST", data);

  if (!res.ok) {
    return {
      ok: false,
      status: res.status,
      message: await readApiError(
        res,
        "Could not send your appointment request.",
      ),
    };
  }

  const result = (await res.json().catch(() => null)) as {
    acknowledged?: boolean;
  } | null;

  return { ok: true, data: result ?? {} };
};
