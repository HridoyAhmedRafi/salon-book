import type { ReactNode } from "react";

export interface DashboardPageHeaderProps {
  /** Small uppercase line shown above the title. */
  eyebrow?: string;
  title: string;
  description?: string;
  /** Optional right-hand slot, e.g. filters or call-to-action buttons. */
  actions?: ReactNode;
}

/**
 * Page heading block shared by all dashboard pages.
 */
export function DashboardPageHeader({
  eyebrow,
  title,
  description,
  actions,
}: DashboardPageHeaderProps) {
  return (
    <header className="flex flex-wrap items-end justify-between gap-4">
      <div className="space-y-2">
        {eyebrow ? (
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            {eyebrow}
          </p>
        ) : null}

        <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
          {title}
        </h1>

        {description ? (
          <p className="max-w-2xl text-sm leading-6 text-muted-foreground">
            {description}
          </p>
        ) : null}
      </div>

      {actions ? <div className="flex items-center gap-2">{actions}</div> : null}
    </header>
  );
}
