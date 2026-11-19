import type { IService, ServiceStatus } from "@/types/service";

const getErrorMessage = async (res: Response, fallback: string) => {
  try {
    const data: { message?: unknown } = await res.json();

    return typeof data.message === "string" ? data.message : fallback;
  } catch {
    return fallback;
  }
};

export const updateService = async (id: string, data: IService) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/services/${id}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    },
  );

  if (!res.ok) {
    throw new Error(
      await getErrorMessage(res, "Could not update this service."),
    );
  }

  return res.json();
};

export const updateServiceStatus = async (
  id: string,
  status: ServiceStatus,
) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/services/${id}/status`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status }),
    },
  );

  if (!res.ok) {
    throw new Error(
      await getErrorMessage(res, "Could not update the service status."),
    );
  }

  return res.json();
};

export const deleteService = async (id: string) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/services/${id}`,
    {
      method: "DELETE",
    },
  );

  if (!res.ok) {
    throw new Error(
      await getErrorMessage(res, "Could not delete this service."),
    );
  }

  return res.json();
};
