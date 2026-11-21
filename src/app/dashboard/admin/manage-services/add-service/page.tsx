"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Clock,
  DollarSign,
  LoaderCircle,
  Scissors,
} from "lucide-react";

import { FieldError } from "@/components/shared/FieldError";
import { FormAlert } from "@/components/shared/FormAlert";
import { ImageUploadField } from "@/components/shared/ImageUploadField";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { AddService } from "@/lib/apis/mutation/service";
import {
  validateServiceValues,
  type ServiceFormErrors,
} from "@/lib/validation/service";
import { toast } from "sonner";

export default function AddServiceForm() {
  const router = useRouter();
  const [image, setImage] = useState("");
  const [uploadingImage, setUploadingImage] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<ServiceFormErrors>({});
  const [formError, setFormError] = useState("");

  const clearError = (field: keyof ServiceFormErrors) => {
    setErrors((current) =>
      current[field] ? { ...current, [field]: undefined } : current,
    );
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (submitting || uploadingImage) {
      if (uploadingImage) {
        setFormError("Please wait for the image upload to finish.");
      }

      return;
    }

    const formData = new FormData(e.currentTarget);

    const { errors: nextErrors, service } = validateServiceValues({
      serviceName: String(formData.get("serviceName") ?? ""),
      category: String(formData.get("category") ?? ""),
      description: String(formData.get("description") ?? ""),
      price: String(formData.get("price") ?? ""),
      duration: String(formData.get("duration") ?? ""),
      image,
    });

    setErrors(nextErrors);
    setFormError("");

    if (!service) {
      return;
    }

    setSubmitting(true);

    try {
      const result = await AddService(service);

      if (!result.ok) {
        setFormError(result.message);
        return;
      }

      if (result.data.acknowledged !== true) {
        setFormError("Could not add the service. Please try again.");
        return;
      }

      toast.success("Service added successfully!");
      router.push("/dashboard/admin/manage-services");
    } catch {
      setFormError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-4rem)] w-full justify-center px-4 py-8 md:px-8 md:py-10">
      <div className="w-full max-w-5xl space-y-7">
        {/* Back Navigation */}
        <Button
          variant="ghost"
          onClick={() => router.back()}
          className="gap-2 text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="size-4" />
          Back
        </Button>

        {/* Heading */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-[#d1234c]">
            <Scissors className="size-5" />
            <span className="text-sm font-medium">Service Management</span>
          </div>

          <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
            Add New Service
          </h1>

          <p className="text-sm text-muted-foreground">
            Create a new salon service and make it available for customers.
          </p>
        </div>

        {/* Form */}
        <Card className="border-border/70 shadow-sm">
          <CardHeader className="border-b border-border/60 px-6 py-6 md:px-8">
            <CardTitle className="text-xl">Service Information</CardTitle>

            <CardDescription>
              Enter the details of your new salon service.
            </CardDescription>
          </CardHeader>

          <CardContent className="px-6 py-7 md:px-8 md:py-9">
            <form onSubmit={handleSubmit} noValidate className="space-y-7">
              <FormAlert>{formError}</FormAlert>

              {/* Service Name */}
              <div className="space-y-2">
                <Label htmlFor="serviceName">Service Name</Label>

                <Input
                  id="serviceName"
                  name="serviceName"
                  placeholder="e.g. Hair Styling & Treatment"
                  className="h-11"
                  aria-invalid={Boolean(errors.serviceName)}
                  aria-describedby={
                    errors.serviceName ? "serviceName-error" : undefined
                  }
                  onChange={() => clearError("serviceName")}
                />

                <FieldError id="serviceName-error">
                  {errors.serviceName}
                </FieldError>
              </div>

              {/* Category */}
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>

                <select
                  id="category"
                  name="category"
                  defaultValue=""
                  className="flex h-11 w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus-visible:border-[#d1234c] focus-visible:ring-2 focus-visible:ring-[#d1234c]/20"
                  aria-invalid={Boolean(errors.category)}
                  aria-describedby={
                    errors.category ? "category-error" : undefined
                  }
                  onChange={() => clearError("category")}
                >
                  <option value="" disabled>
                    Select a category
                  </option>
                  <option value="Hair">Hair</option>
                  <option value="Skin">Skin Care</option>
                  <option value="Nails">Nail Care</option>
                  <option value="Makeup">Makeup</option>
                  <option value="Spa">Spa &amp; Massage</option>
                  <option value="Other">Other</option>
                </select>

                <FieldError id="category-error">{errors.category}</FieldError>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>

                <Textarea
                  id="description"
                  name="description"
                  placeholder="Describe the service, its benefits and what customers can expect..."
                  className="min-h-36 resize-y"
                  aria-invalid={Boolean(errors.description)}
                  aria-describedby={
                    errors.description ? "description-error" : undefined
                  }
                  onChange={() => clearError("description")}
                />

                <FieldError id="description-error">
                  {errors.description}
                </FieldError>
              </div>

              {/* Price & Duration */}
              <div className="grid gap-6 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="price">Price (৳)</Label>

                  <div className="relative">
                    <DollarSign className="absolute left-3 top-3.5 size-4 text-muted-foreground" />

                    <Input
                      id="price"
                      name="price"
                      type="number"
                      min="0"
                      placeholder="e.g. 1500"
                      className="h-11 pl-9"
                      aria-invalid={Boolean(errors.price)}
                      aria-describedby={
                        errors.price ? "price-error" : undefined
                      }
                      onChange={() => clearError("price")}
                    />
                  </div>

                  <FieldError id="price-error">{errors.price}</FieldError>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="duration">Duration (minutes)</Label>

                  <div className="relative">
                    <Clock className="absolute left-3 top-3.5 size-4 text-muted-foreground" />

                    <Input
                      id="duration"
                      name="duration"
                      type="number"
                      min="1"
                      placeholder="e.g. 60"
                      className="h-11 pl-9"
                      aria-invalid={Boolean(errors.duration)}
                      aria-describedby={
                        errors.duration ? "duration-error" : undefined
                      }
                      onChange={() => clearError("duration")}
                    />
                  </div>

                  <FieldError id="duration-error">{errors.duration}</FieldError>
                </div>
              </div>

              {/* Image */}
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

                <FieldError id="image-error">{errors.image}</FieldError>
              </div>

              {/* Actions */}
              <div className="flex flex-col-reverse gap-3 border-t border-border/60 pt-6 sm:flex-row sm:justify-end">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.back()}
                  className="cursor-pointer sm:min-w-32"
                >
                  Cancel
                </Button>

                <Button
                  type="submit"
                  disabled={submitting || uploadingImage}
                  aria-busy={submitting}
                  className="cursor-pointer bg-[#d1234c] text-white hover:bg-[#b91f43] sm:min-w-40"
                >
                  {submitting ? (
                    <LoaderCircle className="animate-spin" />
                  ) : null}
                  {submitting ? "Adding..." : "Add Service"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
