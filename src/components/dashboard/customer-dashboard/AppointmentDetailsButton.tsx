"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AppointmentStatusBadge,
  PaymentStatusBadge,
} from "@/components/dashboard/shared/AppointmentBadges";
import { formatDate, formatPrice } from "@/lib/format";
import type { IAppointmentPost } from "@/types/appointment";

export interface AppointmentDetailsButtonProps {
  appointment: IAppointmentPost;
  serviceName: string;
  serviceCategory?: string;
}

/**
 * Opens a dialog with every detail of an appointment.
 */
export function AppointmentDetailsButton({
  appointment,
  serviceName,
  serviceCategory,
}: AppointmentDetailsButtonProps) {
  return (
    <Dialog>
      <DialogTrigger render={<Button variant="outline" size="sm" />}>
        Details
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>{serviceName}</DialogTitle>
          <DialogDescription>
            {serviceCategory ?? "Salon service"}
          </DialogDescription>
        </DialogHeader>

        <dl className="mt-5 grid grid-cols-2 gap-4 text-sm">
          <Detail label="Date" value={formatDate(appointment.appointmentDate)} />
          <Detail label="Time" value={appointment.timeSlot} />
          <Detail label="Price" value={formatPrice(appointment.price)} />
          <Detail
            label="Requested"
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
          <div className="mt-5 rounded-lg bg-muted/60 p-3">
            <p className="text-xs text-muted-foreground">Your message</p>
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
