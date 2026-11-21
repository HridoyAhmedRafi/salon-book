const AUTH_ROUTES = ["/sign-in", "/sign-up"];

/**
 * Keeps same-origin, path-only redirects (e.g. `/services/123`) and rejects
 * absolute URLs, protocol-relative URLs and auth pages so a crafted
 * `?redirect=` value cannot send the user somewhere unexpected.
 */
export function safeRedirectPath(
  value: string | string[] | undefined,
  fallback = "/",
): string {
  const path = Array.isArray(value) ? value[0] : value;

  if (typeof path !== "string") {
    return fallback;
  }

  const trimmed = path.trim();

  if (!trimmed.startsWith("/") || trimmed.startsWith("//")) {
    return fallback;
  }

  // Browsers normalise `/\host` to `//host`, which would leave the site.
  if (trimmed.includes("\\")) {
    return fallback;
  }

  const pathname = trimmed.split("?")[0]?.split("#")[0] ?? "";

  if (AUTH_ROUTES.some((route) => pathname === route || pathname.startsWith(`${route}/`))) {
    return fallback;
  }

  return trimmed;
}
