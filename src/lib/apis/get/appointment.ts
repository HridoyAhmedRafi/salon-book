import type {
  IAdminAppointment,
  IAppointmentDocument,
  IAppointmentPost,
} from "@/types/appointment";
import { readApiError } from "../core/errors";
import { getFetch } from "../core/token-apis";

const toAppointment = (document: IAppointmentDocument): IAppointmentPost => ({
  _id: document._id,
  serviceId: document.serviceId,
  serviceName: document.serviceName,
  serviceCategory: document.serviceCategory,
  customerId: document.customerId,
  appointmentDate: document.appointmentDate,
  timeSlot: document.timeSlot,
  message: document.message,
  price: document.price,
  status: document.Status,
  paymentStatus: document.PaymentStatus,
  createdAt: document.postedAt,
});

const toAdminAppointment = (
  document: IAppointmentDocument,
): IAdminAppointment => ({
  ...toAppointment(document),
  customerName: document.customerName || "Unknown customer",
  customerEmail: document.customerEmail || "—",
  customerImage: document.customerImage,
});

export const getAppointmentByUserId = async (
  id: string,
): Promise<IAppointmentPost[]> => {
  const api = `${process.env.NEXT_PUBLIC_BASE_URL}/appointments/${id}`;
  const res = await getFetch(api);

  if (!res.ok) {
    throw new Error(
      await readApiError(res, "Could not load your appointments."),
    );
  }

  const data: IAppointmentDocument[] = await res.json();

  return Array.isArray(data) ? data.map(toAppointment) : [];
};

/** Loads every appointment request for the admin dashboard. */
export const getAllAppointments = async (): Promise<IAdminAppointment[]> => {
  const api = `${process.env.NEXT_PUBLIC_BASE_URL}/admin/appointments`;
  const res = await getFetch(api);

  if (!res.ok) {
    throw new Error(
      await readApiError(res, "Could not load the appointment list."),
    );
  }

  const data: IAppointmentDocument[] = await res.json();
  return Array.isArray(data) ? data.map(toAdminAppointment) : [];
};
