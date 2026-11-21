import { DashboardListSkeleton } from "@/components/dashboard/shared/DashboardSkeletons";

export default function ManageTransactionsLoading() {
  return <DashboardListSkeleton columns={8} rows={6} />;
}
