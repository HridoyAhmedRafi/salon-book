"use client";

import { useState, type FormEvent } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ImagePlus, LoaderCircle, Pencil } from "lucide-react";
import { toast } from "sonner";

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
import { getValidImageUrl } from "@/lib/image";
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

  const previewImage = getValidImageUrl(image);

  const resetForm = () => {
    setServiceName(service.serviceName);
    setCategory(service.category);
    setDescription(service.description);
    setPrice(String(service.price));
    setDuration(String(service.duration));
    setImage(service.image);
  };

  const handleOpenChange = (nextOpen: boolean) => {
    if (nextOpen) {
      resetForm();
    }

    setOpen(nextOpen);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (submitting) {
      return;
    }

    const nextName = serviceName.trim();
    const nextDescription = description.trim();
    const nextImage = getValidImageUrl(image);
    const nextPrice = Number(price);
    const nextDuration = Number(duration);

    if (!nextName || !nextDescription || !category) {
      toast.error("Please complete every field.");
      return;
    }

    if (!nextImage) {
      toast.error("Enter a valid image URL.");
      return;
    }

    if (!Number.isFinite(nextPrice) || nextPrice < 0) {
      toast.error("Enter a valid price.");
      return;
    }

    if (!Number.isFinite(nextDuration) || nextDuration < 1) {
      toast.error("Enter a valid duration.");
      return;
    }

    setSubmitting(true);

    try {
      await updateService(service._id, {
        serviceName: nextName,
        category,
        description: nextDescription,
        price: nextPrice,
        duration: nextDuration,
        image: nextImage,
      });

      toast.success("Service updated.");
      setOpen(false);
      router.refresh();
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Could not update this service.",
      );
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
        <form onSubmit={handleSubmit} className="space-y-5">
          <DialogHeader>
            <DialogTitle>Edit service</DialogTitle>
            <DialogDescription>
              Update the details customers see when browsing this service.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor={`serviceName-${service._id}`}>Service name</Label>

              <Input
                id={`serviceName-${service._id}`}
                value={serviceName}
                onChange={(event) => setServiceName(event.target.value)}
                className="h-10"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor={`category-${service._id}`}>Category</Label>

              <select
                id={`category-${service._id}`}
                value={category}
                onChange={(event) => setCategory(event.target.value)}
                className={selectClass}
                required
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
            </div>

            <div className="space-y-2">
              <Label htmlFor={`description-${service._id}`}>Description</Label>

              <Textarea
                id={`description-${service._id}`}
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                className="min-h-28 resize-y"
                required
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor={`price-${service._id}`}>Price (৳)</Label>

                <Input
                  id={`price-${service._id}`}
                  type="number"
                  min="0"
                  value={price}
                  onChange={(event) => setPrice(event.target.value)}
                  className="h-10"
                  required
                />
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
                  onChange={(event) => setDuration(event.target.value)}
                  className="h-10"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor={`image-${service._id}`}>Image URL</Label>

              <Input
                id={`image-${service._id}`}
                type="url"
                value={image}
                onChange={(event) => setImage(event.target.value)}
                className="h-10"
                required
              />

              {previewImage ? (
                <div className="relative aspect-video w-full overflow-hidden rounded-lg border border-border bg-muted">
                  <Image
                    src={previewImage}
                    alt="Service preview"
                    fill
                    unoptimized
                    sizes="(max-width: 768px) 100vw, 640px"
                    className="object-cover"
                  />
                </div>
              ) : (
                <div className="flex min-h-32 flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-border bg-muted/30 text-muted-foreground">
                  <ImagePlus className="size-6" />
                  <p className="text-xs">Image preview will appear here</p>
                </div>
              )}
            </div>
          </div>

          <DialogFooter>
            <DialogClose render={<Button type="button" variant="outline" />}>
              Cancel
            </DialogClose>

            <Button
              type="submit"
              disabled={submitting}
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
