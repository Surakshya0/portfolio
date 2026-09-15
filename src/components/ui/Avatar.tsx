"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * Circular avatar that falls back to a tasteful monogram when no
 * image is provided — so the site never shows a broken image.
 */
export default function Avatar({
  src,
  name,
  size = 160,
  className,
  priority,
}: {
  src?: string;
  name: string;
  size?: number;
  className?: string;
  priority?: boolean;
}) {
  const initials = name
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  if (!src) {
    return (
      <div
        style={{ width: size, height: size }}
        className={cn(
          "grid place-items-center rounded-full bg-gradient-to-br from-blush-300 via-blush-400 to-blush-600 font-display font-semibold text-white",
          className
        )}
      >
        <span style={{ fontSize: size * 0.32 }}>{initials}</span>
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={name}
      width={size}
      height={size}
      priority={priority}
      className={cn("rounded-full object-cover", className)}
    />
  );
}
