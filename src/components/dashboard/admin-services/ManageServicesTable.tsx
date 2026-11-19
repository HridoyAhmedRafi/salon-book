import Image from "next/image";
import { ImageOff, Scissors } from "lucide-react";

import { StatusBadge } from "@/components/dashboard/shared/StatusBadge";
import { formatDate, formatPrice } from "@/lib/format";
import { getValidImageUrl } from "@/lib/image";
import type { IAdminService } from "@/types/admin-service";

import { DeleteServiceButton } from "./DeleteServiceButton";
import { EditServiceButton } from "./EditServiceButton";
import { ToggleServiceStatusButton } from "./ToggleServiceStatusButton";

export interface ManageServicesTableProps {
  services: IAdminService[];
}

function EmptyServices() {
  return (
    <div className="flex min-h-64 flex-col items-center justify-center rounded-xl border border-dashed border-border px-6 text-center">
      <span className="mb-3 flex size-12 items-center justify-center rounded-full bg-muted text-muted-foreground">
        <Scissors className="size-6" />
      </span>

      <h2 className="text-lg font-semibold">No services yet</h2>

      <p className="mt-1 max-w-sm text-sm text-muted-foreground">
        Add your first service to make it available for customers to book.
      </p>
    </div>
  );
}

/**
 * Admin table of every service, including inactive ones.
 */
export function ManageServicesTable({ services }: ManageServicesTableProps) {
  if (services.length === 0) {
    return <EmptyServices />;
  }

  return (
    <div className="overflow-hidden rounded-xl border border-border bg-card">
      <div className="overflow-x-auto">
        <table className="w-full min-w-5xl text-left text-sm">
          <thead className="bg-muted/50 text-[11px] tracking-wider text-muted-foreground uppercase">
            <tr>
              <th scope="col" className="px-5 py-3 font-semibold">
                Service
              </th>
              <th scope="col" className="px-5 py-3 font-semibold">
                Category
              </th>
              <th scope="col" className="px-5 py-3 font-semibold">
                Price
              </th>
              <th scope="col" className="px-5 py-3 font-semibold">
                Duration
              </th>
              <th scope="col" className="px-5 py-3 font-semibold">
                Status
              </th>
              <th scope="col" className="px-5 py-3 font-semibold">
                Created
              </th>
              <th scope="col" className="px-5 py-3 text-right font-semibold">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-border">
            {services.map((service) => {
              const imageUrl = getValidImageUrl(service.image);

              return (
                <tr key={service._id} className="align-middle">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="relative size-12 shrink-0 overflow-hidden rounded-lg bg-muted">
                        {imageUrl ? (
                          <Image
                            src={imageUrl}
                            alt={service.serviceName}
                            fill
                            unoptimized
                            sizes="48px"
                            className="object-cover"
                          />
                        ) : (
                          <div className="flex size-full items-center justify-center text-muted-foreground">
                            <ImageOff className="size-4" />
                          </div>
                        )}
                      </div>

                      <div className="min-w-0">
                        <p className="max-w-64 truncate font-medium">
                          {service.serviceName}
                        </p>

                        <p className="max-w-64 truncate text-xs text-muted-foreground">
                          {service.description}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="px-5 py-4">
                    <StatusBadge tone="neutral">{service.category}</StatusBadge>
                  </td>

                  <td className="px-5 py-4 font-medium">
                    {formatPrice(service.price)}
                  </td>

                  <td className="px-5 py-4 whitespace-nowrap text-muted-foreground">
                    {service.duration} min
                  </td>

                  <td className="px-5 py-4">
                    <StatusBadge
                      tone={service.status === "active" ? "success" : "neutral"}
                    >
                      {service.status === "active" ? "Active" : "Inactive"}
                    </StatusBadge>
                  </td>

                  <td className="px-5 py-4 whitespace-nowrap text-muted-foreground">
                    {formatDate(service.postedAt)}
                  </td>

                  <td className="px-5 py-4">
                    <div className="flex items-center justify-end gap-1.5 whitespace-nowrap">
                      <EditServiceButton service={service} />
                      <ToggleServiceStatusButton service={service} />
                      <DeleteServiceButton service={service} />
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
