export interface INavbarUser {
  name: string;
  email: string;
  image?: string | null;
  role: string;
}

export type NavbarActionsProps = {
  user: INavbarUser | null;
};
