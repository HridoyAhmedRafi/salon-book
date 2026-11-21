"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { LoaderCircle, Mail } from "lucide-react";
import { toast } from "sonner";

import { ImageUploadField } from "@/components/shared/ImageUploadField";
import { FormAlert } from "@/components/shared/FormAlert";
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

/**
 * Editable customer details. Name and image are persisted through Better Auth;
 * email is read-only because it is managed by the salon.
 */
export function CustomerProfileForm({ user }: CustomerProfileFormProps) {
  const router = useRouter();

  const [name, setName] = useState(user.name);
  const [image, setImage] = useState(user.image ?? "");
  const [nameError, setNameError] = useState("");
  const [formError, setFormError] = useState("");
  const [uploadingImage, setUploadingImage] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const trimmedName = name.trim();
  const trimmedImage = image.trim();
  const initialImage = (user.image ?? "").trim();

  const hasChanges =
    trimmedName !== user.name.trim() || trimmedImage !== initialImage;

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (submitting || uploadingImage) {
      if (uploadingImage) {
        setFormError("Please wait for the photo upload to finish.");
      }

      return;
    }

    const nextNameError = trimmedName ? "" : "Name is required.";

    setNameError(nextNameError);
    setFormError("");

    if (nextNameError) {
      return;
    }

    setSubmitting(true);

    try {
      const { error } = await authClient.updateUser({
        name: trimmedName,
        image: trimmedImage || null,
      });

      if (error) {
        setFormError(error.message ?? "Could not save your profile.");
        return;
      }

      setName(trimmedName);
      setImage(trimmedImage);
      toast.success("Profile updated.");
      router.refresh();
    } catch {
      setFormError("Something went wrong. Please try again.");
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
          <FormAlert>{formError}</FormAlert>

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
              <ImageUploadField
                value={image}
                onChange={(value) => {
                  setImage(value);
                  setFormError("");
                }}
                onUploadingChange={setUploadingImage}
                label="Profile photo"
                description="PNG, JPEG, WebP or GIF · up to 5 MB. Leave empty to use your initial."
                showPreview={false}
                disabled={submitting}
              />
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
                  setFormError("");

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
            disabled={!hasChanges || submitting || uploadingImage}
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
