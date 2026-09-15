"use client";

import { motion } from "framer-motion";
import { Eye, Figma, FileText } from "lucide-react";
import { uiDesigns } from "@/lib/data";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import Thumb from "@/components/ui/Thumb";

export default function UIDesign() {
  return (
    <section id="design" className="section-pad relative">
      <div className="container-tight">
        <SectionHeading
          eyebrow="UI / UX Design"
          title="My design portfolio"
          intro="Beyond code, I design the experience first. Screenshots are on the way — here's the range of work I create."
        />

        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {uiDesigns.map((d, i) => (
            <Reveal key={d.title} direction="up" delay={(i % 3) * 0.08}>
              <motion.div
                whileHover={{ y: -8 }}
                transition={{ type: "spring", stiffness: 280, damping: 20 }}
                className="group flex h-full flex-col overflow-hidden rounded-[1.75rem] glass p-3 shadow-glass"
              >
                <div className="overflow-hidden rounded-[1.4rem]">
                  <div className="transition-transform duration-700 ease-out group-hover:scale-[1.05]">
                    <Thumb src={undefined} label={d.title} index={i} className="aspect-[4/3]" />
                  </div>
                </div>

                <div className="flex flex-1 flex-col px-3 pb-3 pt-4">
                  <h3 className="font-display text-lg font-semibold text-blush-900">
                    {d.title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-blush-900/55">
                    {d.description}
                  </p>

                  <div className="mt-auto flex flex-wrap gap-2 pt-4">
                    {[
                      { icon: Eye, label: "View Design" },
                      { icon: Figma, label: "Open Figma" },
                      { icon: FileText, label: "Case Study" },
                    ].map(({ icon: Icon, label }) => (
                      <button
                        key={label}
                        className="inline-flex items-center gap-1.5 rounded-full border border-blush-200/70 bg-white/60 px-3 py-1.5 text-xs font-semibold text-blush-700 transition-all duration-300 hover:-translate-y-0.5 hover:border-blush-400 hover:bg-blush-100"
                      >
                        <Icon className="h-3.5 w-3.5" />
                        {label}
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
