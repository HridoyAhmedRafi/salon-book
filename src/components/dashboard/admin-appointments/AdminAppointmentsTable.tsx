import Image from "next/image";
import { CalendarDays, Scissors, UserRound } from "lucide-react";

import {
  AppointmentStatusBadge,
  PaymentStatusBadge,
} from "@/components/dashboard/shared/AppointmentBadges";
import { formatDate, formatPrice } from "@/lib/format";
import { getValidImageUrl } from "@/lib/image";
import type { IAdminAppointment } from "@/types/appointment";

import { AdminAppointmentDetailsButton } from "./AdminAppointmentDetailsButton";
import { CancelAppointmentButton } from "./CancelAppointmentButton";
import { ConfirmAppointmentButton } from "./ConfirmAppointmentButton";

export interface AdminAppointmentsTableProps {
  appointments: IAdminAppointment[];
}

function EmptyAppointments() {
  return (
    <div className="flex min-h-64 flex-col items-center justify-center rounded-xl border border-dashed border-border px-6 text-center">
      <span className="mb-3 flex size-12 items-center justify-center rounded-full bg-muted text-muted-foreground">
        <CalendarDays className="size-6" />
      </span>

      <h2 className="text-lg font-semibold">No appointment requests yet</h2>

      <p className="mt-1 max-w-sm text-sm text-muted-foreground">
        Customer booking requests will appear here as soon as they are made.
      </p>
    </div>
  );
}

export function AdminAppointmentsTable({
  appointments,
}: AdminAppointmentsTableProps) {
  if (appointments.length === 0) {
    return <EmptyAppointments />;
  }

  return (
    <div className="overflow-hidden rounded-xl border border-border bg-card">
      <div className="overflow-x-auto">
        <table className="w-full min-w-6xl text-left text-sm">
          <thead className="bg-muted/50 text-[11px] tracking-wider text-muted-foreground uppercase">
            <tr>
              <th scope="col" className="px-5 py-3 font-semibold">
                Customer
              </th>
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

          <tbody className="divide-y divide-border">
            {appointments.map((appointment) => {
              const customerImage = getValidImageUrl(appointment.customerImage);

              return (
                <tr
                  key={appointment._id}
                  className=" align-middle transition-colors hover:bg-muted/30"
                >
                  {/* Customer */}
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="relative flex size-10 shrink-0 items-center justify-center overflow-hidden rounded-full bg-muted">
                        {customerImage ? (
                          <Image
                            src={customerImage}
                            alt={appointment.customerName}
                            fill
                            unoptimized
                            sizes="40px"
                            className="object-cover"
                          />
                        ) : (
                          <UserRound className="size-4 text-muted-foreground" />
                        )}
                      </div>

                      <div className="min-w-0">
                        <p className="max-w-48 truncate font-medium">
                          {appointment.customerName}
                        </p>
                        <p className="max-w-48 truncate text-xs text-muted-foreground">
                          {appointment.customerEmail}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* Service */}
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-muted text-muted-foreground">
                        <Scissors className="size-4" />
                      </div>

                      <div className="min-w-0">
                        <p className="max-w-56 truncate font-medium">
                          {appointment.serviceName || "Service unavailable"}
                        </p>
                        {appointment.serviceCategory ? (
                          <p className="max-w-56 truncate text-xs text-muted-foreground">
                            {appointment.serviceCategory}
                          </p>
                        ) : null}
                      </div>
                    </div>
                  </td>

                  {/* Date & time */}
                  <td className="px-5 py-4 whitespace-nowrap">
                    <p className="font-medium">
                      {formatDate(appointment.appointmentDate)}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {appointment.timeSlot}
                    </p>
                  </td>

                  {/* Price */}
                  <td className="px-5 py-4 font-semibold whitespace-nowrap">
                    {formatPrice(appointment.price)}
                  </td>

                  {/* Appointment status */}
                  <td className="px-5 py-4">
                    <AppointmentStatusBadge status={appointment.status} />
                  </td>

                  {/* Payment status */}
                  <td className="px-5 py-4">
                    <PaymentStatusBadge status={appointment.paymentStatus} />
                  </td>

                  {/* Requested date */}
                  <td className="px-5 py-4 text-xs whitespace-nowrap text-muted-foreground">
                    {formatDate(appointment.createdAt)}
                  </td>

                  {/* Actions */}
                  <td className="px-5 py-4">
                    <div className="flex items-center justify-end gap-1.5 whitespace-nowrap">
                      <AdminAppointmentDetailsButton
                        appointment={appointment}
                      />

                      {appointment.status === "Pending" ? (
                        <ConfirmAppointmentButton
                          appointmentId={appointment._id}
                          serviceName={appointment.serviceName}
                          customerName={appointment.customerName}
                        />
                      ) : null}

                      {appointment.status === "Pending" ||
                      appointment.status === "Confirmed" ? (
                        <CancelAppointmentButton
                          appointmentId={appointment._id}
                          serviceName={appointment.serviceName}
                          customerName={appointment.customerName}
                          status={appointment.status}
                        />
                      ) : null}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
