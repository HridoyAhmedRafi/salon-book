import { DashboardOverviewSkeleton } from "@/components/dashboard/shared/DashboardSkeletons";

/** Fallback for the dashboard segment and any route without its own boundary. */
export default function DashboardLoading() {
  return <DashboardOverviewSkeleton />;
}
