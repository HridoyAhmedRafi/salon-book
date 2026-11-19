import Link from "next/link";
import {
  CalendarCheck,
  CalendarDays,
  CircleAlert,
  Clock,
  Plus,
  Scissors,
  Users,
  Wallet,
} from "lucide-react";

import { DashboardPageHeader } from "@/components/dashboard/shared/DashboardPageHeader";
import { StatCard } from "@/components/dashboard/shared/StatCard";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { GetDashboardStats } from "@/lib/apis/get/GetDashboardStats";
import type { IAdminDashboardStats } from "@/types/AdminDashboardStats";

const AdminDashboard = async () => {
  let stats: IAdminDashboardStats | null = null;

  try {
    stats = await GetDashboardStats();
  } catch {
    stats = null;
  }

  return (
    <div className="mx-auto w-full max-w-7xl space-y-8">
      <DashboardPageHeader
        eyebrow="Admin overview"
        title="Today at a glance"
        description="Customers, services, appointment requests and verified payments — all in one place."
        actions={
          <>
            <Button
              size="lg"
              className="h-10 cursor-pointer px-4"
              render={
                <Link href="/dashboard/admin/manage-services/add-service" />
              }
            >
              <Plus />
              New service
            </Button>

            <Button
              size="lg"
              variant="outline"
              className="h-10 cursor-pointer px-4"
              render={<Link href="/dashboard/admin/manage-appointments" />}
            >
              Review requests
            </Button>
          </>
        }
      />

      {stats ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <StatCard
            label="Total customers"
            value={stats.totalCustomers}
            icon={Users}
            hint="Registered accounts"
            accentClassName="bg-primary/10 text-primary"
          />

          <StatCard
            label="Active services"
            value={stats.activeServices}
            icon={Scissors}
            hint="Available to book"
            accentClassName="bg-sky-500/15 text-sky-700 dark:text-sky-400"
          />

          <StatCard
            label="Appointment requests"
            value={stats.totalAppointments}
            icon={CalendarDays}
            hint="All-time requests"
          />

          <StatCard
            label="Pending appointments"
            value={stats.pendingAppointments}
            icon={Clock}
            hint="Awaiting confirmation"
            accentClassName="bg-amber-500/15 text-amber-700 dark:text-amber-400"
          />

          <StatCard
            label="Confirmed appointments"
            value={stats.confirmedAppointments}
            icon={CalendarCheck}
            hint="Ready for payment"
            accentClassName="bg-emerald-500/15 text-emerald-700 dark:text-emerald-400"
          />

          <StatCard
            label="Successful payments"
            value={stats.successfulPayments}
            icon={Wallet}
            hint="Verified transactions"
            accentClassName="bg-teal-500/15 text-teal-700 dark:text-teal-400"
          />
        </div>
      ) : (
        <Alert variant="destructive">
          <CircleAlert />
          <AlertTitle>Could not load dashboard statistics</AlertTitle>
          <AlertDescription>
            Refresh the page to try again. If the problem continues, check that
            the backend API is running.
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
};

export default AdminDashboard;
