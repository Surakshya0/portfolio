"use client";

import { motion } from "framer-motion";
import { Award, ExternalLink } from "lucide-react";
import { certifications, profile } from "@/lib/data";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";

const certsUrl =
  profile.socials.find((s) => s.label === "Certificates")?.href ?? "#";

export default function Certifications() {
  return (
    <section id="certifications" className="section-pad relative">
      <div className="container-tight">
        <SectionHeading
          eyebrow="Certifications"
          title="Credentials & continuous learning"
          intro="Certifications that back up my skills across development, testing, and programming."
        />

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {certifications.map((c, i) => (
            <Reveal key={c.title} direction="up" delay={(i % 3) * 0.08}>
              <motion.div
                whileHover={{ y: -6 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="group relative flex h-full items-center gap-4 overflow-hidden rounded-3xl glass p-6 shadow-glass"
              >
                <div className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-blush-300/40 blur-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-blush-400 to-blush-600 text-white shadow-glow">
                  <Award className="h-7 w-7" />
                </span>
                <div className="min-w-0">
                  <h3 className="font-display text-lg font-semibold text-blush-900">
                    {c.title}
                  </h3>
                  <p className="text-sm text-blush-900/55">{c.subtitle}</p>
                </div>
              </motion.div>
            </Reveal>
          ))}
        </div>

        <Reveal direction="up" delay={0.1}>
          <div className="mt-10 flex justify-center">
            <a
              href={certsUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full glass px-6 py-3 text-sm font-semibold text-blush-700 shadow-glass transition-colors hover:bg-white/70"
            >
              <ExternalLink className="h-4 w-4" /> View all certificates
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
