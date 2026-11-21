import { CircleAlert } from "lucide-react";

import { AdminTransactionsTable } from "@/components/dashboard/admin-transactions/AdminTransactionsTable";
import { DashboardPageHeader } from "@/components/dashboard/shared/DashboardPageHeader";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { getAdminTransactions } from "@/lib/apis/get/AdminTransactions";
import type { IAdminTransaction } from "@/types/admin-transaction";

const ManageTransactions = async () => {
  let transactions: IAdminTransaction[] = [];
  let loadFailed = false;

  try {
    transactions = await getAdminTransactions();
  } catch {
    loadFailed = true;
  }

  return (
    <div className="mx-auto w-full max-w-7xl space-y-8">
      <DashboardPageHeader
        eyebrow="Payments"
        title="Transactions"
        description="Every successful Stripe checkout, including the customer, service, amount and payment reference."
      />

      {loadFailed ? (
        <Alert variant="destructive">
          <CircleAlert />
          <AlertTitle>Could not load transactions</AlertTitle>
          <AlertDescription>
            Refresh the page to try again. If the problem continues, check that
            the backend API is running.
          </AlertDescription>
        </Alert>
      ) : (
        <AdminTransactionsTable transactions={transactions} />
      )}
    </div>
  );
};

export default ManageTransactions;
