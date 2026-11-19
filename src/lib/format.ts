/** Formats a date string (e.g. "2026-11-19") as "19 Nov 2026". */
export function formatDate(value?: string) {
  if (!value) return "—";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return value;

  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    // Date-only strings are stored in UTC, so format them in UTC to avoid
    // the date shifting by one day in other time zones.
    timeZone: "UTC",
  }).format(date);
}

/** Formats a price with the Bangladeshi Taka symbol, e.g. 3500 -> "৳3,500". */
export function formatPrice(value: number) {
  return `৳${value.toLocaleString("en-US")}`;
}
