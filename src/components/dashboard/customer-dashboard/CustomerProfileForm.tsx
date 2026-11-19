"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { LoaderCircle, Mail, Trash2 } from "lucide-react";
import { toast } from "sonner";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authClient } from "@/lib/auth-client";
import type { IProfileUser } from "@/types/profile";

export interface CustomerProfileFormProps {
  user: IProfileUser;
}

function getInitial(name: string) {
  return name.trim().charAt(0).toUpperCase() || "U";
}

function validateImageUrl(value: string) {
  const trimmed = value.trim();

  if (!trimmed) {
    return "";
  }

  try {
    const url = new URL(trimmed);

    if (url.protocol !== "http:" && url.protocol !== "https:") {
      return "Use an http or https image link.";
    }

    return "";
  } catch {
    return "Enter a valid image URL.";
  }
}

/**
 * Editable customer details. Name and image are persisted through Better Auth;
 * email is read-only because it is managed by the salon.
 */
export function CustomerProfileForm({ user }: CustomerProfileFormProps) {
  const router = useRouter();

  const [name, setName] = useState(user.name);
  const [image, setImage] = useState(user.image ?? "");
  const [nameError, setNameError] = useState("");
  const [imageError, setImageError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const trimmedName = name.trim();
  const trimmedImage = image.trim();
  const initialImage = (user.image ?? "").trim();

  const hasChanges =
    trimmedName !== user.name.trim() || trimmedImage !== initialImage;

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (submitting) {
      return;
    }

    const nextNameError = trimmedName ? "" : "Name is required.";
    const nextImageError = validateImageUrl(trimmedImage);

    setNameError(nextNameError);
    setImageError(nextImageError);

    if (nextNameError || nextImageError) {
      return;
    }

    setSubmitting(true);

    try {
      const { error } = await authClient.updateUser({
        name: trimmedName,
        image: trimmedImage || null,
      });

      if (error) {
        toast.error(error.message ?? "Could not save your profile.");
        return;
      }

      setName(trimmedName);
      setImage(trimmedImage);
      toast.success("Profile updated.");
      router.refresh();
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Card className="gap-0">
      <CardHeader className="border-b border-border/60 pb-5">
        <CardTitle className="text-xl">Photo &amp; name</CardTitle>
        <CardDescription>
          This is how you will appear in the salon&apos;s booking records.
        </CardDescription>
      </CardHeader>

      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-6 pt-6">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
            <Avatar className="size-20 text-xl sm:size-24">
              {trimmedImage ? (
                <AvatarImage
                  src={trimmedImage}
                  alt={trimmedName || "Profile picture"}
                />
              ) : null}
              <AvatarFallback className="bg-primary/10 text-lg font-semibold">
                {getInitial(name)}
              </AvatarFallback>
            </Avatar>

            <div className="flex-1 space-y-2">
              <Label htmlFor="image">Profile image URL</Label>

              <Input
                id="image"
                name="image"
                type="url"
                inputMode="url"
                placeholder="https://example.com/photo.jpg"
                value={image}
                onChange={(event) => {
                  setImage(event.target.value);

                  if (imageError) {
                    setImageError("");
                  }
                }}
                aria-invalid={Boolean(imageError)}
                className="h-10"
              />

              {imageError ? (
                <p className="text-xs text-destructive">{imageError}</p>
              ) : null}

              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="text-xs text-muted-foreground">
                  JPEG, PNG, or WebP link. Leave blank to use your initial.
                </p>

                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setImage("");
                    setImageError("");
                  }}
                  disabled={!trimmedImage}
                  className="cursor-pointer text-muted-foreground hover:text-destructive"
                >
                  <Trash2 />
                  Remove photo
                </Button>
              </div>
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="name">Full name</Label>

              <Input
                id="name"
                name="name"
                autoComplete="name"
                value={name}
                onChange={(event) => {
                  setName(event.target.value);

                  if (nameError) {
                    setNameError("");
                  }
                }}
                aria-invalid={Boolean(nameError)}
                className="h-10"
                required
              />

              {nameError ? (
                <p className="text-xs text-destructive">{nameError}</p>
              ) : null}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-muted-foreground">
                <Mail className="size-4" />
                Email address
              </Label>

              <Input
                id="email"
                name="email"
                type="email"
                value={user.email}
                disabled
                className="h-10"
              />

              <p className="text-xs text-muted-foreground">
                Email changes are handled by the salon for account security.
              </p>
            </div>
          </div>
        </CardContent>

        <CardFooter className="justify-between gap-3 border-t">
          <p className="text-xs text-muted-foreground">
            Changes apply the next time you book.
          </p>

          <Button
            type="submit"
            disabled={!hasChanges || submitting}
            aria-busy={submitting}
            className="min-w-32 cursor-pointer"
          >
            {submitting ? <LoaderCircle className="animate-spin" /> : null}
            {submitting ? "Saving..." : "Save changes"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
