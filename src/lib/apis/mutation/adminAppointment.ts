import type { AppointmentStatus } from "@/types/appointment";

type AdminAppointmentStatus = Extract<
  AppointmentStatus,
  "Confirmed" | "Cancelled"
>;

const updateAppointmentStatus = async (
  appointmentId: string,
  status: AdminAppointmentStatus,
) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/admin/appointments/${appointmentId}/status`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status }),
    },
  );
  const result = await res.json();

  if (!res.ok) {
    throw new Error(result.message ?? "Could not update this appointment.");
  }
  return result;
};

// confirm a pending appointment as an admin
export const confirmAppointment = (appointmentId: string) =>
  updateAppointmentStatus(appointmentId, "Confirmed");

// cancel a pending or confirmed appointment as an admin
export const cancelAppointmentAsAdmin = (appointmentId: string) =>
  updateAppointmentStatus(appointmentId, "Cancelled");
