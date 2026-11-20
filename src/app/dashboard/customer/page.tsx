import { Suspense } from "react";
import { CalendarPlus, CircleAlert } from "lucide-react";
import { headers } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";

import { CustomerAppointmentOverview } from "@/components/dashboard/customer-dashboard/CustomerAppointmentOverview";
import { DashboardPageHeader } from "@/components/dashboard/shared/DashboardPageHeader";
import { DashboardStatsSkeleton } from "@/components/dashboard/shared/DashboardSkeletons";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { getAppointmentByUserId } from "@/lib/apis/get/appointment";
import { auth } from "@/lib/auth";
import type { IAppointmentPost } from "@/types/appointment";

const CustomerDashboard = async () => {
  const session = await auth.api.getSession({ headers: await headers() });
  const user = session?.user;

  if (!user?.id) {
    redirect("/sign-in");
  }

  return (
    <div className="mx-auto w-full max-w-7xl space-y-8">
      <DashboardPageHeader
        eyebrow="Your account"
        title={`Welcome back, ${user.name}`}
        description="A clear view of your appointments and what's coming up next."
        actions={
          <Button
            size="lg"
            className="h-10 px-4"
            render={<Link href="/services" />}
          >
            <CalendarPlus />
            Book a service
          </Button>
        }
      />

      <Suspense fallback={<DashboardStatsSkeleton count={4} columns={4} />}>
        <CustomerAppointmentStats userId={user.id} />
      </Suspense>
    </div>
  );
};

async function CustomerAppointmentStats({ userId }: { userId: string }) {
  let appointments: IAppointmentPost[] = [];
  let loadFailed = false;

  try {
    appointments = await getAppointmentByUserId(userId);
  } catch {
    loadFailed = true;
  }

  return (
    <div className="space-y-8">
      {loadFailed ? (
        <Alert variant="destructive">
          <CircleAlert />
          <AlertTitle>Could not load your appointments</AlertTitle>
          <AlertDescription>
            Something went wrong while fetching your appointments. Please
            refresh the page to try again.
          </AlertDescription>
        </Alert>
      ) : null}

      <CustomerAppointmentOverview appointments={appointments} />
    </div>
  );
}

export default CustomerDashboard;
