import Image from "next/image";
import Link from "next/link";
import { Clock, ArrowRight } from "lucide-react";

import { IServicePost } from "@/types/service";

interface ServiceCardProps {
  service: IServicePost;
}

const ServiceCard = ({ service }: ServiceCardProps) => {
  return (
    <div className="group overflow-hidden rounded-xl border border-border bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      {/* Service Image */}
      <div className="relative aspect-16/10 overflow-hidden bg-muted">
        {service.image ? (
          <Image
            src={service.image}
            alt={service.serviceName}
            fill
            unoptimized
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-muted-foreground">
            No Image Available
          </div>
        )}

        <span className="absolute left-3 top-3 rounded-full bg-white/95 px-3 py-1 text-xs font-medium text-[#d2a01f] shadow-sm">
          {service.category}
        </span>
      </div>

      {/* Service Information */}
      <div className="space-y-1 p-5">
        <div className="space-y-1">
          <h2 className="line-clamp-1 text-lg font-semibold transition-colors group-hover:text-[#d2a01f]">
            {service.serviceName}
          </h2>

          <p className="line-clamp-2 min-h-10 text-sm leading-5 text-muted-foreground">
            {service.description}
          </p>
        </div>

        {/* Price and Duration */}
        <div className="flex items-center justify-between border-t border-border pt-4">
          <div>
            <p className="text-xs text-muted-foreground">Price</p>
            <p className="text-xl font-bold text-[#d2a01f]">৳{service.price}</p>
          </div>

          <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <Clock className="size-4" />
            <span>{service.duration} min</span>
          </div>
        </div>

        {/* View Details */}
        <Link
          href={`/services/${service._id}`}
          className="flex h-10 w-full items-center justify-center gap-2 rounded-md bg-[#d2a01f] px-4 text-sm font-medium text-white transition-colors hover:bg-[#b88712]"
        >
          View Details
          <ArrowRight className="size-4" />
        </Link>
      </div>
    </div>
  );
};

export default ServiceCard;
