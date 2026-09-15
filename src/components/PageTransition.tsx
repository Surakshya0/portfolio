"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

/**
 * An elegant page-load transition: a soft pink veil that lifts away,
 * revealing the content with a gentle fade + rise.
 */
export default function PageTransition({ children }: { children: ReactNode }) {
  return (
    <>
      <motion.div
        aria-hidden
        initial={{ scaleY: 1 }}
        animate={{ scaleY: 0 }}
        transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1], delay: 0.1 }}
        style={{ transformOrigin: "top" }}
        className="pointer-events-none fixed inset-0 z-[70] bg-gradient-to-b from-blush-300 to-blush-500"
      />
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.5 }}
      >
        {children}
      </motion.div>
    </>
  );
}
