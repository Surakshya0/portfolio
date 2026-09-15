"use client";

import { motion } from "framer-motion";
import {
  Layout,
  Server,
  Database,
  Boxes,
  Palette,
  Wrench,
  FlaskConical,
  BrainCircuit,
  Layers,
  type LucideIcon,
} from "lucide-react";
import { skills } from "@/lib/data";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";

const icons: Record<string, LucideIcon> = {
  Stacks: Layers,
  Frontend: Layout,
  Backend: Server,
  Database: Database,
  "AI / ML": BrainCircuit,
  Frameworks: Boxes,
  "UI / UX": Palette,
  Tools: Wrench,
  Testing: FlaskConical,
};

export default function Skills() {
  return (
    <section id="skills" className="section-pad relative">
      <div className="container-tight">
        <SectionHeading
          eyebrow="Skills & Tools"
          title="My full-stack toolkit"
          intro="The languages, frameworks, and tools I use to build, test, and ship web applications."
        />

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {skills.map((group, gi) => {
            const Icon = icons[group.category] ?? Boxes;
            return (
            <Reveal key={group.category} direction="up" delay={gi * 0.08}>
              <motion.div
                whileHover={{ y: -8 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="group relative h-full overflow-hidden rounded-3xl glass p-6 shadow-glass"
              >
                {/* Hover glow */}
                <div className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-blush-300/40 blur-2xl transition-opacity duration-500 group-hover:opacity-100 opacity-0" />

                <div className="mb-5 flex items-center gap-3">
                  <span className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-blush-400 to-blush-600 text-white shadow-glow">
                    <Icon className="h-5 w-5" />
                  </span>
                  <h3 className="font-display text-xl font-semibold text-blush-800">
                    {group.category}
                  </h3>
                </div>

                <ul className="flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className="rounded-full border border-blush-200/70 bg-white/60 px-3 py-1.5 text-sm font-medium text-blush-700 transition-colors duration-300 hover:border-blush-400 hover:bg-blush-100"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
