"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Award, ExternalLink, Maximize2 } from "lucide-react";
import { certifications, profile } from "@/lib/data";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import Thumb from "@/components/ui/Thumb";
import Lightbox from "@/components/ui/Lightbox";

const gallery = certifications.map((c) => ({
  src: c.image,
  caption: `${c.title} Project Presentation — “${c.topic}” · ${c.date}`,
}));

export default function Certifications() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="certifications" className="section-pad relative">
      <div className="container-tight">
        <SectionHeading
          eyebrow="Certifications"
          title="Credentials & continuous learning"
          intro="Certificates from my BCA project presentations across development, testing, and programming. Click any certificate to view it full size."
        />

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {certifications.map((c, i) => (
            <Reveal key={c.title} direction="up" delay={(i % 3) * 0.08}>
              <motion.button
                type="button"
                onClick={() => setOpenIndex(i)}
                aria-label={`View ${c.title} certificate`}
                whileHover={{ y: -6 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="group relative flex h-full w-full flex-col overflow-hidden rounded-3xl glass text-left shadow-glass"
              >
                <div className="relative overflow-hidden">
                  <Thumb
                    src={c.image}
                    label={`${c.title} certificate`}
                    className="aspect-[4/3] transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                  <span className="absolute inset-0 grid place-items-center bg-blush-900/0 transition-colors duration-300 group-hover:bg-blush-900/35">
                    <span className="inline-flex items-center gap-2 rounded-full bg-white/90 px-4 py-2 text-sm font-semibold text-blush-700 opacity-0 shadow-glass transition-opacity duration-300 group-hover:opacity-100">
                      <Maximize2 className="h-4 w-4" /> View certificate
                    </span>
                  </span>
                </div>

                <div className="flex items-center gap-4 p-5">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-blush-400 to-blush-600 text-white shadow-glow">
                    <Award className="h-5 w-5" />
                  </span>
                  <div className="min-w-0">
                    <h3 className="font-display text-lg font-semibold text-blush-900">
                      {c.title}
                    </h3>
                    <p className="text-sm text-blush-900/55">
                      {c.topic} · {c.date}
                    </p>
                  </div>
                </div>
              </motion.button>
            </Reveal>
          ))}
        </div>

        <Reveal direction="up" delay={0.1}>
          <div className="mt-10 flex justify-center">
            <a
              href={profile.certificatesUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full glass px-6 py-3 text-sm font-semibold text-blush-700 shadow-glass transition-colors hover:bg-white/70"
            >
              <ExternalLink className="h-4 w-4" /> View all certificates
            </a>
          </div>
        </Reveal>
      </div>

      <AnimatePresence>
        {openIndex !== null && (
          <Lightbox
            title="Certificates"
            images={gallery}
            startIndex={openIndex}
            onClose={() => setOpenIndex(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
