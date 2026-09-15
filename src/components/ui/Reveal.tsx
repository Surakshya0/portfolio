"use client";

import { motion, useReducedMotion, type Variant } from "framer-motion";
import { ReactNode } from "react";

type Direction = "up" | "down" | "left" | "right" | "none";

const offset: Record<Direction, { x: number; y: number }> = {
  up: { x: 0, y: 40 },
  down: { x: 0, y: -40 },
  left: { x: 40, y: 0 },
  right: { x: -40, y: 0 },
  none: { x: 0, y: 0 },
};

/**
 * Fade + slide element into view on scroll. Respects reduced-motion.
 */
export default function Reveal({
  children,
  direction = "up",
  delay = 0,
  className,
  once = true,
}: {
  children: ReactNode;
  direction?: Direction;
  delay?: number;
  className?: string;
  once?: boolean;
}) {
  const reduce = useReducedMotion();
  const { x, y } = reduce ? offset.none : offset[direction];

  const hidden: Variant = { opacity: 0, x, y, filter: "blur(6px)" };
  const visible: Variant = {
    opacity: 1,
    x: 0,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.75,
      delay,
      ease: [0.22, 1, 0.36, 1],
    },
  };

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: 0.25 }}
      variants={{ hidden, visible }}
    >
      {children}
    </motion.div>
  );
}
