import type {
  AppointmentStatus,
  PaymentStatus,
} from "@/types/appointment";

/**
 * A customer can only cancel a request that is still pending.
 * Confirmed and cancelled appointments are locked.
 */
export function canCancelAppointment(status: AppointmentStatus) {
  return status === "Pending";
}

/**
 * A customer can only pay for a confirmed appointment that is not paid yet.
 * Pending and cancelled appointments cannot be paid.
 */
export function canPayAppointment(
  status: AppointmentStatus,
  paymentStatus: PaymentStatus,
) {
  return status === "Confirmed" && paymentStatus === "Unpaid";
}
