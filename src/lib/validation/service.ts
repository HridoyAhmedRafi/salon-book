import { getValidImageUrl } from "@/lib/image";
import type { IService } from "@/types/service";

export interface ServiceFormValues {
  serviceName: string;
  category: string;
  description: string;
  price: string;
  duration: string;
  image: string;
}

export type ServiceFormErrors = Partial<
  Record<keyof ServiceFormValues, string>
>;

export interface ServiceValidationResult {
  errors: ServiceFormErrors;
  service: IService | null;
}

/**
 * Validates the shared add/edit service fields. Prices are whole Taka amounts
 * above zero and durations are whole minutes.
 */
export function validateServiceValues(
  values: ServiceFormValues,
): ServiceValidationResult {
  const errors: ServiceFormErrors = {};

  const serviceName = values.serviceName.trim();
  const category = values.category.trim();
  const description = values.description.trim();
  const image = getValidImageUrl(values.image);
  const price = Number(values.price.trim());
  const duration = Number(values.duration.trim());

  if (!serviceName) {
    errors.serviceName = "Enter a service name.";
  }

  if (!category) {
    errors.category = "Choose a category.";
  }

  if (!description) {
    errors.description = "Enter a short description.";
  }

  if (!values.price.trim() || !Number.isFinite(price) || price <= 0) {
    errors.price = "Enter a price greater than 0.";
  }

  if (
    !values.duration.trim() ||
    !Number.isFinite(duration) ||
    !Number.isInteger(duration) ||
    duration < 1
  ) {
    errors.duration = "Enter a duration of at least 1 minute.";
  }

  if (!image) {
    errors.image = "Upload a service image.";
  }

  if (Object.keys(errors).length > 0) {
    return { errors, service: null };
  }

  return {
    errors,
    service: {
      serviceName,
      category,
      description,
      price,
      duration,
      image: image as string,
    },
  };
}
