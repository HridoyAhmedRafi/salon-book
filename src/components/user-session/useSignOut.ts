"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { authClient } from "@/lib/auth-client";

// Shared sign-out logic for the desktop dropdown and the mobile menu.
export const useSignOut = () => {
  const router = useRouter();
  const [signingOut, setSigningOut] = useState(false);

  const signOut = async () => {
    if (signingOut) return;

    setSigningOut(true);

    const { error } = await authClient.signOut();

    setSigningOut(false);

    if (error) {
      toast.error(error.message ?? "Could not sign you out.");
      return;
    }

    toast.success("Signed out. See you soon!");
    router.push("/");
    // Refresh so the header re-renders with the signed-out buttons.
    router.refresh();
  };

  return { signingOut, signOut };
};
