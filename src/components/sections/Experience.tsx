"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { experience } from "@/lib/data";
import SectionHeading from "@/components/ui/SectionHeading";

export default function Experience() {
  const root = useRef<HTMLDivElement>(null);
  const line = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const ctx = gsap.context(() => {
      // Draw the vertical timeline as you scroll.
      if (line.current && !prefersReduced) {
        gsap.fromTo(
          line.current,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            scrollTrigger: {
              trigger: root.current,
              start: "top 65%",
              end: "bottom 80%",
              scrub: true,
            },
          }
        );
      }

      // Stagger each timeline item into view.
      const items = gsap.utils.toArray<HTMLElement>(".timeline-item");
      items.forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 85%" },
          }
        );
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section id="experience" className="section-pad relative">
      <div className="container-tight">
        <SectionHeading
          eyebrow="Experience"
          title="Where I've worked"
          intro="Hands-on experience building production software as part of a development team."
        />

        <div ref={root} className="relative mx-auto mt-16 max-w-3xl">
          {/* Timeline track */}
          <div className="absolute left-[19px] top-2 h-full w-px bg-blush-200/70 md:left-1/2 md:-translate-x-1/2" />
          <div
            ref={line}
            className="absolute left-[19px] top-2 h-full w-px origin-top bg-gradient-to-b from-blush-500 to-blush-300 md:left-1/2 md:-translate-x-1/2"
          />

          <div className="flex flex-col gap-10">
            {experience.map((item, i) => (
              <div
                key={`${item.company}-${i}`}
                className={`timeline-item relative pl-14 md:w-1/2 md:pl-0 ${
                  i % 2 === 0
                    ? "md:self-start md:pr-12 md:text-right"
                    : "md:self-end md:pl-12"
                }`}
              >
                {/* Node */}
                <span
                  className={`absolute left-[11px] top-1.5 grid h-5 w-5 place-items-center rounded-full bg-white shadow-glow ring-4 ring-petal md:left-auto ${
                    i % 2 === 0 ? "md:-right-[10px]" : "md:-left-[10px]"
                  }`}
                >
                  <span className="h-2 w-2 rounded-full bg-gradient-to-br from-blush-500 to-blush-400" />
                </span>

                <div className="rounded-3xl glass p-6 shadow-glass transition-transform duration-300 hover:-translate-y-1">
                  <div
                    className={`flex flex-wrap items-center gap-x-3 gap-y-1 ${
                      i % 2 === 0 ? "md:justify-end" : ""
                    }`}
                  >
                    <span className="text-xs font-semibold uppercase tracking-[0.2em] text-blush-500">
                      {item.period}
                    </span>
                    {item.location && (
                      <span className="rounded-full border border-blush-200/70 bg-white/60 px-2.5 py-0.5 text-[11px] font-medium text-blush-600">
                        {item.location}
                      </span>
                    )}
                  </div>
                  <h3 className="mt-2 font-display text-xl font-semibold text-blush-900">
                    {item.role}
                  </h3>
                  <p className="text-sm font-medium text-blush-600">
                    {item.company}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-blush-900/60">
                    {item.description}
                  </p>

                  <ul
                    className={`mt-4 space-y-2 text-sm text-blush-900/70 ${
                      i % 2 === 0 ? "md:text-left" : ""
                    }`}
                  >
                    {item.highlights.map((h) => (
                      <li key={h} className="flex items-start gap-2">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-blush-400" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
