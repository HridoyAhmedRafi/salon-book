import Link from "next/link";
import { headers } from "next/headers";
import { Scissors } from "lucide-react";

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
          aria-label="SalonBook home"
          className="inline-flex items-center gap-2"
        >
          <span className="flex size-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Scissors className="size-5" />
          </span>
          <span className="text-2xl font-bold tracking-tight">
            Salon<span className="text-[#d2a01f]">Book</span>
          </span>
        </Link>

        <NavbarActions user={user} />
      </div>
    </header>
  );
}
