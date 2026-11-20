"use client";

import {
  CalendarDays,
  ClipboardList,
  LayoutDashboard,
  LucideIcon,
  Scissors,
  UserRound,
  Users,
  Wallet,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

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

/**
 * The dashboard root only matches exactly; every other item also stays active
 * on its child routes (e.g. add-service keeps "Manage Services" highlighted).
 */
function isMenuItemActive(url: string, pathname: string) {
  if (url === "/dashboard/customer" || url === "/dashboard/admin") {
    return pathname === url;
  }

  return pathname === url || pathname.startsWith(`${url}/`);
}

export function DashboardNav({ role }: { role: Role }) {
  const pathname = usePathname();
  const items = menuItems[role];

  return (
    <SidebarMenu>
      {items.map((item) => {
        const active = isMenuItemActive(item.url, pathname);

        return (
          <SidebarMenuItem key={item._id}>
            <SidebarMenuButton
              isActive={active}
              render={
                <Link
                  href={item.url}
                  aria-current={active ? "page" : undefined}
                />
              }
              className=" cursor-pointer"
            >
              <item.icon />
              <span>{item.name}</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        );
      })}
    </SidebarMenu>
  );
}
