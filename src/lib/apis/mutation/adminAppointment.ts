"use server";

import type { AppointmentStatus } from "@/types/appointment";
import type { ActionResult } from "../core/errors";
import { readApiError } from "../core/errors";
import { protectedMutation } from "../core/token-apis";

type AdminAppointmentStatus = Extract<
  AppointmentStatus,
  "Confirmed" | "Cancelled"
>;

const updateAppointmentStatus = async (
  appointmentId: string,
  status: AdminAppointmentStatus,
): Promise<ActionResult<unknown>> => {
  const api = `${process.env.NEXT_PUBLIC_BASE_URL}/admin/appointments/${appointmentId}/status`;
  const res = await protectedMutation(api, "PATCH", { status });

  if (!res.ok) {
    return {
      ok: false,
      status: res.status,
      message: await readApiError(
        res,
        "Could not update this appointment.",
      ),
    };
  }

  return { ok: true, data: await res.json().catch(() => null) };
};

// confirm a pending appointment as an admin
export const confirmAppointment = async (appointmentId: string) =>
  updateAppointmentStatus(appointmentId, "Confirmed");

// cancel a pending or confirmed appointment as an admin
export const cancelAppointmentAsAdmin = async (appointmentId: string) =>
  updateAppointmentStatus(appointmentId, "Cancelled");
