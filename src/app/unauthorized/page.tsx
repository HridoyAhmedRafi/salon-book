import Link from "next/link";
import { Home, LogIn, ShieldAlert } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";

const UnauthorizedPage = () => {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="w-full max-w-md text-center">
        <div className="mx-auto mb-6 flex size-20 items-center justify-center rounded-full bg-destructive/10">
          <ShieldAlert className="size-10 text-destructive" />
        </div>

        <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-destructive">
          Error 403
        </p>

        <h1 className="mb-3 text-3xl font-bold tracking-tight">
          Access denied
        </h1>

        <p className="mb-8 text-muted-foreground">
          You don&apos;t have permission to view this page. If you think this is
          a mistake, sign in with the right account or return to the homepage.
        </p>

        <div className="flex flex-col justify-center gap-3 sm:flex-row">
          <Link href="/sign-in" className={buttonVariants({ size: "lg" })}>
            <LogIn />
            Sign in
          </Link>

          <Link
            href="/"
            className={buttonVariants({ variant: "outline", size: "lg" })}
          >
            <Home />
            Back home
          </Link>
        </div>
      </div>
    </main>
  );
};

export default UnauthorizedPage;
