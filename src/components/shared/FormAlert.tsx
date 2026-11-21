import { CircleAlert } from "lucide-react";

export interface FormAlertProps {
  children?: string;
}

/** Compact error banner for a failed form submission. */
export function FormAlert({ children }: FormAlertProps) {
  if (!children) {
    return null;
  }

  return (
    <div
      role="alert"
      aria-live="polite"
      className="flex items-start gap-2 rounded-lg border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive"
    >
      <CircleAlert className="mt-0.5 size-4 shrink-0" />
      <p>{children}</p>
    </div>
  );
}
