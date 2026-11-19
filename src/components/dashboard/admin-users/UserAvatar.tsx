import Image from "next/image";

import { getValidImageUrl } from "@/lib/image";
import { cn } from "@/lib/utils";

export interface UserAvatarProps {
  name: string;
  image?: string | null;
  /** Larger variant used inside detail dialogs. */
  large?: boolean;
}

function getInitials(name: string) {
  const initials = name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");

  return initials || "?";
}

/**
 * Customer avatar with a readable initials fallback.
 */
export function UserAvatar({ name, image, large }: UserAvatarProps) {
  const imageUrl = getValidImageUrl(image);

  return (
    <div
      className={cn(
        "relative flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-primary/10 font-semibold text-primary",
        large ? "size-14 text-base" : "size-10 text-xs",
      )}
    >
      {imageUrl ? (
        <Image
          src={imageUrl}
          alt={name}
          fill
          unoptimized
          sizes={large ? "56px" : "40px"}
          className="object-cover"
        />
      ) : (
        getInitials(name)
      )}
    </div>
  );
}
