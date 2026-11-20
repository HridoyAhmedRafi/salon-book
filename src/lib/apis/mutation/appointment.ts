"use server";

import { IAppointment } from "@/types/appointment";
import { protectedMutation } from "../core/token-apis";

// cancel a pending appointment
export const cancelAppointment = async (
  appointmentId: string,
  customerId: string,
) => {
  const api = `${process.env.NEXT_PUBLIC_BASE_URL}/appointments/${appointmentId}/cancel`;
  const res = await protectedMutation(api, "PATCH", { customerId });

  const result = await res.json();

  if (!res.ok) {
    throw new Error(result.message ?? "Could not cancel this appointment.");
  }

  return result;
};

// book appointment
export const BookAppointment = async (data: IAppointment) => {
  const api = `${process.env.NEXT_PUBLIC_BASE_URL}/book-appointment`;
  const res = await protectedMutation(api, "POST", data);
  const result = await res.json();
  if (!res.ok) {
    throw new Error(result.message);
  }
  return result;
};
