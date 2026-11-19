"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { LoaderCircle, Trash2 } from "lucide-react";
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
import { deleteService } from "@/lib/apis/mutation/adminService";
import type { IAdminService } from "@/types/admin-service";

export interface DeleteServiceButtonProps {
  service: Pick<IAdminService, "_id" | "serviceName">;
}

/**
 * Permanently deletes a service after the admin confirms the dialog.
 */
export function DeleteServiceButton({ service }: DeleteServiceButtonProps) {
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleDelete = async () => {
    if (submitting) {
      return;
    }

    setSubmitting(true);

    try {
      await deleteService(service._id);
      toast.success("Service deleted.");
      setOpen(false);
      router.refresh();
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Could not delete this service.",
      );
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
        <Trash2 />
        Delete
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete this service?</DialogTitle>
          <DialogDescription>
            {service.serviceName} will be removed permanently. This action
            cannot be undone.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <DialogClose render={<Button type="button" variant="outline" />}>
            Cancel
          </DialogClose>

          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={submitting}
            className="cursor-pointer"
          >
            {submitting ? <LoaderCircle className="animate-spin" /> : null}
            {submitting ? "Deleting..." : "Yes, delete"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
