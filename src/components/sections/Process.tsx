"use client";

import { motion } from "framer-motion";
import {
  Search,
  PenTool,
  Palette,
  Code2,
  TestTube,
  Rocket,
  type LucideIcon,
} from "lucide-react";
import { process } from "@/lib/data";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";

const icons: LucideIcon[] = [Search, PenTool, Palette, Code2, TestTube, Rocket];

export default function Process() {
  return (
    <section id="process" className="section-pad relative">
      <div className="container-tight">
        <SectionHeading
          eyebrow="How I Work"
          title="My development process"
          intro="A repeatable workflow that takes an idea from research all the way to a deployed, tested product."
        />

        <div className="relative mt-16">
          {/* Connecting line (desktop) */}
          <div className="absolute left-0 right-0 top-8 hidden h-px bg-gradient-to-r from-transparent via-blush-300 to-transparent lg:block" />

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-6">
            {process.map((p, i) => {
              const Icon = icons[i % icons.length];
              return (
                <Reveal key={p.step} direction="up" delay={i * 0.08}>
                  <div className="relative flex flex-col items-center text-center">
                    <motion.span
                      whileHover={{ scale: 1.08, rotate: 4 }}
                      className="relative z-10 grid h-16 w-16 place-items-center rounded-2xl bg-gradient-to-br from-blush-400 to-blush-600 text-white shadow-glow"
                    >
                      <Icon className="h-7 w-7" />
                      <span className="absolute -right-1.5 -top-1.5 grid h-6 w-6 place-items-center rounded-full bg-white text-[11px] font-bold text-blush-600 shadow-glass">
                        {i + 1}
                      </span>
                    </motion.span>
                    <h3 className="mt-4 font-display text-base font-semibold text-blush-900">
                      {p.step}
                    </h3>
                    <p className="mt-1 text-xs leading-relaxed text-blush-900/55">
                      {p.description}
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
