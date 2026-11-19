import { CircleAlert } from "lucide-react";

import { AdminUsersTable } from "@/components/dashboard/admin-users/AdminUsersTable";
import { DashboardPageHeader } from "@/components/dashboard/shared/DashboardPageHeader";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { getAdminUsers } from "@/lib/apis/get/AdminUsers";
import type { IAdminUser } from "@/types/admin-user";

const ManageUsers = async () => {
  let users: IAdminUser[] = [];
  let loadFailed = false;

  try {
    users = await getAdminUsers();
  } catch {
    loadFailed = true;
  }

  return (
    <div className="mx-auto w-full max-w-7xl space-y-8">
      <DashboardPageHeader
        eyebrow="Customers"
        title="Manage users"
        description="View every registered customer, inspect their account details, and block or restore access when needed."
      />

      {loadFailed ? (
        <Alert variant="destructive">
          <CircleAlert />
          <AlertTitle>Could not load customers</AlertTitle>
          <AlertDescription>
            Refresh the page to try again. If the problem continues, check that
            the backend API is running.
          </AlertDescription>
        </Alert>
      ) : (
        <AdminUsersTable users={users} />
      )}
    </div>
  );
};

export default ManageUsers;
