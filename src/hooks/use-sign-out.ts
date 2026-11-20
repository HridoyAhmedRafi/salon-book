"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { authClient } from "@/lib/auth-client";

/**
 * Signs the current user out and sends them to the sign-in page. Shared by the
 * navbar menu and the profile sign-out button.
 */
export function useSignOut() {
  const router = useRouter();
  const [signingOut, setSigningOut] = useState(false);

  const signOut = async () => {
    if (signingOut) {
      return;
    }

    setSigningOut(true);

    try {
      const { error } = await authClient.signOut();

      if (error) {
        toast.error(error.message ?? "Could not sign you out.");
        return;
      }

      toast.success("Signed out. See you soon!");
      router.replace("/sign-in");
      router.refresh();
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setSigningOut(false);
    }
  };

  return { signOut, signingOut };
}
