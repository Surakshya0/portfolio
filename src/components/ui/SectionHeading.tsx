"use client";

import { motion } from "framer-motion";
import Reveal from "./Reveal";

/**
 * Consistent section header: eyebrow pill + animated gradient title + optional intro.
 */
export default function SectionHeading({
  eyebrow,
  title,
  intro,
  align = "center",
}: {
  eyebrow: string;
  title: string;
  intro?: string;
  align?: "center" | "left";
}) {
  const alignment =
    align === "center" ? "items-center text-center" : "items-start text-left";

  return (
    <div className={`flex flex-col ${alignment} gap-5`}>
      <Reveal direction="up">
        <span className="eyebrow">
          <span className="h-1.5 w-1.5 rounded-full bg-blush-500" />
          {eyebrow}
        </span>
      </Reveal>

      <Reveal direction="up" delay={0.08}>
        <h2 className="max-w-3xl font-display text-4xl font-semibold leading-[1.1] text-blush-900 sm:text-5xl md:text-6xl">
          {title}
        </h2>
      </Reveal>

      {intro && (
        <Reveal direction="up" delay={0.16}>
          <p
            className={`max-w-2xl text-base leading-relaxed text-blush-900/60 sm:text-lg ${
              align === "center" ? "mx-auto" : ""
            }`}
          >
            {intro}
          </p>
        </Reveal>
      )}

      <motion.div
        aria-hidden
        initial={{ scaleX: 0, opacity: 0 }}
        whileInView={{ scaleX: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
        className={`h-px w-24 origin-left bg-gradient-to-r from-blush-400 to-transparent ${
          align === "center" ? "mx-auto" : ""
        }`}
      />
    </div>
  );
}
