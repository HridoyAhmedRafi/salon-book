import type { AppointmentStatus, IAppointmentPost } from "@/types/appointment";

export interface AppointmentStats {
  total: number;
  pending: number;
  confirmed: number;
  cancelled: number;
}

/**
 * Derives dashboard counters from a list of appointments.
 * Status comparison ignores casing so minor API changes stay harmless.
 */
export function getAppointmentStats(
  appointments: IAppointmentPost[],
): AppointmentStats {
  const countByStatus = (status: AppointmentStatus) =>
    appointments.filter(
      (appointment) =>
        appointment.status?.toLowerCase() === status.toLowerCase(),
    ).length;

  return {
    total: appointments.length,
    pending: countByStatus("Pending"),
    confirmed: countByStatus("Confirmed"),
    cancelled: countByStatus("Cancelled"),
  };
}
