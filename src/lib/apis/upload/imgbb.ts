const IMGBB_UPLOAD_URL = "https://api.imgbb.com/1/upload";

/** Largest image accepted by the upload field (ImgBB allows up to 32 MB). */
export const MAX_IMAGE_SIZE = 5 * 1024 * 1024;

export const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
] as const;

interface ImgbbUploadResponse {
  success?: boolean;
  status?: number;
  error?: { message?: string };
  data?: {
    display_url?: string;
    url?: string;
  };
}

/** Returns a user-facing error message, or null when the file is valid. */
export function validateImageFile(file: File): string | null {
  if (!(ACCEPTED_IMAGE_TYPES as readonly string[]).includes(file.type)) {
    return "Choose a JPEG, PNG, WebP or GIF image.";
  }

  if (file.size === 0) {
    return "The selected image is empty.";
  }

  if (file.size > MAX_IMAGE_SIZE) {
    return "The image must be 5 MB or smaller.";
  }

  return null;
}

export async function uploadImageToImgbb(file: File): Promise<string> {
  const apiKey = process.env.NEXT_PUBLIC_IMGBB_API_KEY;

  if (!apiKey) {
    throw new Error(
      "Image upload is not configured. Add NEXT_PUBLIC_IMGBB_API_KEY to .env.",
    );
  }

  const formData = new FormData();
  formData.append("image", file);

  let res: Response;

  try {
    // No `expiration` parameter: uploaded images stay available permanently.
    res = await fetch(`${IMGBB_UPLOAD_URL}?key=${encodeURIComponent(apiKey)}`, {
      method: "POST",
      body: formData,
    });
  } catch {
    throw new Error(
      "Could not reach the image service. Check your connection and try again.",
    );
  }

  const result = (await res
    .json()
    .catch(() => null)) as ImgbbUploadResponse | null;
  const imageUrl = result?.data?.display_url ?? result?.data?.url;

  if (!res.ok || !result?.success || !imageUrl) {
    throw new Error(
      result?.error?.message ?? "Could not upload the image. Please try again.",
    );
  }

  return imageUrl;
}
