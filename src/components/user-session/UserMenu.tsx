"use client";

import Link from "next/link";
import { LayoutDashboard, LogOut, UserRound } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useSignOut } from "./useSignOut";

type UserMenuProps = {
  name: string;
  email: string;
  image?: string | null;
};

// Every item gets the same soft gold hover used by the navbar links.
const itemClass =
  "cursor-pointer gap-2 px-2 py-1.5 hover:bg-primary/10 focus:bg-primary/10 focus:text-foreground dark:hover:bg-primary/10";

const UserMenu = ({ name, email, image }: UserMenuProps) => {
  const { signingOut, signOut } = useSignOut();

  // Fallback letter when the user has no profile image.
  const initial = name.trim().charAt(0).toUpperCase() || "U";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button
            variant="ghost"
            size="icon"
            aria-label="Open profile menu"
            className="rounded-full hover:bg-primary/10 dark:hover:bg-primary/10"
          />
        }
      >
        <Avatar>
          {image && <AvatarImage src={image} alt={name} />}
          <AvatarFallback className="bg-primary/10 text-xs font-semibold text-foreground">
            {initial}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-60">
        <div className="flex items-center gap-2 px-2 py-1.5">
          <Avatar>
            {image && <AvatarImage src={image} alt={name} />}
            <AvatarFallback className="bg-primary/10 text-xs font-semibold text-foreground">
              {initial}
            </AvatarFallback>
          </Avatar>
          <div className="min-w-0">
            <p className="truncate text-sm font-medium text-foreground">
              {name}
            </p>
            <p className="truncate text-xs text-muted-foreground">{email}</p>
          </div>
        </div>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          render={<Link href="/dashboard" />}
          className={itemClass}
        >
          <LayoutDashboard />
          Dashboard
        </DropdownMenuItem>

        <DropdownMenuItem
          render={<Link href="/my-profile" />}
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
  );
};

export default UserMenu;
