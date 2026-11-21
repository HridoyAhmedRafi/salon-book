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
import { redirect } from "next/navigation";

import { Button } from "../ui/button";
import { DashboardNav, Role } from "./DashboardNav";

export async function DashboardSidebar() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const role = session?.user.role;

  // if (!role || (role !== "customer" && role !== "admin")) {
  //   redirect("/sign-in");
  // }

  return (
    <Sidebar>
      <SidebarHeader />
      <SidebarContent>
        <SidebarGroup>
          <Button className="mb-4 cursor-pointer" render={<Link href="/" />}>
            Home
          </Button>

          <DashboardNav role={role as Role} />
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}
