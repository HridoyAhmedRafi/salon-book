import { IAppointmentPost } from "@/types/appointment";

export const getAppointmentByUserId = async (
  id: string,
): Promise<IAppointmentPost[]> => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/appointments/${id}`,
    {
      cache: "no-store",
    },
  );

  return res.json();
};
