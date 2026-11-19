/** Customer account as returned by the admin users API. */
export interface IAdminUser {
  _id: string;
  name: string;
  email: string;
  image?: string | null;
  role: "customer";
  isBlocked: boolean;
  /** ISO timestamp from Better Auth's `createdAt`. */
  createdAt: string;
  appointmentCount: number;
}
