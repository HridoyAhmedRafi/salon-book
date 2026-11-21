"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Check, LoaderCircle } from "lucide-react";
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
import { confirmAppointment } from "@/lib/apis/mutation/adminAppointment";

export interface ConfirmAppointmentButtonProps {
  appointmentId: string;
  serviceName: string;
  customerName: string;
}

/**
 * Confirms a pending appointment after the admin approves the request.
 */
export function ConfirmAppointmentButton({
  appointmentId,
  serviceName,
  customerName,
}: ConfirmAppointmentButtonProps) {
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleConfirm = async () => {
    if (submitting) {
      return;
    }

    setSubmitting(true);

    try {
      const result = await confirmAppointment(appointmentId);

      if (!result.ok) {
        toast.error(result.message);
        return;
      }

      toast.success("Appointment confirmed.");
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
            variant="outline"
            size="sm"
            className="h-8 cursor-pointer border-emerald-500/40 px-2.5 text-emerald-700 hover:bg-emerald-500/10 hover:text-emerald-700 dark:text-emerald-400 dark:hover:text-emerald-400"
          />
        }
      >
        <Check />
        Confirm
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirm this appointment?</DialogTitle>
          <DialogDescription>
            {serviceName} for {customerName} will be marked as confirmed. The
            customer will not be able to cancel it from their dashboard.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <DialogClose render={<Button type="button" variant="outline" />}>
            Not yet
          </DialogClose>

          <Button
            onClick={handleConfirm}
            disabled={submitting}
            className="cursor-pointer"
          >
            {submitting ? <LoaderCircle className="animate-spin" /> : null}
            {submitting ? "Confirming..." : "Yes, confirm"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
