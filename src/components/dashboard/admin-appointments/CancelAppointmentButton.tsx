"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { LoaderCircle, X } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cancelAppointmentAsAdmin } from "@/lib/apis/mutation/adminAppointment";
import type { AppointmentStatus } from "@/types/appointment";

export interface CancelAppointmentButtonProps {
  appointmentId: string;
  serviceName: string;
  customerName: string;
  status: AppointmentStatus;
}

/**
 * Cancels a pending or confirmed appointment after the admin confirms the
 * dialog.
 */
export function CancelAppointmentButton({
  appointmentId,
  serviceName,
  customerName,
  status,
}: CancelAppointmentButtonProps) {
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleCancel = async () => {
    if (submitting) {
      return;
    }

    setSubmitting(true);

    try {
      const result = await cancelAppointmentAsAdmin(appointmentId);

      if (!result.ok) {
        toast.error(result.message);
        return;
      }

      toast.success("Appointment cancelled.");
      setOpen(false);
      router.refresh();
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={
          <Button
            variant="ghost"
            size="sm"
            className="h-8 cursor-pointer px-2.5 text-destructive hover:bg-destructive/10 hover:text-destructive"
          />
        }
      >
        <X />
        Cancel
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Cancel this appointment?</DialogTitle>
          <DialogDescription>
            {serviceName} for {customerName} is currently {status.toLowerCase()}
            . Cancelling it cannot be undone.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <DialogClose render={<Button type="button" variant="outline" />}>
            Keep it
          </DialogClose>

          <Button
            variant="destructive"
            onClick={handleCancel}
            disabled={submitting}
            className="cursor-pointer"
          >
            {submitting ? <LoaderCircle className="animate-spin" /> : null}
            {submitting ? "Cancelling..." : "Yes, cancel"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
