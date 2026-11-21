import { CalendarPlus, CircleAlert } from "lucide-react";
import { headers } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";

import { MyAppointmentsTable } from "@/components/dashboard/customer-dashboard/MyAppointmentsTable";
import { DashboardPageHeader } from "@/components/dashboard/shared/DashboardPageHeader";
import { RetryButton } from "@/components/shared/RetryButton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { getAppointmentByUserId } from "@/lib/apis/get/appointment";
import { getServices } from "@/lib/apis/get/services";
import { auth } from "@/lib/auth";
import type { IAppointmentPost } from "@/types/appointment";
import type { IServicePost } from "@/types/service";

const MyAppointments = async () => {
  const session = await auth.api.getSession({ headers: await headers() });
  const user = session?.user;

  if (!user?.id) {
    redirect("/sign-in");
  }

  let appointments: IAppointmentPost[] = [];
  let loadFailed = false;

  try {
    appointments = await getAppointmentByUserId(user.id);
  } catch {
    loadFailed = true;
  }

  // Used only as a fallback for appointments booked before the service
  // name, category and image were stored with the request.
  let services: IServicePost[] = [];

  try {
    const result = await getServices();

    if (Array.isArray(result)) {
      services = result;
    }
  } catch {
    services = [];
  }

  const servicesById = new Map(
    services.map((service) => [service._id, service]),
  );

  const sortedAppointments = [...appointments].sort((a, b) =>
    b.createdAt.localeCompare(a.createdAt),
  );

  return (
    <div className="mx-auto w-full max-w-7xl space-y-8">
      <DashboardPageHeader
        eyebrow="Your bookings"
        title="My Appointments"
        description="Track every request, cancel a pending appointment, or pay once the salon has confirmed."
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

      {loadFailed ? (
        <Alert variant="destructive">
          <CircleAlert />
          <AlertTitle>Could not load your appointments</AlertTitle>
          <AlertDescription>
            <p>
              Something went wrong while fetching your appointments. Try again,
              and if the problem continues, check that the backend API is
              running.
            </p>
            <RetryButton className="mt-3" />
          </AlertDescription>
        </Alert>
      ) : (
        <MyAppointmentsTable
          appointments={sortedAppointments}
          servicesById={servicesById}
        />
      )}
    </div>
  );
};

export default MyAppointments;
