"use server";
import type { AppointmentStatus } from "@/types/appointment";
import { protectedMutation } from "../core/token-apis";

type AdminAppointmentStatus = Extract<
  AppointmentStatus,
  "Confirmed" | "Cancelled"
>;

const updateAppointmentStatus = async (
  appointmentId: string,
  status: AdminAppointmentStatus,
) => {
  const api = `${process.env.NEXT_PUBLIC_BASE_URL}/admin/appointments/${appointmentId}/status`;
  const res = await protectedMutation(api, "PATCH", { status });
  const result = await res.json();

  if (!res.ok) {
    throw new Error(result.message ?? "Could not update this appointment.");
  }
  return result;
};

// confirm a pending appointment as an admin
export const confirmAppointment = async (appointmentId: string) =>
  updateAppointmentStatus(appointmentId, "Confirmed");

// cancel a pending or confirmed appointment as an admin
export const cancelAppointmentAsAdmin = async (appointmentId: string) =>
  updateAppointmentStatus(appointmentId, "Cancelled");
