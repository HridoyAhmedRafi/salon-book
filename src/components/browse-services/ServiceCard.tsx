
import Image from "next/image";
import Link from "next/link";
import { Clock, ArrowRight } from "lucide-react";

import { IServicePost } from "@/types/service";

interface ServiceCardProps {
  service: IServicePost;
}

const ServiceCard = ({ service }: ServiceCardProps) => {
  return (
    <div className="group overflow-hidden rounded-lg border border-border bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      {/* Service Image */}
      <div className="relative aspect-[16/8] overflow-hidden bg-muted">
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
          <div className="flex h-full items-center justify-center text-xs text-muted-foreground">
            No Image Available
          </div>
        )}

        <span className="absolute left-2 top-2 rounded-full bg-white/95 px-2.5 py-0.5 text-[10px] font-medium text-[#d2a01f] shadow-sm">
          {service.category}
        </span>
      </div>

      {/* Service Information */}
      <div className="space-y-2 p-2.5">
        <div className="space-y-1">
          <h2 className="line-clamp-1 text-sm font-semibold transition-colors group-hover:text-[#d2a01f]">
            {service.serviceName}
          </h2>

          <p className="line-clamp-2 min-h-8 text-xs leading-4 text-muted-foreground">
            {service.description}
          </p>
        </div>

        {/* Price and Duration */}
        <div className="flex items-center justify-between border-t border-border pt-2">
          <div>
            <p className="text-[10px] text-muted-foreground">Price</p>
            <p className="text-base font-bold text-[#d2a01f]">
              ৳{service.price}
            </p>
          </div>

          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Clock className="size-3.5" />
            <span>{service.duration} min</span>
          </div>
        </div>

        {/* View Details */}
        <Link
          href={`/services/${service._id}`}
          className="flex h-8 w-full items-center justify-center gap-1.5 rounded-md bg-[#d2a01f] px-3 text-xs font-medium text-white transition-colors hover:bg-[#b88712]"
        >
          View Details
          <ArrowRight className="size-3.5" />
        </Link>
      </div>
    </div>
  );
};

export default ServiceCard;
