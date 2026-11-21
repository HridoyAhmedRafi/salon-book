import { CircleAlert } from "lucide-react";

import { AdminAppointmentsTable } from "@/components/dashboard/admin-appointments/AdminAppointmentsTable";
import { DashboardPageHeader } from "@/components/dashboard/shared/DashboardPageHeader";
import { RetryButton } from "@/components/shared/RetryButton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { getAllAppointments } from "@/lib/apis/get/appointment";
import type { IAdminAppointment } from "@/types/appointment";

const ManageAppointments = async () => {
  let appointments: IAdminAppointment[] = [];
  let loadFailed = false;

  try {
    appointments = await getAllAppointments();
  } catch {
    loadFailed = true;
  }

  return (
    <div className="mx-auto w-full max-w-7xl space-y-8">
      <DashboardPageHeader
        eyebrow="Bookings"
        title="Appointments"
        description="Review every customer booking request, confirm a pending appointment, or cancel one that can no longer go ahead."
      />

      {loadFailed ? (
        <Alert variant="destructive">
          <CircleAlert />
          <AlertTitle>Could not load appointments</AlertTitle>
          <AlertDescription>
            <p>
              Something went wrong while fetching the appointment list. Try
              again, and if the problem continues, check that the backend API is
              running.
            </p>
            <RetryButton className="mt-3" />
          </AlertDescription>
        </Alert>
      ) : (
        <AdminAppointmentsTable appointments={appointments} />
      )}
    </div>
  );
};

export default ManageAppointments;
