import Link from "next/link";

import { ThemeToggle } from "@/components/shared/theme-toggle";
import { navLinks } from "@/components/shared/nav-links";
import SessionButton from "../user-session/SessionButton";
import MobileMenu from "../user-session/MobileMenu";

export function Navbar() {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between gap-4 px-4">
        <Link
          href="/"
          className="rounded-sm text-xl font-semibold tracking-tight transition-colors hover:text-primary focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none"
        >
          SalonBook
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-primary/10 hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none dark:hover:bg-primary/10"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          {/* On mobile these live inside the menu instead. */}
          <ThemeToggle className="max-md:hidden" />

          <div className="hidden items-center gap-2 md:flex">
            <SessionButton />
          </div>

          <MobileMenu />
        </div>
      </div>
    </header>
  );
}
