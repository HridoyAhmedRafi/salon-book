import { GetDashboardStats } from "@/lib/apis/get/GetDashboardStats";

const AdminDashboard = async () => {
  const stats = await GetDashboardStats();
  console.log(stats);
  return <div>AdminDashboard</div>;
};

export default AdminDashboard;
