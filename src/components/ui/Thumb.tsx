"use client";

import Image from "next/image";
import { ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";

const gradients = [
  "from-blush-200 via-petal to-blush-300",
  "from-blush-300 via-white to-blush-200",
  "from-rose-100 via-petal to-blush-300",
  "from-blush-200 via-blush-100 to-blush-300",
];

/**
 * Media thumbnail that renders an image when available, otherwise a
 * soft gradient placeholder labelled "Preview coming soon".
 */
export default function Thumb({
  src,
  label,
  index = 0,
  className,
  fit = "cover",
}: {
  src?: string;
  label: string;
  index?: number;
  className?: string;
  fit?: "cover" | "contain";
}) {
  if (src) {
    return (
      <div
        className={cn(
          "relative",
          // Soft backdrop so a fully-contained (letterboxed) image looks intentional.
          fit === "contain" &&
            "bg-gradient-to-br from-blush-100 via-white to-petal p-2",
          className
        )}
      >
        <Image
          src={src}
          alt={label}
          fill
          sizes="(max-width:768px) 100vw, 50vw"
          className={fit === "contain" ? "object-contain" : "object-cover"}
        />
      </div>
    );
  }

  return (
    <div
      className={cn(
        "relative grid place-items-center overflow-hidden bg-gradient-to-br",
        gradients[index % gradients.length],
        className
      )}
    >
      {/* Decorative orbs */}
      <div className="pointer-events-none absolute -left-8 -top-8 h-24 w-24 rounded-full bg-white/50 blur-2xl" />
      <div className="pointer-events-none absolute -bottom-10 -right-6 h-28 w-28 rounded-full bg-blush-300/50 blur-2xl" />

      <div className="relative z-10 flex flex-col items-center gap-2 text-center">
        <span className="grid h-12 w-12 place-items-center rounded-2xl bg-white/70 text-blush-500 shadow-glass backdrop-blur">
          <ImageIcon className="h-5 w-5" />
        </span>
        <span className="font-display text-lg font-semibold text-blush-800/90">
          {label}
        </span>
        <span className="text-xs font-medium uppercase tracking-[0.2em] text-blush-500/80">
          Preview coming soon
        </span>
      </div>
    </div>
  );
}
