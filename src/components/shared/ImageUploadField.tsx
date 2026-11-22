"use client";

import { useId, useRef, useState, type ChangeEvent } from "react";
import Image from "next/image";
import { ImagePlus, LoaderCircle, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  ACCEPTED_IMAGE_TYPES,
  uploadImageToImgbb,
  validateImageFile,
} from "@/lib/apis/upload/imgbb";
import { getValidImageUrl } from "@/lib/image";

export interface ImageUploadFieldProps {
  /** Current image URL. Pass an empty string when there is no image. */
  value: string;
  /** Called with the uploaded URL, or an empty string when removed. */
  onChange: (value: string) => void;
  label?: string;
  description?: string;
  /** Renders a wide preview above the controls. Defaults to true. */
  showPreview?: boolean;
  required?: boolean;
  disabled?: boolean;
  /** Lets the parent form disable submit while an upload is in progress. */
  onUploadingChange?: (uploading: boolean) => void;
  /**
   * Defers the upload to the caller: the selected file is validated and reported
   * here instead of being sent to the server. Used by sign-up, where no session
   * exists yet, so the file is uploaded after the account is created.
   */
  onFileSelected?: (file: File | null) => void;
}

/**
 * File picker that uploads an image to ImgBB and reports the resulting URL.
 * Keeps the form state URL-based, so callers store exactly what they did before.
 * Pass `onFileSelected` to collect the file and upload it later instead.
 */
export function ImageUploadField({
  value,
  onChange,
  label,
  description,
  showPreview = true,
  required,
  disabled,
  onUploadingChange,
  onFileSelected,
}: ImageUploadFieldProps) {
  const inputId = useId();
  const inputRef = useRef<HTMLInputElement>(null);

  const deferred = Boolean(onFileSelected);
  const [uploading, setUploading] = useState(false);
  const [pendingFile, setPendingFile] = useState<File | null>(null);
  const [error, setError] = useState("");

  const previewUrl = getValidImageUrl(value);
  const busy = uploading || disabled;
  const hasImage = deferred ? Boolean(pendingFile) : Boolean(previewUrl);

  const setUploadingState = (nextUploading: boolean) => {
    setUploading(nextUploading);
    onUploadingChange?.(nextUploading);
  };

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    // Allow selecting the same file again after a failure.
    event.target.value = "";

    if (!file) {
      return;
    }

    const validationError = validateImageFile(file);

    if (validationError) {
      setError(validationError);
      return;
    }

    setError("");

    if (deferred) {
      setPendingFile(file);
      onFileSelected?.(file);
      return;
    }

    setUploadingState(true);

    try {
      const imageUrl = await uploadImageToImgbb(file);
      onChange(imageUrl);
    } catch (uploadError) {
      setError(
        uploadError instanceof Error
          ? uploadError.message
          : "Could not upload the image. Please try again.",
      );
    } finally {
      setUploadingState(false);
    }
  };

  const handleRemove = () => {
    setError("");

    if (deferred) {
      setPendingFile(null);
      onFileSelected?.(null);
    }

    onChange("");
  };

  return (
    <div className="space-y-3">
      {label ? (
        <Label htmlFor={inputId}>
          {label}
          {required ? (
            <span aria-hidden className="text-destructive">
              *
            </span>
          ) : null}
        </Label>
      ) : null}

      {showPreview ? (
        previewUrl ? (
          <div className="relative aspect-video w-full overflow-hidden rounded-lg border border-border bg-muted">
            <Image
              src={previewUrl}
              alt="Selected image preview"
              fill
              unoptimized
              sizes="(max-width: 768px) 100vw, 640px"
              className="object-cover"
            />
          </div>
        ) : (
          <div className="flex min-h-40 flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-border bg-muted/30 px-6 text-center text-muted-foreground">
            <ImagePlus className="size-8" />
            <p className="text-sm">No image selected</p>
          </div>
        )
      ) : null}

      <div className="flex flex-wrap items-center gap-2">
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => inputRef.current?.click()}
          disabled={busy}
          className="cursor-pointer"
        >
          {uploading ? (
            <LoaderCircle className="animate-spin" />
          ) : (
            <ImagePlus />
          )}
          {uploading
            ? "Uploading..."
            : hasImage
              ? "Change image"
              : "Upload image"}
        </Button>

        {hasImage ? (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={handleRemove}
            disabled={busy}
            className="cursor-pointer text-muted-foreground hover:text-destructive"
          >
            <Trash2 />
            Remove
          </Button>
        ) : null}
      </div>

      {deferred && pendingFile ? (
        <p className="text-xs text-muted-foreground">
          Selected: <span className="text-foreground">{pendingFile.name}</span>. It
          will be uploaded when you submit the form.
        </p>
      ) : null}

      <input
        ref={inputRef}
        id={inputId}
        type="file"
        accept={ACCEPTED_IMAGE_TYPES.join(",")}
        onChange={handleFileChange}
        disabled={busy}
        className="sr-only"
      />

      {description ? (
        <p className="text-xs text-muted-foreground">{description}</p>
      ) : null}

      {error ? (
        <p role="alert" aria-live="polite" className="text-xs text-destructive">
          {error}
        </p>
      ) : null}
    </div>
  );
}
