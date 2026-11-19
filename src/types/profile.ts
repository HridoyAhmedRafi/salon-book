/** Session-backed fields shown on the customer profile page. */
export interface IProfileUser {
  name: string;
  email: string;
  image: string | null;
  role: string;
  isBlocked: boolean;
  /** ISO timestamp from Better Auth's `createdAt`. */
  createdAt: string;
}
