"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ExternalLink, Github, Images } from "lucide-react";
import { webProjects } from "@/lib/data";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import Thumb from "@/components/ui/Thumb";
import Lightbox from "@/components/ui/Lightbox";

export default function WebDev() {
  // Which project's screenshot gallery is currently open (by title), or null.
  const [openGallery, setOpenGallery] = useState<string | null>(null);
  const active = webProjects.find((p) => p.title === openGallery);

  return (
    <section id="projects"className="section-pad relative">
      <div className="container-tight">
        <SectionHeading
          eyebrow="Projects"
          title="Full-stack applications I've built"
          intro="Real applications I designed and built end to end — database, API, and interface."
        />

        <div className="mt-16 flex flex-col gap-8">
          {webProjects.map((p, i) => (
            <Reveal key={p.title} direction="up" delay={(i % 2) * 0.08}>
              <motion.article
                whileHover={{ y: -4 }}
                transition={{ type: "spring", stiffness: 260, damping: 22 }}
                className={`group grid gap-6 overflow-hidden rounded-[2rem] glass p-4 shadow-glass md:grid-cols-2 md:items-center ${
                  i % 2 === 1 ? "md:[&>figure]:order-2" : ""
                }`}
              >
                {/* Thumbnail — click to open the screenshot slider when a gallery exists */}
                <figure className="overflow-hidden rounded-[1.5rem]">
                  {p.gallery?.length ? (
                    <button
                      type="button"
                      onClick={() => setOpenGallery(p.title)}
                      aria-label={`View ${p.title} screenshots`}
                      className="group/thumb relative block w-full cursor-pointer"
                    >
                      <div className="transition-transform duration-700 ease-out group-hover:scale-[1.04]">
                        <Thumb
                          src={p.image}
                          label={p.title}
                          index={i}
                          className="aspect-[1917/753]"
                        />
                      </div>
                      {/* Hover overlay hint */}
                      <div className="absolute inset-0 flex items-center justify-center bg-blush-900/0 opacity-0 transition-all duration-300 group-hover/thumb:bg-blush-900/25 group-hover/thumb:opacity-100">
                        <span className="inline-flex items-center gap-2 rounded-full bg-white/90 px-4 py-2 text-sm font-semibold text-blush-700 shadow-glass backdrop-blur">
                          <Images className="h-4 w-4" />
                          View {p.gallery.length} screenshots
                        </span>
                      </div>
                    </button>
                  ) : (
                    <div className="transition-transform duration-700 ease-out group-hover:scale-[1.04]">
                      <Thumb src={p.image} label={p.title} index={i} className="aspect-[16/10]" />
                    </div>
                  )}
                </figure>

                {/* Details */}
                <div className="px-3 pb-4 md:px-6">
                  <span className="text-xs font-semibold uppercase tracking-[0.2em] text-blush-500">
                    Project 0{i + 1}
                  </span>
                  <h3 className="mt-2 font-display text-2xl font-semibold text-blush-900">
                    {p.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-blush-900/60">
                    {p.description}
                  </p>

                  <div className="mt-5">
                    <p className="text-xs font-semibold uppercase tracking-wider text-blush-500/80">
                      Technologies used
                    </p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {p.tech.map((t) => (
                        <span
                          key={t}
                          className="rounded-full border border-blush-200/70 bg-white/50 px-3 py-1 text-xs font-medium text-blush-700"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-6 flex flex-wrap gap-3">
                    {p.links.live && (
                      <a
                        href={p.links.live}
                        className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blush-500 to-blush-400 px-5 py-2.5 text-sm font-semibold text-white shadow-glow transition-transform hover:scale-[1.03]"
                      >
                        <ExternalLink className="h-4 w-4" /> Live Demo
                      </a>
                    )}
                    {p.links.github && (
                      <a
                        href={p.links.github}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 rounded-full glass px-5 py-2.5 text-sm font-semibold text-blush-700 transition-colors hover:bg-white/70"
                      >
                        <Github className="h-4 w-4" /> GitHub
                      </a>
                    )}
                  </div>
                </div>
              </motion.article>
            </Reveal>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {active?.gallery?.length ? (
          <Lightbox
            title={active.title}
            images={active.gallery}
            onClose={() => setOpenGallery(null)}
          />
        ) : null}
      </AnimatePresence>
    </section>
  );
}
