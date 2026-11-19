"use client";

import Image from "next/image";
import { Eye, UserRound } from "lucide-react";

import {
  AppointmentStatusBadge,
  PaymentStatusBadge,
} from "@/components/dashboard/shared/AppointmentBadges";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { formatDate, formatPrice } from "@/lib/format";
import { getValidImageUrl } from "@/lib/image";
import type { IAdminAppointment } from "@/types/appointment";

export interface AdminAppointmentDetailsButtonProps {
  appointment: IAdminAppointment;
}

/**
 * Opens a dialog with the full booking request, including customer details
 * and the message left at booking time.
 */
export function AdminAppointmentDetailsButton({
  appointment,
}: AdminAppointmentDetailsButtonProps) {
  const customerImage = getValidImageUrl(appointment.customerImage);

  return (
    <Dialog>
      <DialogTrigger render={<Button variant="outline" size="sm" />}>
        <Eye />
        Details
      </DialogTrigger>

      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="pr-8">
            {appointment.serviceName}
          </DialogTitle>
          <DialogDescription>
            {appointment.serviceCategory || "Salon service"} ·{" "}
            {formatPrice(appointment.price)}
          </DialogDescription>
        </DialogHeader>

        <div className="mt-2 flex items-center gap-3 rounded-lg border border-border bg-muted/40 p-3">
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
              <UserRound className="size-5 text-muted-foreground" />
            )}
          </div>

          <div className="min-w-0">
            <p className="truncate text-sm font-medium">
              {appointment.customerName}
            </p>
            <p className="truncate text-xs text-muted-foreground">
              {appointment.customerEmail}
            </p>
          </div>
        </div>

        <dl className="mt-4 grid grid-cols-2 gap-4 text-sm">
          <Detail
            label="Appointment date"
            value={formatDate(appointment.appointmentDate)}
          />
          <Detail label="Time slot" value={appointment.timeSlot} />
          <Detail label="Service price" value={formatPrice(appointment.price)} />
          <Detail
            label="Requested on"
            value={formatDate(appointment.createdAt)}
          />

          <div className="space-y-1">
            <dt className="text-xs text-muted-foreground">Appointment</dt>
            <dd>
              <AppointmentStatusBadge status={appointment.status} />
            </dd>
          </div>

          <div className="space-y-1">
            <dt className="text-xs text-muted-foreground">Payment</dt>
            <dd>
              <PaymentStatusBadge status={appointment.paymentStatus} />
            </dd>
          </div>
        </dl>

        {appointment.message ? (
          <div className="mt-4 rounded-lg bg-muted/60 p-3">
            <p className="text-xs text-muted-foreground">Customer message</p>
            <p className="mt-1 text-sm">{appointment.message}</p>
          </div>
        ) : null}
      </DialogContent>
    </Dialog>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div className="space-y-1">
      <dt className="text-xs text-muted-foreground">{label}</dt>
      <dd className="font-medium">{value}</dd>
    </div>
  );
}
