"use client";

import { motion } from "framer-motion";
import {
  Layers,
  Palette,
  Code2,
  Smartphone,
  Lightbulb,
  Rocket,
  Users,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import { reasons } from "@/lib/data";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";

const icons: LucideIcon[] = [
  Layers,
  Palette,
  Code2,
  Smartphone,
  Lightbulb,
  Rocket,
  Users,
  Sparkles,
];

export default function WhyWorkWithMe() {
  return (
    <section id="why" className="section-pad relative">
      <div className="container-tight">
        <SectionHeading
          eyebrow="Why Work With Me"
          title="What I bring to your team"
          intro="Full-stack engineering skills, a user-first mindset, and the habits that make teamwork easy."
        />

        <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {reasons.map((r, i) => {
            const Icon = icons[i % icons.length];
            return (
              <Reveal key={r.title} direction="up" delay={(i % 4) * 0.07}>
                <motion.div
                  whileHover={{ y: -8 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="group relative h-full overflow-hidden rounded-3xl glass p-6 shadow-glass"
                >
                  <div className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-blush-300/40 blur-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  <span className="grid h-12 w-12 place-items-center rounded-2xl bg-white/70 text-blush-500 shadow-glass transition-colors duration-300 group-hover:bg-gradient-to-br group-hover:from-blush-400 group-hover:to-blush-600 group-hover:text-white">
                    <Icon className="h-6 w-6" />
                  </span>
                  <h3 className="mt-4 font-display text-lg font-semibold text-blush-900">
                    {r.title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-blush-900/55">
                    {r.description}
                  </p>
                </motion.div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
