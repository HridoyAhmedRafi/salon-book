"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, LoaderCircle, Lock, Mail, Scissors } from "lucide-react";
import { toast } from "sonner";

import { FieldError } from "@/components/shared/FieldError";
import { FormAlert } from "@/components/shared/FormAlert";
import { signIn } from "@/lib/auth-client";

const inputClass =
  "w-full rounded-lg border border-border bg-transparent py-2.5 pl-10 pr-4 text-sm text-foreground outline-none transition placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20 aria-invalid:border-destructive";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type FieldErrors = {
  email?: string;
  password?: string;
};

const SignInForm = ({ redirectTo }: { redirectTo: string }) => {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [formError, setFormError] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (submitting) {
      return;
    }

    const user = Object.fromEntries(
      new FormData(event.currentTarget).entries(),
    ) as {
      email: string;
      password: string;
    };

    const email = user.email.trim();
    const password = user.password;
    const nextErrors: FieldErrors = {};

    if (!email) {
      nextErrors.email = "Enter your email address.";
    } else if (!EMAIL_PATTERN.test(email)) {
      nextErrors.email = "Enter a valid email address.";
    }

    if (!password) {
      nextErrors.password = "Enter your password.";
    }

    setErrors(nextErrors);
    setFormError("");

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    setSubmitting(true);

    try {
      const { error } = await signIn.email({ email, password });

      if (error) {
        setFormError(error.message ?? "Invalid email or password.");
        return;
      }

      toast.success("Welcome back!");
      router.push(redirectTo);
      router.refresh();
    } catch {
      setFormError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signIn.social({
        provider: "google",
        callbackURL: new URL(redirectTo, window.location.origin).toString(),
      });
    } catch {
      toast.error("Could not start Google sign in. Please try again.");
    }
  };

  const signUpHref =
    redirectTo === "/"
      ? "/sign-up"
      : `/sign-up?redirect=${encodeURIComponent(redirectTo)}`;

  return (
    <main className="flex flex-1 items-center justify-center px-4 py-12">
      <div className="w-full max-w-md rounded-2xl border bg-card p-6 text-card-foreground shadow-sm sm:p-8">
        <div className="text-center">
          <div className="mx-auto mb-3 flex size-12 items-center justify-center rounded-xl bg-primary text-primary-foreground">
            <Scissors className="size-6" />
          </div>
          <h1 className="text-2xl font-semibold tracking-tight">
            Welcome back
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Sign in to manage your appointments.
          </p>
        </div>

        <form onSubmit={handleSubmit} noValidate className="mt-6 space-y-4">
          <FormAlert>{formError}</FormAlert>

          <div className="space-y-1.5">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-foreground"
            >
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                aria-invalid={Boolean(errors.email)}
                aria-describedby={errors.email ? "email-error" : undefined}
                onChange={() => {
                  setErrors((current) => ({ ...current, email: undefined }));
                  setFormError("");
                }}
                className={inputClass}
              />
            </div>

            <FieldError id="email-error">{errors.email}</FieldError>
          </div>

          <div className="space-y-1.5">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-foreground"
            >
              Password
            </label>
            <div className="relative">
              <Lock className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                placeholder="Enter your password"
                aria-invalid={Boolean(errors.password)}
                aria-describedby={
                  errors.password ? "password-error" : undefined
                }
                onChange={() => {
                  setErrors((current) => ({
                    ...current,
                    password: undefined,
                  }));
                  setFormError("");
                }}
                className={`${inputClass} pr-11`}
              />
              <button
                type="button"
                onClick={() => setShowPassword((value) => !value)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                className="absolute top-1/2 right-3 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
              >
                {showPassword ? (
                  <EyeOff className="size-4" />
                ) : (
                  <Eye className="size-4" />
                )}
              </button>
            </div>

            <FieldError id="password-error">{errors.password}</FieldError>
          </div>

          <button
            type="submit"
            disabled={submitting}
            aria-busy={submitting}
            className="inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-primary py-2.5 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {submitting && <LoaderCircle className="size-4 animate-spin" />}
            {submitting ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <div className="my-6 flex items-center gap-4">
          <div className="h-px flex-1 bg-border" />
          <span className="text-xs text-muted-foreground">
            OR CONTINUE WITH
          </span>
          <div className="h-px flex-1 bg-border" />
        </div>

        <button
          type="button"
          onClick={handleGoogleSignIn}
          disabled={submitting}
          className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg border border-border py-2.5 text-sm font-medium text-foreground transition hover:bg-muted disabled:cursor-not-allowed disabled:opacity-60"
        >
          <span aria-hidden className="text-base font-bold">
            G
          </span>
          Continue with Google
        </button>

        <p className="mt-7 text-center text-sm text-muted-foreground">
          Don&apos;t have an account?{" "}
          <Link
            href={signUpHref}
            className="font-semibold text-foreground underline-offset-4 transition-colors hover:text-primary hover:underline"
          >
            Create one
          </Link>
        </p>
      </div>
    </main>
  );
};

export default SignInForm;
