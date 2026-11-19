import type { LucideIcon } from "lucide-react";

import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export interface StatCardProps {
  /** Short label describing the metric. */
  label: string;
  /** Numeric value of the metric. */
  value: number;
  icon: LucideIcon;
  /** Optional supporting line shown under the value. */
  hint?: string;
  /** Optional Tailwind classes used to tint the icon badge. */
  accentClassName?: string;
}

/**
 * Compact metric card used by the customer and admin dashboards.
 */
export function StatCard({
  label,
  value,
  icon: Icon,
  hint,
  accentClassName,
}: StatCardProps) {
  return (
    <Card className="gap-0 p-5">
      <div className="flex items-start justify-between gap-3">
        <p className="text-xs font-semibold uppercase leading-4 tracking-[0.12em] text-muted-foreground">
          {label}
        </p>

        <span
          aria-hidden
          className={cn(
            "flex size-9 shrink-0 items-center justify-center rounded-lg bg-muted text-muted-foreground",
            accentClassName,
          )}
        >
          <Icon className="size-4" />
        </span>
      </div>

      <p className="mt-5 text-4xl font-bold leading-none tabular-nums">
        {value}
      </p>

      {hint ? (
        <p className="mt-2 text-xs text-muted-foreground">{hint}</p>
      ) : null}
    </Card>
  );
}
