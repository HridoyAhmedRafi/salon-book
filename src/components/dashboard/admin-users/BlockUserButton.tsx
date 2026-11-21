"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Ban, LoaderCircle } from "lucide-react";
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

export interface BlockUserButtonProps {
  user: Pick<IAdminUser, "_id" | "name">;
}

/**
 * Marks a customer account as blocked after the admin confirms the dialog.
 */
export function BlockUserButton({ user }: BlockUserButtonProps) {
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleBlock = async () => {
    if (submitting) {
      return;
    }

    setSubmitting(true);

    try {
      const result = await setUserBlocked(user._id, true);

      if (!result.ok) {
        toast.error(result.message);
        return;
      }

      toast.success("Customer blocked.");
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
        <Ban />
        Block
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Block this customer?</DialogTitle>
          <DialogDescription>
            {user.name}&apos;s account will be marked as blocked. You can
            restore access at any time.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <DialogClose render={<Button type="button" variant="outline" />}>
            Keep active
          </DialogClose>

          <Button
            variant="destructive"
            onClick={handleBlock}
            disabled={submitting}
            className="cursor-pointer"
          >
            {submitting ? <LoaderCircle className="animate-spin" /> : null}
            {submitting ? "Blocking..." : "Yes, block"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
