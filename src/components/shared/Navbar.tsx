import Link from "next/link";
import { headers } from "next/headers";

import { auth } from "@/lib/auth";
import NavbarActions from "./NavbarActions";
import { INavbarUser } from "@/types/navbar";

export async function Navbar() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const user: INavbarUser | null = session?.user
    ? {
        name: session.user.name ?? "User",
        email: session.user.email ?? "",
        image: session.user.image,
        role: session.user.role ?? "customer",
      }
    : null;

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between gap-4 px-4">
        <Link
          href="/"
          className="rounded-sm text-xl font-semibold tracking-tight transition-colors hover:text-primary"
        >
          SalonBook
        </Link>

        <NavbarActions user={user} />
      </div>
    </header>
  );
}
