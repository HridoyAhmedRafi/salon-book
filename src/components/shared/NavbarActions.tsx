"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, LogOut, Menu, UserRound } from "lucide-react";

import { ThemeToggle } from "@/components/shared/theme-toggle";
import { navLinks } from "@/components/shared/nav-links";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useSignOut } from "@/hooks/use-sign-out";
import { cn } from "@/lib/utils";
import { NavbarActionsProps } from "@/types/navbar";

const itemClass =
  "cursor-pointer gap-2 px-2 py-1.5 hover:bg-primary/10 focus:bg-primary/10 focus:text-foreground dark:hover:bg-primary/10";

const linkClass =
  "rounded-md px-3 py-2 text-sm transition-colors hover:bg-primary/10 dark:hover:bg-primary/10";

function isNavLinkActive(href: string, pathname: string) {
  if (href === "/") {
    return pathname === "/";
  }

  if (href === "/services") {
    return pathname === "/services" || pathname.startsWith("/services/");
  }

  // Hash anchors (e.g. "/#why-salonbook") have no pathname equivalent.
  return false;
}

export default function NavbarActions({ user }: NavbarActionsProps) {
  const pathname = usePathname();
  const { signOut, signingOut } = useSignOut();

  const initial = user?.name.trim().charAt(0).toUpperCase() || "U";

  const dashboardLink = user ? `/dashboard/${user.role}` : "/dashboard";
  const profileLink = `/dashboard/${user?.role}/profile`;

  return (
    <div className="flex items-center gap-2">
      {/* Desktop Navigation */}
      <nav className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-1 md:flex">
        {navLinks.map((link) => {
          const active = isNavLinkActive(link.href, pathname);

          return (
            <Link
              key={link.href}
              href={link.href}
              aria-current={active ? "page" : undefined}
              className={cn(
                linkClass,
                active
                  ? "bg-primary/10 font-medium text-primary"
                  : "text-foreground",
              )}
            >
              {link.label}
            </Link>
          );
        })}
      </nav>

      {/* Desktop Actions */}
      <div className="hidden items-center gap-2 md:flex">
        <ThemeToggle />

        {user ? (
          <DropdownMenu>
            <DropdownMenuTrigger
              render={
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label="Open profile menu"
                  className="rounded-full hover:bg-primary/10"
                />
              }
            >
              <Avatar>
                {user.image && <AvatarImage src={user.image} alt={user.name} />}
                <AvatarFallback className="bg-primary/10 text-xs font-semibold">
                  {initial}
                </AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="w-60">
              <div className="flex items-center gap-2 px-2 py-1.5">
                <Avatar>
                  {user.image && (
                    <AvatarImage src={user.image} alt={user.name} />
                  )}
                  <AvatarFallback className="bg-primary/10">
                    {initial}
                  </AvatarFallback>
                </Avatar>

                <div className="min-w-0">
                  <p className="truncate text-sm font-medium">{user.name}</p>
                  <p className="truncate text-xs text-muted-foreground">
                    {user.email}
                  </p>
                </div>
              </div>

              <DropdownMenuSeparator />

              <DropdownMenuItem
                render={<Link href={dashboardLink} />}
                className={itemClass}
              >
                <LayoutDashboard />
                Dashboard
              </DropdownMenuItem>

              <DropdownMenuItem
                render={<Link href={profileLink} />}
                className={itemClass}
              >
                <UserRound />
                My Profile
              </DropdownMenuItem>

              <DropdownMenuSeparator />

              <DropdownMenuItem
                variant="destructive"
                onClick={signOut}
                disabled={signingOut}
                className="cursor-pointer gap-2 px-2 py-1.5"
              >
                <LogOut />
                {signingOut ? "Signing out..." : "Sign Out"}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <>
            <Link
              href="/sign-up"
              className={buttonVariants({ variant: "ghost" })}
            >
              Sign Up
            </Link>

            <Link href="/sign-in" className={buttonVariants()}>
              Sign In
            </Link>
          </>
        )}
      </div>

      {/* Mobile Actions */}
      <div className="flex items-center gap-2 md:hidden">
        <ThemeToggle />

        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <Button
                variant="ghost"
                size="icon"
                aria-label="Open menu"
                className="rounded-full"
              />
            }
          >
            <Menu />
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" className="w-60">
            {/* Public Navigation - Always Visible */}
            {navLinks.map((link) => {
              const active = isNavLinkActive(link.href, pathname);

              return (
                <DropdownMenuItem
                  key={link.href}
                  render={
                    <Link
                      href={link.href}
                      aria-current={active ? "page" : undefined}
                    />
                  }
                  className={cn(
                    itemClass,
                    active && "bg-primary/10 font-medium text-primary",
                  )}
                >
                  {link.label}
                </DropdownMenuItem>
              );
            })}

            <DropdownMenuSeparator />

            {user ? (
              <>
                {/* User Information */}
                <div className="flex items-center gap-2 px-2 py-1.5">
                  <Avatar>
                    {user.image && (
                      <AvatarImage src={user.image} alt={user.name} />
                    )}
                    <AvatarFallback className="bg-primary/10 text-xs font-semibold">
                      {initial}
                    </AvatarFallback>
                  </Avatar>

                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium">{user.name}</p>
                    <p className="truncate text-xs text-muted-foreground">
                      {user.email}
                    </p>
                  </div>
                </div>

                <DropdownMenuSeparator />

                <DropdownMenuItem
                  render={<Link href={dashboardLink} />}
                  className={itemClass}
                >
                  <LayoutDashboard />
                  Dashboard
                </DropdownMenuItem>

                <DropdownMenuItem
                  render={<Link href={profileLink} />}
                  className={itemClass}
                >
                  <UserRound />
                  My Profile
                </DropdownMenuItem>

                <DropdownMenuSeparator />

                <DropdownMenuItem
                  variant="destructive"
                  onClick={signOut}
                  disabled={signingOut}
                  className="cursor-pointer gap-2 px-2 py-1.5"
                >
                  <LogOut />
                  {signingOut ? "Signing out..." : "Sign Out"}
                </DropdownMenuItem>
              </>
            ) : (
              <>
                <DropdownMenuItem
                  render={<Link href="/sign-in" />}
                  className={itemClass}
                >
                  Sign In
                </DropdownMenuItem>

                <DropdownMenuItem
                  render={<Link href="/sign-up" />}
                  className={itemClass}
                >
                  Sign Up
                </DropdownMenuItem>
              </>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
