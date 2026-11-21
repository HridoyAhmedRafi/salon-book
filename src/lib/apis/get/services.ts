import { getValidImageUrl } from "@/lib/image";
import type { IServicePost } from "@/types/service";
import { readApiError } from "../core/errors";
import { getFetch } from "../core/token-apis";

const OBJECT_ID_PATTERN = /^[a-f\d]{24}$/i;

const readServiceList = async (
  api: string,
  fallback: string,
): Promise<IServicePost[]> => {
  const res = await fetch(api, { cache: "no-store" });

  if (!res.ok) {
    throw new Error(await readApiError(res, fallback));
  }

  const data = await res.json().catch(() => null);

  return Array.isArray(data) ? (data as IServicePost[]) : [];
};

// get service
export const getServices = async (query = ""): Promise<IServicePost[]> =>
  readServiceList(
    `${process.env.NEXT_PUBLIC_BASE_URL}/services?${query}`,
    "Could not load services.",
  );

// get service byid
export const getServiceById = async (
  id: string,
): Promise<IServicePost | null> => {
  // The API builds a MongoDB ObjectId from the raw value, so reject malformed
  // ids before the request instead of waiting on a failing backend call.
  if (!OBJECT_ID_PATTERN.test(id)) {
    return null;
  }

  const api = `${process.env.NEXT_PUBLIC_BASE_URL}/services/${id}`;
  const res = await getFetch(api);

  if (res.status === 404) {
    return null;
  }

  if (!res.ok) {
    throw new Error(await readApiError(res, "Could not load this service."));
  }

  const data = await res.json().catch(() => null);

  if (!data || typeof data !== "object" || Array.isArray(data)) {
    return null;
  }

  const service = data as IServicePost;

  if (!service._id || !service.serviceName) {
    return null;
  }

  // Old records may have a blank or malformed image URL.
  return { ...service, image: getValidImageUrl(service.image) ?? "" };
};

// get featured sservice
export const getFeaturedServices = async (): Promise<IServicePost[]> =>
  readServiceList(
    `${process.env.NEXT_PUBLIC_BASE_URL}/featured-services`,
    "Could not load featured services.",
  );
