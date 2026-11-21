import Link from "next/link";
import { CircleAlert, Plus } from "lucide-react";

import { ManageServicesTable } from "@/components/dashboard/admin-services/ManageServicesTable";
import { DashboardPageHeader } from "@/components/dashboard/shared/DashboardPageHeader";
import { RetryButton } from "@/components/shared/RetryButton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { getAdminServices } from "@/lib/apis/get/AdminServices";
import type { IAdminService } from "@/types/admin-service";

const ManageServices = async () => {
  let services: IAdminService[] = [];
  let loadFailed = false;

  try {
    services = await getAdminServices();
  } catch {
    loadFailed = true;
  }

  return (
    <div className="mx-auto w-full max-w-7xl space-y-8">
      <DashboardPageHeader
        eyebrow="Service management"
        title="Manage services"
        description="Create, edit, activate and remove salon treatments. Inactive services disappear from public browsing and cannot be booked."
        actions={
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
        }
      />

      {loadFailed ? (
        <Alert variant="destructive">
          <CircleAlert />
          <AlertTitle>Could not load services</AlertTitle>
          <AlertDescription>
            <p>
              Something went wrong while fetching the service list. Try again,
              and if the problem continues, check that the backend API is
              running.
            </p>
            <RetryButton className="mt-3" />
          </AlertDescription>
        </Alert>
      ) : (
        <ManageServicesTable services={services} />
      )}
    </div>
  );
};

export default ManageServices;
