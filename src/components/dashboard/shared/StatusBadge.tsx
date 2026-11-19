import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

export type StatusTone = "neutral" | "warning" | "success" | "danger";

const toneClasses: Record<StatusTone, string> = {
  neutral: "bg-muted text-muted-foreground",
  warning: "bg-amber-500/15 text-amber-700 dark:text-amber-400",
  success: "bg-emerald-500/15 text-emerald-700 dark:text-emerald-400",
  danger: "bg-destructive/10 text-destructive",
};

export interface StatusBadgeProps {
  children: ReactNode;
  tone?: StatusTone;
  className?: string;
}

/**
 * Small rounded label used for appointment and payment statuses.
 */
export function StatusBadge({
  children,
  tone = "neutral",
  className,
}: StatusBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium whitespace-nowrap",
        toneClasses[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
