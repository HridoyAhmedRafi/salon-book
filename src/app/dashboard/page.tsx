import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { auth } from "@/lib/auth";

/** Sends `/dashboard` to the signed-in user's role dashboard. */
const DashboardIndex = async () => {
  const session = await auth.api.getSession({ headers: await headers() });
  const user = session?.user;

  if (!user) {
    redirect("/sign-in?redirect=%2Fdashboard");
  }

  redirect(`/dashboard/${user.role === "admin" ? "admin" : "customer"}`);
};

export default DashboardIndex;
