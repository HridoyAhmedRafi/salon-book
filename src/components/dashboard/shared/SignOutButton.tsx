"use client";

import { LoaderCircle, LogOut } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useSignOut } from "@/hooks/use-sign-out";
import { cn } from "@/lib/utils";

export interface SignOutButtonProps {
  className?: string;
}

/** Sign-out action used on the shared profile page. */
export function SignOutButton({ className }: SignOutButtonProps) {
  const { signOut, signingOut } = useSignOut();

  return (
    <Button
      type="button"
      variant="outline"
      onClick={signOut}
      disabled={signingOut}
      aria-busy={signingOut}
      className={cn("w-full cursor-pointer", className)}
    >
      {signingOut ? (
        <LoaderCircle className="animate-spin" />
      ) : (
        <LogOut />
      )}
      {signingOut ? "Signing out..." : "Sign out"}
    </Button>
  );
}
