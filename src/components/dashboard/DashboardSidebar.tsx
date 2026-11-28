import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import Link from "next/link";
import { Scissors } from "lucide-react";

import { DashboardNav, Role } from "./DashboardNav";

export async function DashboardSidebar() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const role = session?.user.role;

  return (
    <Sidebar>
      <SidebarHeader>
        <Link
          href="/"
          aria-label="SalonBook home"
          className="inline-flex items-center gap-2 rounded-md px-1 py-1"
        >
          <span className="flex size-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Scissors className="size-5" />
          </span>
          <span className="text-2xl font-bold tracking-tight">
            Salon<span className="text-[#d2a01f]">Book</span>
          </span>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <DashboardNav role={role as Role} />
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}
