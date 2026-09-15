"use client";

import {
  motion,
  useMotionValue,
  useSpring,
  useReducedMotion,
} from "framer-motion";
import { ReactNode, useRef } from "react";
import { cn } from "@/lib/utils";

/**
 * A button/link that gently "sticks" to the cursor on hover.
 * Renders as an <a> when `href` is provided, otherwise a <button>.
 */
export default function MagneticButton({
  children,
  href,
  onClick,
  variant = "primary",
  className,
  download,
  target,
}: {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "ghost";
  className?: string;
  download?: boolean;
  target?: string;
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 200, damping: 15 });
  const springY = useSpring(y, { stiffness: 200, damping: 15 });

  const handleMove = (e: React.MouseEvent) => {
    if (reduce || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const mx = e.clientX - (rect.left + rect.width / 2);
    const my = e.clientY - (rect.top + rect.height / 2);
    x.set(mx * 0.35);
    y.set(my * 0.35);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  const base =
    "shimmer relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full px-7 py-3.5 text-sm font-semibold tracking-wide transition-colors duration-300";
  const styles =
    variant === "primary"
      ? "bg-gradient-to-r from-blush-500 to-blush-400 text-white shadow-glow hover:from-blush-600 hover:to-blush-500"
      : "glass text-blush-700 hover:bg-white/70";

  const inner = (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      style={{ x: springX, y: springY }}
      whileTap={{ scale: 0.96 }}
      className="inline-flex"
    >
      {href ? (
        <a
          href={href}
          onClick={onClick}
          download={download}
          target={target}
          rel={target === "_blank" ? "noreferrer" : undefined}
          className={cn(base, styles, className)}
        >
          {children}
        </a>
      ) : (
        <button onClick={onClick} className={cn(base, styles, className)}>
          {children}
        </button>
      )}
    </motion.div>
  );

  return inner;
}
