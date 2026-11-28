"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Eye,
  EyeOff,
  LoaderCircle,
  Lock,
  Mail,
  Scissors,
  User,
} from "lucide-react";
import { toast } from "sonner";

import { FieldError } from "@/components/shared/FieldError";
import { FormAlert } from "@/components/shared/FormAlert";
import { ImageUploadField } from "@/components/shared/ImageUploadField";
import { uploadImageToImgbb } from "@/lib/apis/upload/imgbb";
import { authClient, signIn, signUp } from "@/lib/auth-client";

const inputClass =
  "w-full rounded-lg border border-border bg-transparent py-2.5 pl-10 pr-4 text-sm text-foreground outline-none transition placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20 aria-invalid:border-destructive";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PASSWORD_HINT =
  "Use 6+ characters with one uppercase and one lowercase letter.";

type FieldErrors = {
  name?: string;
  email?: string;
  password?: string;
};

const SignUpForm = ({ redirectTo }: { redirectTo: string }) => {
  const router = useRouter();

  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [image, setImage] = useState("");
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [formError, setFormError] = useState("");

  const isPasswordValid =
    password.length >= 6 && /[A-Z]/.test(password) && /[a-z]/.test(password);

  const clearError = (field: keyof FieldErrors) => {
    setErrors((current) =>
      current[field] ? { ...current, [field]: undefined } : current,
    );
    setFormError("");
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (submitting || uploadingImage) {
      if (uploadingImage) {
        setFormError("Please wait for the photo upload to finish.");
      }

      return;
    }

    const formData = new FormData(event.currentTarget);
    const name = String(formData.get("name") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();

    const nextErrors: FieldErrors = {};

    if (!name) {
      nextErrors.name = "Enter your full name.";
    }

    if (!email) {
      nextErrors.email = "Enter your email address.";
    } else if (!EMAIL_PATTERN.test(email)) {
      nextErrors.email = "Enter a valid email address.";
    }

    if (!password) {
      nextErrors.password = "Enter a password.";
    } else if (!isPasswordValid) {
      nextErrors.password = PASSWORD_HINT;
    }

    setErrors(nextErrors);
    setFormError("");

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    setSubmitting(true);

    try {
      // The photo is uploaded after sign-up: the upload route needs a session,
      // and sign-up only creates one once the account exists.
      const { error } = await signUp.email({ name, email, password });

      if (error) {
        setFormError(error.message ?? "Could not create your account.");
        return;
      }

      let photoFailed = false;

      if (photoFile) {
        setUploadingImage(true);

        try {
          const imageUrl = await uploadImageToImgbb(photoFile);
          const { error: imageError } = await authClient.updateUser({
            image: imageUrl,
          });

          if (imageError) {
            photoFailed = true;
          } else {
            setImage(imageUrl);
          }
        } catch {
          photoFailed = true;
        } finally {
          setUploadingImage(false);
        }
      }

      toast.success("Account created. Welcome to SalonBook!");

      if (photoFailed) {
        toast.error(
          "Your photo could not be saved. You can add it in Profile.",
        );
      }

      router.push(redirectTo);
      router.refresh();
    } catch {
      setFormError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleGoogleSignUp = async () => {
    try {
      await signIn.social({
        provider: "google",
        callbackURL: new URL(redirectTo, window.location.origin).toString(),
      });
    } catch {
      toast.error("Could not start Google sign up. Please try again.");
    }
  };

  const signInHref =
    redirectTo === "/"
      ? "/sign-in"
      : `/sign-in?redirect=${encodeURIComponent(redirectTo)}`;

  return (
    <main className="flex flex-1 items-center justify-center px-4 py-12">
      <div className="w-full max-w-md rounded-2xl border bg-card p-6 text-card-foreground shadow-sm sm:p-8">
        <div className="text-center">
          <div className="mx-auto mb-3 flex size-12 items-center justify-center rounded-xl bg-primary text-primary-foreground">
            <Scissors className="size-6" />
          </div>
          <h1 className="text-2xl font-semibold tracking-tight">
            Create an account
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Book your next appointment in minutes.
          </p>
        </div>

        <form onSubmit={handleSubmit} noValidate className="mt-6 space-y-4">
          <FormAlert>{formError}</FormAlert>

          <div className="space-y-1.5">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-foreground"
            >
              Full Name
            </label>
            <div className="relative">
              <User className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
              <input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                placeholder="Enter your full name"
                aria-invalid={Boolean(errors.name)}
                aria-describedby={errors.name ? "name-error" : undefined}
                onChange={() => clearError("name")}
                className={inputClass}
              />
            </div>

            <FieldError id="name-error">{errors.name}</FieldError>
          </div>

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
                onChange={() => clearError("email")}
                className={inputClass}
              />
            </div>

            <FieldError id="email-error">{errors.email}</FieldError>
          </div>

          <div>
            <ImageUploadField
              value={image}
              onChange={setImage}
              onFileSelected={setPhotoFile}
              label="Profile photo (optional)"
              description="PNG, JPEG, WebP or GIF · up to 5 MB."
              showPreview={false}
              disabled={submitting}
            />
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
                autoComplete="new-password"
                placeholder="Create a password"
                value={password}
                onChange={(event) => {
                  setPassword(event.target.value);
                  clearError("password");
                }}
                aria-invalid={Boolean(errors.password)}
                aria-describedby={
                  errors.password ? "password-error" : undefined
                }
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

            <FieldError id="password-error">
              {errors.password ||
                (password.length > 0 && !isPasswordValid
                  ? PASSWORD_HINT
                  : undefined)}
            </FieldError>
          </div>

          <button
            type="submit"
            disabled={submitting || uploadingImage}
            aria-busy={submitting}
            className="inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-primary py-2.5 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {submitting && <LoaderCircle className="size-4 animate-spin" />}
            {submitting ? "Creating account..." : "Create Account"}
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
          onClick={handleGoogleSignUp}
          disabled={submitting}
          className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg border border-border py-2.5 text-sm font-medium text-foreground transition hover:bg-muted disabled:cursor-not-allowed disabled:opacity-60"
        >
          <span aria-hidden className="text-base font-bold">
            G
          </span>
          Continue with Google
        </button>

        <p className="mt-7 text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link
            href={signInHref}
            className="font-semibold text-foreground underline-offset-4 transition-colors hover:text-primary hover:underline"
          >
            Sign in
          </Link>
        </p>
      </div>
    </main>
  );
};

export default SignUpForm;
