"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { about, profile } from "@/lib/data";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import Avatar from "@/components/ui/Avatar";

export default function About() {
  return (
    <section id="about" className="section-pad relative">
      <div className="container-tight">
        <SectionHeading
          eyebrow="About Me"
          title={about.heading}
          align="left"
        />

        <div className="mt-14 grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          {/* Portrait card */}
          <Reveal direction="right">
            <div className="group relative mx-auto max-w-sm">
              <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-blush-200/60 to-petal blur-2xl" />
              <div className="relative overflow-hidden rounded-[2rem] glass p-3 shadow-glass-lg">
                <div className="overflow-hidden rounded-[1.5rem]">
                  {profile.avatar ? (
                    <Image
                      src={profile.avatar}
                      alt={profile.name}
                      width={480}
                      height={560}
                      className="h-[26rem] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                  ) : (
                    <div className="grid h-[26rem] w-full place-items-center bg-gradient-to-br from-blush-200 via-petal to-blush-300 transition-transform duration-700 ease-out group-hover:scale-105">
                      <Avatar name={profile.name} size={140} />
                    </div>
                  )}
                </div>
                <div className="absolute bottom-6 left-6 right-6 rounded-2xl glass-strong px-5 py-4">
                  <p className="font-display text-lg font-semibold text-blush-800">
                    {profile.name}
                  </p>
                  <p className="text-sm text-blush-900/60">{profile.role}</p>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Text + stats */}
          <div className="flex flex-col gap-8">
            {about.paragraphs.map((p, i) => (
              <Reveal key={i} direction="left" delay={i * 0.1}>
                <p className="text-lg leading-relaxed text-blush-900/70">{p}</p>
              </Reveal>
            ))}

            <div className="mt-2 grid grid-cols-2 gap-4 sm:grid-cols-4">
              {about.stats.map((stat, i) => (
                <Reveal key={stat.label} direction="up" delay={0.1 + i * 0.08}>
                  <motion.div
                    whileHover={{ y: -6 }}
                    className="glass rounded-2xl px-4 py-5 text-center shadow-glass"
                  >
                    <p className="font-display text-3xl font-semibold text-gradient">
                      {stat.value}
                    </p>
                    <p className="mt-1 text-xs font-medium uppercase tracking-wider text-blush-900/50">
                      {stat.label}
                    </p>
                  </motion.div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
