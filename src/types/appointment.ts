export type AppointmentStatus = "Pending" | "Confirmed" | "Cancelled";

export type PaymentStatus = "Unpaid" | "Paid";

export interface IAppointment {
  serviceId: string;
  serviceName: string;
  serviceCategory: string;
  customerId: string;
  appointmentDate: string;
  timeSlot: string;
  message?: string;
  price: number;
}

/** Appointment document exactly as returned by the API. */
export interface IAppointmentDocument extends IAppointment {
  _id: string;
  Status: AppointmentStatus;
  PaymentStatus: PaymentStatus;
  postedAt: string;
}

/** Normalised appointment used across the UI. */
export interface IAppointmentPost extends IAppointment {
  _id: string;
  status: AppointmentStatus;
  paymentStatus: PaymentStatus;
  createdAt: string;
}
