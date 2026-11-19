import { IAppointment } from "@/types/appointment";
import { IService } from "@/types/service";

// add service
export const AddService = async (data: IService) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/add-service`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return res.json();
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
