import { Home } from "lucide-react";
import Link from "next/link";

export default function BlockedPage() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <h1 className="text-3xl font-bold">Account Blocked</h1>

        <p className="mt-3 text-muted-foreground">
          Your account has been blocked. Please contact support for assistance.
        </p>
        <Link
          href="/"
          className="mt-3 inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
        >
          <Home className="size-4" />
          Back to Home
        </Link>
      </div>
    </div>
  );
}
