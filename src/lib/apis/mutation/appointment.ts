import { IAppointment } from "@/types/appointment";

// cancel a pending appointment
export const cancelAppointment = async (
  appointmentId: string,
  customerId: string,
) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/appointments/${appointmentId}/cancel`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ customerId }),
    },
  );

  const result = await res.json();

  if (!res.ok) {
    throw new Error(result.message ?? "Could not cancel this appointment.");
  }

  return result;
};

// book appointment
export const BookAppointment = async (data: IAppointment) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/book-appointment`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    },
  );
  const result = await res.json();
  if (!res.ok) {
    throw new Error(result.message);
  }
  return result;
};
