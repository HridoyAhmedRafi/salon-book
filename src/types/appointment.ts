export type AppointmentStatus = "Pending" | "Confirmed" | "Cancelled";

export type PaymentStatus = "Unpaid" | "Paid";

export interface IAppointment {
  serviceId: string;
  customerId: string;
  appointmentDate: string;
  timeSlot: string;
  message?: string;
  price: number;
}

export interface IAppointmentPost extends IAppointment {
  _id: string;
  status: AppointmentStatus;
  paymentStatus: PaymentStatus;
  createdAt: string;
}
