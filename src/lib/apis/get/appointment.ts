import type {
  IAppointmentDocument,
  IAppointmentPost,
} from "@/types/appointment";

const toAppointment = (document: IAppointmentDocument): IAppointmentPost => ({
  _id: document._id,
  serviceId: document.serviceId,
  customerId: document.customerId,
  appointmentDate: document.appointmentDate,
  timeSlot: document.timeSlot,
  message: document.message,
  price: document.price,
  status: document.Status,
  paymentStatus: document.PaymentStatus,
  createdAt: document.postedAt,
});

export const getAppointmentByUserId = async (
  id: string,
): Promise<IAppointmentPost[]> => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/appointments/${id}`,
    {
      cache: "no-store",
    },
  );

  if (!res.ok) {
    throw new Error(`Failed to load appointments (${res.status})`);
  }

  const data: IAppointmentDocument[] = await res.json();

  return Array.isArray(data) ? data.map(toAppointment) : [];
};
