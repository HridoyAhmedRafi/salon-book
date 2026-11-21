"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle, Home, RefreshCw } from "lucide-react";

import { Button, buttonVariants } from "@/components/ui/button";

export interface RouteErrorProps {
  error: unknown;
  retry: () => void;
}

export default function RouteError({ error, retry }: RouteErrorProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="w-full max-w-md text-center">
        <div className="mx-auto mb-6 flex size-20 items-center justify-center rounded-full bg-destructive/10">
          <AlertTriangle className="size-10 text-destructive" />
        </div>

        <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-destructive">
          Something went wrong
        </p>

        <h1 className="mb-3 text-3xl font-bold tracking-tight">
          We could not finish loading this page
        </h1>

        <p className="mb-8 text-muted-foreground">
          This is usually temporary. Try again, or head back to the homepage if
          the problem continues.
        </p>

        <div className="flex flex-col justify-center gap-3 sm:flex-row">
          <Button
            size="lg"
            onClick={() => retry()}
            className="cursor-pointer"
          >
            <RefreshCw />
            Try again
          </Button>

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
}
