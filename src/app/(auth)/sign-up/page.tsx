"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { CircleAlert, CircleCheck, Loader2 } from "lucide-react";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signUp } from "@/lib/auth-client";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const SignUpPage = () => {
  const router = useRouter();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const passwordIsValid =
    password.length >= 6 && /[A-Z]/.test(password) && /[a-z]/.test(password);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setSuccess("");

    if (fullName.trim().length < 2) {
      setError("Please enter your full name.");
      return;
    }

    if (!emailPattern.test(email.trim())) {
      setError("Please enter a valid email address.");
      return;
    }

    if (!passwordIsValid) {
      setError(
        "Password must be at least 6 characters and include one uppercase and one lowercase letter.",
      );
      return;
    }

    if (imageUrl.trim() && !/^https?:\/\//i.test(imageUrl.trim())) {
      setError("Image URL must start with http:// or https://");
      return;
    }

    setIsSubmitting(true);

    const { error: authError } = await signUp.email({
      name: fullName.trim(),
      email: email.trim(),
      password,
      image: imageUrl.trim() || undefined,
    });

    setIsSubmitting(false);

    if (authError) {
      setError(authError.message ?? "Something went wrong. Please try again.");
      return;
    }

    setSuccess("Account created. Taking you home…");
    setTimeout(() => {
      router.push("/");
      router.refresh();
    }, 900);
  };

  return (
    <div className="flex flex-1 items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="rounded-xl border bg-card p-6 text-card-foreground shadow-sm sm:p-8">
          <h1 className="cursor-pointer text-2xl font-semibold tracking-tight">
            Create your account
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Book your next appointment in minutes.
          </p>

          <form onSubmit={handleSubmit} noValidate className="mt-6 space-y-5">
            <div className="space-y-2">
              <Label htmlFor="full-name">Full Name</Label>
              <Input
                id="full-name"
                name="name"
                autoComplete="name"
                placeholder="Jane Doe"
                value={fullName}
                onChange={(event) => setFullName(event.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="jane@example.com"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                placeholder="Create a password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="image-url">Profile Image URL</Label>
              <Input
                id="image-url"
                name="image"
                type="url"
                autoComplete="url"
                placeholder="https://example.com/photo.jpg"
                value={imageUrl}
                onChange={(event) => setImageUrl(event.target.value)}
              />
              <p className="text-xs text-muted-foreground">
                Optional. Paste a link to your profile photo.
              </p>
            </div>

            {error && (
              <Alert variant="destructive" aria-live="polite">
                <CircleAlert />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {success && (
              <Alert aria-live="polite">
                <CircleCheck />
                <AlertDescription>{success}</AlertDescription>
              </Alert>
            )}

            <Button
              type="submit"
              size="lg"
              className="w-full"
              disabled={isSubmitting}
            >
              {isSubmitting && <Loader2 className="animate-spin" />}
              {isSubmitting ? "Creating account..." : "Create account"}
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link
              href="/sign-in"
              className="font-medium text-foreground underline-offset-4 transition-colors hover:text-primary hover:underline"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
