"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { LoaderCircle, Power, PowerOff } from "lucide-react";
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
import { updateServiceStatus } from "@/lib/apis/mutation/adminService";
import type { IAdminService } from "@/types/admin-service";
import type { ServiceStatus } from "@/types/service";

export interface ToggleServiceStatusButtonProps {
  service: Pick<IAdminService, "_id" | "serviceName" | "status">;
}

/**
 * Activates or deactivates a service after confirmation. Inactive services
 * disappear from public browsing and cannot be booked.
 */
export function ToggleServiceStatusButton({
  service,
}: ToggleServiceStatusButtonProps) {
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const nextStatus: ServiceStatus =
    service.status === "active" ? "inactive" : "active";
  const activating = nextStatus === "active";

  const handleToggle = async () => {
    if (submitting) {
      return;
    }

    setSubmitting(true);

    try {
      const result = await updateServiceStatus(service._id, nextStatus);

      if (!result.ok) {
        toast.error(result.message);
        return;
      }

      toast.success(activating ? "Service activated." : "Service deactivated.");
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
            className="h-8 cursor-pointer px-2.5"
          />
        }
      >
        {activating ? <Power /> : <PowerOff />}
        {activating ? "Activate" : "Deactivate"}
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {activating ? "Activate" : "Deactivate"} this service?
          </DialogTitle>
          <DialogDescription>
            {activating
              ? `${service.serviceName} will become visible in browse services and customers can book it again.`
              : `${service.serviceName} will disappear from public browsing and customers will not be able to book it. Existing appointments are not affected.`}
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <DialogClose render={<Button type="button" variant="outline" />}>
            Keep it {activating ? "inactive" : "active"}
          </DialogClose>

          <Button
            onClick={handleToggle}
            disabled={submitting}
            className="cursor-pointer"
          >
            {submitting ? <LoaderCircle className="animate-spin" /> : null}
            {submitting
              ? "Updating..."
              : activating
                ? "Yes, activate"
                : "Yes, deactivate"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
