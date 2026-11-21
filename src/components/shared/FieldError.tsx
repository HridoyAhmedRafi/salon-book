export interface FieldErrorProps {
  id?: string;
  children?: string;
}

/** Inline validation message shown next to a single form control. */
export function FieldError({ id, children }: FieldErrorProps) {
  if (!children) {
    return null;
  }

  return (
    <p id={id} role="alert" className="text-xs text-destructive">
      {children}
    </p>
  );
}
