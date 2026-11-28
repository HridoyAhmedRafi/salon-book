import { DashboardOverviewSkeleton } from "@/components/dashboard/shared/DashboardSkeletons";

/** Fallback for the admin overview and profile routes. */
export default function AdminDashboardLoading() {
  return <DashboardOverviewSkeleton actions={2} count={6} />;
}
