"use client";

import { motion } from "framer-motion";
import { GraduationCap, MapPin } from "lucide-react";
import { education } from "@/lib/data";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";

export default function EducationSection() {
  return (
    <section id="education" className="section-pad relative">
      <div className="container-tight">
        <SectionHeading
          eyebrow="Education"
          title="Academic background"
          intro="The academic foundation behind my work in software development."
        />

        <div className="mt-16 grid gap-6 md:grid-cols-2">
          {education.map((item, i) => (
            <Reveal key={item.degree} direction="up" delay={i * 0.1}>
              <motion.div
                whileHover={{ y: -6 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="group relative h-full overflow-hidden rounded-3xl glass p-7 shadow-glass"
              >
                <div className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-blush-300/40 blur-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                <div className="flex items-start justify-between gap-4">
                  <span className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-blush-400 to-blush-600 text-white shadow-glow">
                    <GraduationCap className="h-6 w-6" />
                  </span>
                  <span className="rounded-full border border-blush-200/70 bg-white/60 px-3 py-1 text-xs font-semibold text-blush-600">
                    {item.period}
                  </span>
                </div>

                <h3 className="mt-5 font-display text-xl font-semibold text-blush-900">
                  {item.degree}
                </h3>
                <p className="mt-1 text-sm font-medium text-blush-600">
                  {item.school}
                </p>
                <p className="mt-2 flex items-center gap-1.5 text-sm text-blush-900/55">
                  <MapPin className="h-4 w-4" /> {item.location}
                </p>

                {item.note && (
                  <span className="mt-4 inline-flex rounded-full bg-blush-100 px-3 py-1 text-xs font-semibold text-blush-700">
                    {item.note}
                  </span>
                )}
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
