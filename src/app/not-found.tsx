import Link from "next/link";
import { Compass, Home, SearchX } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="w-full max-w-md text-center">
        <div className="mx-auto mb-6 flex size-20 items-center justify-center rounded-full bg-primary/10">
          <SearchX className="size-10 text-primary" />
        </div>

        <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-primary">
          Error 404
        </p>

        <h1 className="mb-3 text-3xl font-bold tracking-tight">
          Page not found
        </h1>

        <p className="mb-8 text-muted-foreground">
          The page you are looking for does not exist, or it may have moved.
        </p>

        <div className="flex flex-col justify-center gap-3 sm:flex-row">
          <Link href="/" className={buttonVariants({ size: "lg" })}>
            <Home />
            Back home
          </Link>

          <Link
            href="/services"
            className={buttonVariants({ variant: "outline", size: "lg" })}
          >
            <Compass />
            Browse services
          </Link>
        </div>
      </div>
    </main>
  );
}
