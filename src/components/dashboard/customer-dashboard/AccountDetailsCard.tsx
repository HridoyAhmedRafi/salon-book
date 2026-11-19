import Link from "next/link";
import { ArrowRight, ShieldCheck } from "lucide-react";

import { StatusBadge } from "@/components/dashboard/shared/StatusBadge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { formatDate } from "@/lib/format";
import type { IProfileUser } from "@/types/profile";

function formatRole(role: string) {
  if (!role) {
    return "Customer";
  }

  return role.charAt(0).toUpperCase() + role.slice(1);
}

/**
 * Read-only account metadata. Role and blocked status are managed by the salon
 * and cannot be changed through the profile form.
 */
export function AccountDetailsCard({ user }: { user: IProfileUser }) {
  return (
    <Card className="gap-0">
      <CardHeader className="border-b border-border/60 pb-5">
        <CardTitle className="flex items-center gap-2 text-base">
          <ShieldCheck className="size-4 text-muted-foreground" />
          Account details
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-5 pt-5">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
              Role
            </p>
            <StatusBadge tone="neutral">{formatRole(user.role)}</StatusBadge>
          </div>

          <div className="space-y-1.5">
            <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
              Status
            </p>
            <StatusBadge tone={user.isBlocked ? "danger" : "success"}>
              {user.isBlocked ? "Blocked" : "Active"}
            </StatusBadge>
          </div>
        </div>

        <Separator />

        <div className="space-y-1">
          <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
            Member since
          </p>
          <p className="text-sm font-medium">{formatDate(user.createdAt)}</p>
        </div>

        <p className="rounded-lg bg-muted/60 px-3 py-2.5 text-xs leading-5 text-muted-foreground">
          Role and account status can only be changed by the salon. Contact us
          if something looks wrong.
        </p>
      </CardContent>
    </Card>
  );
}

/** Small aside prompting the customer to book their next appointment. */
export function ProfileBookingCard() {
  return (
    <Card className="gap-0 bg-primary/5 ring-primary/20">
      <CardContent className="space-y-3 py-5">
        <p className="text-sm font-semibold">Planning a visit?</p>

        <p className="text-xs leading-5 text-muted-foreground">
          Browse the salon menu and request your next appointment in a few
          clicks.
        </p>

        <Button
          variant="outline"
          size="sm"
          className="w-full cursor-pointer justify-between bg-background"
          render={<Link href="/services" />}
        >
          Browse services
          <ArrowRight />
        </Button>
      </CardContent>
    </Card>
  );
}
