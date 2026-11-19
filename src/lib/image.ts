/** Returns a normalized http(s) URL, or null when the value cannot be used. */
export function getValidImageUrl(value?: string | null) {
  if (!value) {
    return null;
  }

  try {
    const url = new URL(value.trim());

    if (url.protocol === "http:" || url.protocol === "https:") {
      return url.toString();
    }

    return null;
  } catch {
    return null;
  }
}
