"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { LoaderCircle, ShieldCheck } from "lucide-react";
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
import { setUserBlocked } from "@/lib/apis/mutation/adminUser";
import type { IAdminUser } from "@/types/admin-user";

export interface UnblockUserButtonProps {
  user: Pick<IAdminUser, "_id" | "name">;
}

/**
 * Restores access for a blocked customer after the admin confirms the dialog.
 */
export function UnblockUserButton({ user }: UnblockUserButtonProps) {
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleUnblock = async () => {
    if (submitting) {
      return;
    }

    setSubmitting(true);

    try {
      const result = await setUserBlocked(user._id, false);

      if (!result.ok) {
        toast.error(result.message);
        return;
      }

      toast.success("Customer unblocked.");
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
        <ShieldCheck />
        Unblock
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Unblock this customer?</DialogTitle>
          <DialogDescription>
            {user.name}&apos;s account will be marked as active again.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <DialogClose render={<Button type="button" variant="outline" />}>
            Keep blocked
          </DialogClose>

          <Button
            onClick={handleUnblock}
            disabled={submitting}
            className="cursor-pointer"
          >
            {submitting ? <LoaderCircle className="animate-spin" /> : null}
            {submitting ? "Unblocking..." : "Yes, unblock"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
