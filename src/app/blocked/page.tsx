import Link from "next/link";
import { Ban, Home } from "lucide-react";

import { SignOutButton } from "@/components/dashboard/shared/SignOutButton";
import { buttonVariants } from "@/components/ui/button";

export default function BlockedPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="w-full max-w-md rounded-2xl border bg-card p-8 text-center shadow-sm">
        <div className="mx-auto mb-6 flex size-20 items-center justify-center rounded-full bg-destructive/10">
          <Ban className="size-10 text-destructive" />
        </div>

        <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-destructive">
          Account blocked
        </p>

        <h1 className="mb-3 text-3xl font-bold tracking-tight">
          Access paused
        </h1>

        <p className="mb-8 text-muted-foreground">
          Your account has been blocked by the salon. If you believe this is a
          mistake, please contact support. You can sign out and use another
          account in the meantime.
        </p>

        <div className="flex flex-col gap-3">
          <SignOutButton />

          <Link href="/" className={buttonVariants({ variant: "ghost" })}>
            <Home />
            Back home
          </Link>
        </div>
      </div>
    </main>
  );
}
