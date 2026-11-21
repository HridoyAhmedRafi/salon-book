/**
 * A successful checkout recorded by the backend after Stripe confirms payment.
 * Monetary values are stored in BDT.
 */
export interface IAdminTransaction {
  _id: string;
  appointmentId: string;
  customerId: string;
  customerName: string;
  customerEmail: string;
  serviceName: string;
  /** Appointment date chosen by the customer, e.g. "2026-11-24". */
  appointmentDate: string;
  /** Amount charged, in BDT. */
  amount: number;
  currency: string;
  /** Stripe Checkout Session ID. */
  stripeSessionId: string;
  status: string;
  /** ISO timestamp of when the payment was recorded. */
  transactionDate: string;
}
