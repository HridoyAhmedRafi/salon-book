"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "@/lib/auth-client";

const DashboardIndex = () => {
  const router = useRouter();
  const { data: session, isPending } = useSession();

  useEffect(() => {
    if (isPending) return;

    const user = session?.user;

    if (!user) {
      router.replace("/sign-in?redirect=%2Fdashboard");
      return;
    }

    router.replace(
      `/dashboard/${user.role === "admin" ? "admin" : "customer"}`,
    );
  }, [session, isPending, router]);

  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
    </div>
  );
};

export default DashboardIndex;
