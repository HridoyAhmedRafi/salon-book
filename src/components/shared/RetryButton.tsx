"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { RefreshCw } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface RetryButtonProps {
  label?: string;
  className?: string;
}

/** Re-fetches the current route without a full page reload. */
export function RetryButton({ label = "Try again", className }: RetryButtonProps) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  return (
    <Button
      type="button"
      variant="outline"
      size="sm"
      disabled={pending}
      aria-busy={pending}
      onClick={() => startTransition(() => router.refresh())}
      className={cn("cursor-pointer", className)}
    >
      <RefreshCw className={pending ? "animate-spin" : undefined} />
      {pending ? "Retrying..." : label}
    </Button>
  );
}
