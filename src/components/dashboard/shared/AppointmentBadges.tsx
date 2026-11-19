import { StatusBadge, type StatusTone } from "./StatusBadge";

import type {
  AppointmentStatus,
  PaymentStatus,
} from "@/types/appointment";

const appointmentTones: Record<AppointmentStatus, StatusTone> = {
  Pending: "warning",
  Confirmed: "success",
  Cancelled: "danger",
};

export function AppointmentStatusBadge({
  status,
}: {
  status: AppointmentStatus;
}) {
  return <StatusBadge tone={appointmentTones[status]}>{status}</StatusBadge>;
}

export function PaymentStatusBadge({ status }: { status: PaymentStatus }) {
  return (
    <StatusBadge tone={status === "Paid" ? "success" : "neutral"}>
      {status}
    </StatusBadge>
  );
}
