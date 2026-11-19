import { CalendarDays, CircleCheck, CircleX, Clock } from "lucide-react";

import { StatCard } from "@/components/dashboard/shared/StatCard";
import type { IAppointmentPost } from "@/types/appointment";

import { getAppointmentStats } from "./appointment-stats";

export interface CustomerAppointmentOverviewProps {
  appointments: IAppointmentPost[];
}

/**
 * Overview cards summarising the signed-in customer's appointments.
 */
export function CustomerAppointmentOverview({
  appointments,
}: CustomerAppointmentOverviewProps) {
  const stats = getAppointmentStats(appointments);

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <StatCard
        label="Total Appointment Requests"
        value={stats.total}
        icon={CalendarDays}
        hint="Every request you've sent"
        accentClassName="bg-primary/15 text-primary"
      />

      <StatCard
        label="Pending Appointments"
        value={stats.pending}
        icon={Clock}
        hint="Waiting for salon confirmation"
        accentClassName="bg-amber-500/15 text-amber-600 dark:text-amber-400"
      />

      <StatCard
        label="Confirmed Appointments"
        value={stats.confirmed}
        icon={CircleCheck}
        hint="Your visit is scheduled"
        accentClassName="bg-emerald-500/15 text-emerald-600 dark:text-emerald-400"
      />

      <StatCard
        label="Cancelled Appointments"
        value={stats.cancelled}
        icon={CircleX}
        hint="No longer scheduled"
        accentClassName="bg-destructive/15 text-destructive"
      />
    </div>
  );
}
