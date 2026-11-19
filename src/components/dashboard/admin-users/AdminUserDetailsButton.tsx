"use client";

import { Eye } from "lucide-react";

import { StatusBadge } from "@/components/dashboard/shared/StatusBadge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { formatDate } from "@/lib/format";
import type { IAdminUser } from "@/types/admin-user";

import { UserAvatar } from "./UserAvatar";

export interface AdminUserDetailsButtonProps {
  user: IAdminUser;
}

/**
 * Opens a dialog with the customer's account details.
 */
export function AdminUserDetailsButton({ user }: AdminUserDetailsButtonProps) {
  return (
    <Dialog>
      <DialogTrigger render={<Button variant="outline" size="sm" />}>
        <Eye />
        View
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="pr-8">Customer details</DialogTitle>
          <DialogDescription>
            Account information and booking activity.
          </DialogDescription>
        </DialogHeader>

        <div className="mt-2 flex items-center gap-3 rounded-lg border border-border bg-muted/40 p-3">
          <UserAvatar name={user.name} image={user.image} large />

          <div className="min-w-0">
            <p className="truncate font-medium">{user.name}</p>
            <p className="truncate text-xs text-muted-foreground">
              {user.email}
            </p>
          </div>
        </div>

        <dl className="mt-4 grid grid-cols-2 gap-4 text-sm">
          <Detail label="Joined" value={formatDate(user.createdAt)} />
          <Detail label="Appointments" value={String(user.appointmentCount)} />

          <div className="space-y-1">
            <dt className="text-xs text-muted-foreground">Account</dt>
            <dd>
              <StatusBadge tone={user.isBlocked ? "danger" : "success"}>
                {user.isBlocked ? "Blocked" : "Active"}
              </StatusBadge>
            </dd>
          </div>

          <Detail label="Role" value="Customer" />
        </dl>
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
