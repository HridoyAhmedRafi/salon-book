import Image from "next/image";
import Link from "next/link";
import { CalendarDays, Scissors } from "lucide-react";

import {
  AppointmentStatusBadge,
  PaymentStatusBadge,
} from "@/components/dashboard/shared/AppointmentBadges";
import { Button } from "@/components/ui/button";
import { formatDate, formatPrice } from "@/lib/format";
import type { IAppointmentPost } from "@/types/appointment";
import type { IServicePost } from "@/types/service";

import { canCancelAppointment, canPayAppointment } from "./appointment-rules";
import { AppointmentDetailsButton } from "./AppointmentDetailsButton";
import { CancelAppointmentButton } from "./CancelAppointmentButton";
import { PayAppointmentButton } from "./PayAppointmentButton";

export interface MyAppointmentsTableProps {
  appointments: IAppointmentPost[];
  servicesById: Map<string, IServicePost>;
}

/**
 * Table of the signed-in customer's appointment requests.
 */
export function MyAppointmentsTable({
  appointments,
  servicesById,
}: MyAppointmentsTableProps) {
  if (appointments.length === 0) {
    return <EmptyAppointments />;
  }

  return (
    <div className="overflow-hidden rounded-xl border border-border bg-card">
      <div className="overflow-x-auto">
        <table className="w-full min-w-220 text-left text-sm">
          <thead className="bg-muted/50 text-[11px] tracking-wider text-muted-foreground uppercase">
            <tr>
              <th scope="col" className="px-5 py-3 font-semibold">
                Service
              </th>
              <th scope="col" className="px-5 py-3 font-semibold">
                Date &amp; Time
              </th>
              <th scope="col" className="px-5 py-3 font-semibold">
                Price
              </th>
              <th scope="col" className="px-5 py-3 font-semibold">
                Appointment
              </th>
              <th scope="col" className="px-5 py-3 font-semibold">
                Payment
              </th>
              <th scope="col" className="px-5 py-3 font-semibold">
                Requested
              </th>
              <th scope="col" className="px-5 py-3 text-right font-semibold">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {appointments.map((appointment) => (
              <AppointmentRow
                key={appointment._id}
                appointment={appointment}
                servicesById={servicesById}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

interface AppointmentRowProps {
  appointment: IAppointmentPost;
  servicesById: Map<string, IServicePost>;
}

function AppointmentRow({ appointment, servicesById }: AppointmentRowProps) {
  const service = resolveService(appointment, servicesById);

  return (
    <tr className="border-t border-border align-middle transition-colors hover:bg-muted/30">
      {/* Service */}
      <td className="px-5 py-3">
        <div className="flex items-center gap-3">
          <div className="relative flex size-10 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-muted">
            {service.image ? (
              <Image
                src={service.image}
                alt={service.name}
                fill
                unoptimized
                sizes="40px"
                className="object-cover"
              />
            ) : (
              <Scissors className="size-4 text-muted-foreground" />
            )}
          </div>

          <div className="min-w-0">
            <p className="truncate font-medium">{service.name}</p>
            {service.category ? (
              <p className="text-xs text-muted-foreground">
                {service.category}
              </p>
            ) : null}
          </div>
        </div>
      </td>

      {/* Date & time */}
      <td className="px-5 py-3">
        <p className="font-medium">{formatDate(appointment.appointmentDate)}</p>
        <p className="text-xs text-muted-foreground">{appointment.timeSlot}</p>
      </td>

      {/* Price */}
      <td className="px-5 py-3 font-semibold">
        {formatPrice(appointment.price)}
      </td>

      {/* Appointment status */}
      <td className="px-5 py-3">
        <AppointmentStatusBadge status={appointment.status} />
      </td>

      {/* Payment status */}
      <td className="px-5 py-3">
        <PaymentStatusBadge status={appointment.paymentStatus} />
      </td>

      {/* Requested date */}
      <td className="px-5 py-3 text-xs text-muted-foreground">
        {formatDate(appointment.createdAt)}
      </td>

      {/* Actions */}
      <td className="px-5 py-3">
        <div className="flex justify-end gap-2">
          <AppointmentDetailsButton
            appointment={appointment}
            serviceName={service.name}
            serviceCategory={service.category}
          />

          {canCancelAppointment(appointment.status) ? (
            <CancelAppointmentButton
              appointmentId={appointment._id}
              customerId={appointment.customerId}
            />
          ) : null}

          {canPayAppointment(appointment.status, appointment.paymentStatus) ? (
            <PayAppointmentButton appointment={appointment._id} />
          ) : null}
        </div>
      </td>
    </tr>
  );
}

/**
 * Appointment rows store the service name, but older rows may not.
 * Fall back to the services collection when a field is missing.
 */
function resolveService(
  appointment: IAppointmentPost,
  servicesById: Map<string, IServicePost>,
) {
  const service = servicesById.get(appointment.serviceId);

  return {
    name: service?.serviceName || "Service unavailable",
    category: service?.category,
    image: service?.image,
  };
}

function EmptyAppointments() {
  return (
    <div className="flex min-h-64 flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-border px-6 text-center">
      <CalendarDays className="size-8 text-muted-foreground" />

      <h2 className="text-lg font-semibold">No appointment requests yet</h2>

      <p className="max-w-sm text-sm text-muted-foreground">
        Browse our services and book your first appointment.
      </p>

      <Button render={<Link href="/services" />}>Browse services</Button>
    </div>
  );
}
