"use client";

import { motion } from "framer-motion";
import {
  Palette,
  BookOpen,
  Code2,
  Sparkles,
  Puzzle,
  GraduationCap,
  Wand2,
  type LucideIcon,
} from "lucide-react";
import { hobbies } from "@/lib/data";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";

const icons: LucideIcon[] = [
  Palette,
  BookOpen,
  Code2,
  Sparkles,
  Puzzle,
  GraduationCap,
  Wand2,
];

export default function Hobbies() {
  return (
    <section id="hobbies" className="section-pad relative">
      <div className="container-tight">
        <SectionHeading
          eyebrow="Beyond Code"
          title="Hobbies & interests"
          intro="What keeps me curious and creative when I step away from the keyboard."
        />

        <div className="mt-14 flex flex-wrap justify-center gap-4">
          {hobbies.map((h, i) => {
            const Icon = icons[i % icons.length];
            return (
              <Reveal key={h.title} direction="up" delay={(i % 4) * 0.06}>
                <motion.div
                  whileHover={{ y: -5, scale: 1.03 }}
                  transition={{ type: "spring", stiffness: 320, damping: 20 }}
                  className="group flex items-center gap-3 rounded-full glass px-5 py-3 shadow-glass"
                >
                  <span className="grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-blush-400 to-blush-600 text-white shadow-glow">
                    <Icon className="h-4 w-4" />
                  </span>
                  <span className="font-medium text-blush-800">{h.title}</span>
                </motion.div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
