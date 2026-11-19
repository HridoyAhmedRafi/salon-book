export const GetDashboardStats = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/admin/dashboard-stats`,
    {
      cache: "no-store",
    },
  );

  if (!res.ok) {
    throw new Error("Failed to fetch dashboard statistics");
  }

  return res.json();
};
