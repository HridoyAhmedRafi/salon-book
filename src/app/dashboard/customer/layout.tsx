import { requiredRole } from "@/lib/apis/core/token-apis";
import React from "react";

const CustomerDashboardLayout = async ({
  children,
}: {
  children: React.ReactNode;
}) => {
  await requiredRole("customer");
  return children;
};

export default CustomerDashboardLayout;
