"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { LoaderCircle, Pencil } from "lucide-react";
import { toast } from "sonner";

import { FieldError } from "@/components/shared/FieldError";
import { FormAlert } from "@/components/shared/FormAlert";
import { ImageUploadField } from "@/components/shared/ImageUploadField";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { updateService } from "@/lib/apis/mutation/adminService";
import {
  validateServiceValues,
  type ServiceFormErrors,
} from "@/lib/validation/service";
import type { IAdminService } from "@/types/admin-service";

import { serviceCategories } from "./categories";

export interface EditServiceButtonProps {
  service: IAdminService;
}

const selectClass =
  "flex h-10 w-full rounded-lg border border-input bg-background px-2.5 py-1 text-sm outline-none transition-colors focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 dark:bg-input/30";

/**
 * Opens a pre-filled form and saves the service through the edit API.
 */
export function EditServiceButton({ service }: EditServiceButtonProps) {
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [serviceName, setServiceName] = useState(service.serviceName);
  const [category, setCategory] = useState(service.category);
  const [description, setDescription] = useState(service.description);
  const [price, setPrice] = useState(String(service.price));
  const [duration, setDuration] = useState(String(service.duration));
  const [image, setImage] = useState(service.image);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [errors, setErrors] = useState<ServiceFormErrors>({});
  const [formError, setFormError] = useState("");

  const clearError = (field: keyof ServiceFormErrors) => {
    setErrors((current) =>
      current[field] ? { ...current, [field]: undefined } : current,
    );
  };

  const resetForm = () => {
    setServiceName(service.serviceName);
    setCategory(service.category);
    setDescription(service.description);
    setPrice(String(service.price));
    setDuration(String(service.duration));
    setImage(service.image);
    setUploadingImage(false);
    setErrors({});
    setFormError("");
  };

  const handleOpenChange = (nextOpen: boolean) => {
    if (nextOpen) {
      resetForm();
    }

    setOpen(nextOpen);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (submitting || uploadingImage) {
      if (uploadingImage) {
        setFormError("Please wait for the image upload to finish.");
      }

      return;
    }

    const { errors: nextErrors, service: nextService } = validateServiceValues({
      serviceName,
      category,
      description,
      price,
      duration,
      image,
    });

    setErrors(nextErrors);
    setFormError("");

    if (!nextService) {
      return;
    }

    setSubmitting(true);

    try {
      const result = await updateService(service._id, nextService);

      if (!result.ok) {
        setFormError(result.message);
        return;
      }

      toast.success("Service updated.");
      setOpen(false);
      router.refresh();
    } catch {
      setFormError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger
        render={
          <Button
            variant="outline"
            size="sm"
            className="h-8 cursor-pointer px-2.5"
          />
        }
      >
        <Pencil />
        Edit
      </DialogTrigger>

      <DialogContent className="sm:max-w-2xl">
        <form onSubmit={handleSubmit} noValidate className="space-y-5">
          <DialogHeader>
            <DialogTitle>Edit service</DialogTitle>
            <DialogDescription>
              Update the details customers see when browsing this service.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <FormAlert>{formError}</FormAlert>

            <div className="space-y-2">
              <Label htmlFor={`serviceName-${service._id}`}>Service name</Label>

              <Input
                id={`serviceName-${service._id}`}
                value={serviceName}
                onChange={(event) => {
                  setServiceName(event.target.value);
                  clearError("serviceName");
                }}
                className="h-10"
                aria-invalid={Boolean(errors.serviceName)}
                aria-describedby={
                  errors.serviceName
                    ? `serviceName-error-${service._id}`
                    : undefined
                }
              />

              <FieldError id={`serviceName-error-${service._id}`}>
                {errors.serviceName}
              </FieldError>
            </div>

            <div className="space-y-2">
              <Label htmlFor={`category-${service._id}`}>Category</Label>

              <select
                id={`category-${service._id}`}
                value={category}
                onChange={(event) => {
                  setCategory(event.target.value);
                  clearError("category");
                }}
                className={selectClass}
                aria-invalid={Boolean(errors.category)}
                aria-describedby={
                  errors.category ? `category-error-${service._id}` : undefined
                }
              >
                <option value="" disabled>
                  Select a category
                </option>

                {serviceCategories.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>

              <FieldError id={`category-error-${service._id}`}>
                {errors.category}
              </FieldError>
            </div>

            <div className="space-y-2">
              <Label htmlFor={`description-${service._id}`}>Description</Label>

              <Textarea
                id={`description-${service._id}`}
                value={description}
                onChange={(event) => {
                  setDescription(event.target.value);
                  clearError("description");
                }}
                className="min-h-28 resize-y"
                aria-invalid={Boolean(errors.description)}
                aria-describedby={
                  errors.description
                    ? `description-error-${service._id}`
                    : undefined
                }
              />

              <FieldError id={`description-error-${service._id}`}>
                {errors.description}
              </FieldError>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor={`price-${service._id}`}>Price (৳)</Label>

                <Input
                  id={`price-${service._id}`}
                  type="number"
                  min="0"
                  value={price}
                  onChange={(event) => {
                    setPrice(event.target.value);
                    clearError("price");
                  }}
                  className="h-10"
                  aria-invalid={Boolean(errors.price)}
                  aria-describedby={
                    errors.price ? `price-error-${service._id}` : undefined
                  }
                />

                <FieldError id={`price-error-${service._id}`}>
                  {errors.price}
                </FieldError>
              </div>

              <div className="space-y-2">
                <Label htmlFor={`duration-${service._id}`}>
                  Duration (minutes)
                </Label>

                <Input
                  id={`duration-${service._id}`}
                  type="number"
                  min="1"
                  value={duration}
                  onChange={(event) => {
                    setDuration(event.target.value);
                    clearError("duration");
                  }}
                  className="h-10"
                  aria-invalid={Boolean(errors.duration)}
                  aria-describedby={
                    errors.duration
                      ? `duration-error-${service._id}`
                      : undefined
                  }
                />

                <FieldError id={`duration-error-${service._id}`}>
                  {errors.duration}
                </FieldError>
              </div>
            </div>

            <div className="space-y-2">
              <ImageUploadField
                value={image}
                onChange={(value) => {
                  setImage(value);
                  clearError("image");
                }}
                onUploadingChange={setUploadingImage}
                label="Service image"
                description="PNG, JPEG, WebP or GIF · up to 5 MB."
                required
                disabled={submitting}
              />

              <FieldError id={`image-error-${service._id}`}>
                {errors.image}
              </FieldError>
            </div>
          </div>

          <DialogFooter>
            <DialogClose render={<Button type="button" variant="outline" />}>
              Cancel
            </DialogClose>

            <Button
              type="submit"
              disabled={submitting || uploadingImage}
              aria-busy={submitting}
              className="min-w-32 cursor-pointer"
            >
              {submitting ? <LoaderCircle className="animate-spin" /> : null}
              {submitting ? "Saving..." : "Save changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
