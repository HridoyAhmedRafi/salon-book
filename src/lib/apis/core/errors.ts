/** Error raised by server-side data loaders when the backend rejects a request. */
export class ApiError extends Error {
  readonly status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

export type ActionFailure = {
  ok: false;
  status: number;
  message: string;
};

export type ActionSuccess<T> = {
  ok: true;
  data: T;
};

/**
 * Expected result of a server action. Returning failures (instead of throwing)
 * keeps the backend message available to the client in production builds.
 */
export type ActionResult<T> = ActionSuccess<T> | ActionFailure;

/** Reads the backend `message`, falling back when the body is missing or invalid. */
export async function readApiError(
  res: Response,
  fallback: string,
): Promise<string> {
  try {
    const data: { message?: unknown } = await res.json();

    if (typeof data.message === "string" && data.message.trim()) {
      return data.message.trim();
    }
  } catch {
    // Body was empty or not JSON; use the fallback below.
  }

  return fallback;
}

/** Normalises anything thrown into a readable, user-facing message. */
export function getErrorMessage(error: unknown, fallback: string): string {
  if (error instanceof Error && error.message.trim()) {
    return error.message.trim();
  }

  if (typeof error === "string" && error.trim()) {
    return error.trim();
  }

  return fallback;
}
