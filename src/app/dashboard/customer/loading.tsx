import { DashboardOverviewSkeleton } from "@/components/dashboard/shared/DashboardSkeletons";

/** Fallback for the customer overview and profile routes. */
export default function CustomerDashboardLoading() {
  return <DashboardOverviewSkeleton actions={2} count={4} columns={4} />;
}
