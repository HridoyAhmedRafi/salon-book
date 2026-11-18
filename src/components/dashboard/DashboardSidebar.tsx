import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { auth } from "@/lib/auth";
import {
  LayoutDashboard,
  LucideIcon,
  Users,
  Wallet,
  CalendarDays,
  UserRound,
  Scissors,
  ClipboardList,
} from "lucide-react";
import { headers } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Button } from "../ui/button";

type Role = "customer" | "admin";

type MenuItem = {
  _id: string;
  name: string;
  url: string;
  icon: LucideIcon;
};

const menuItems: Record<Role, MenuItem[]> = {
  customer: [
    {
      _id: "customer-dashboard",
      name: "Dashboard",
      url: "/dashboard/customer",
      icon: LayoutDashboard,
    },
    {
      _id: "my-appointments",
      name: "My Appointments",
      url: "/dashboard/customer/my-appointments",
      icon: CalendarDays,
    },
    {
      _id: "my-profile",
      name: "My Profile",
      url: "/dashboard/customer/profile",
      icon: UserRound,
    },
  ],

  admin: [
    {
      _id: "admin-dashboard",
      name: "Dashboard",
      url: "/dashboard/admin",
      icon: LayoutDashboard,
    },
    {
      _id: "manage-services",
      name: "Manage Services",
      url: "/dashboard/admin/manage-services",
      icon: Scissors,
    },
    {
      _id: "manage-appointments",
      name: "Manage Appointments",
      url: "/dashboard/admin/manage-appointments",
      icon: ClipboardList,
    },
    {
      _id: "manage-users",
      name: "Manage Users",
      url: "/dashboard/admin/manage-users",
      icon: Users,
    },
    {
      _id: "transactions",
      name: "Transactions",
      url: "/dashboard/admin/transactions",
      icon: Wallet,
    },
    {
      _id: "admin-profile",
      name: "My Profile",
      url: "/dashboard/admin/profile",
      icon: UserRound,
    },
  ],
};

export async function DashboardSidebar() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const role = session?.user.role;

  if (!role || (role !== "customer" && role !== "admin")) {
    redirect("/login");
  }

  const items = menuItems[role];

  return (
    <Sidebar>
      <SidebarHeader />
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            <Link href={"/"}>
              <Button className="cursor-pointer mb-4">Home</Button>
            </Link>
            {items.map((project) => (
              <SidebarMenuItem key={project._id}>
                <SidebarMenuButton render={<a href={project.url} />}>
                  <project.icon />
                  <span>{project.name}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}
