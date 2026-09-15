"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowDown, MapPin, Download } from "lucide-react";
import { profile } from "@/lib/data";
import MagneticButton from "@/components/ui/MagneticButton";
import Avatar from "@/components/ui/Avatar";
import AvailabilityCard from "@/components/ui/AvailabilityCard";

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Subtle parallax as the hero scrolls away.
  const yImage = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const yText = useTransform(scrollYProgress, [0, 1], [0, 60]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
  };
  const item = {
    hidden: { opacity: 0, y: 28, filter: "blur(8px)" },
    show: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const },
    },
  };

  return (
    <section
      ref={ref}
      id="home"
      className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 pb-24 pt-24 [@media(max-height:820px)]:pb-16"
    >
      <motion.div
        style={{ y: yText, opacity }}
        variants={container}
        initial="hidden"
        animate="show"
        className="container-tight flex flex-col items-center text-center"
      >
        {/* Profile image with animated rings */}
        <motion.div style={{ y: yImage }} variants={item} className="relative mb-8 [@media(max-height:820px)]:mb-6">
          <div className="absolute inset-0 -m-3 animate-pulse-ring rounded-full border border-blush-300/60" />
          <div className="absolute inset-0 -m-3 animate-spin-slow rounded-full border border-dashed border-blush-300/50" />
          <div className="relative rounded-full bg-gradient-to-br from-blush-300 via-white to-blush-200 p-1.5 shadow-glass-lg">
            <div className="overflow-hidden rounded-full ring-4 ring-white/70">
              <Avatar
                src={profile.avatar}
                name={profile.name}
                size={176}
                priority
                className="h-40 w-40 sm:h-44 sm:w-44 [@media(max-height:820px)]:h-32 [@media(max-height:820px)]:w-32"
              />
            </div>
          </div>
          <motion.span
            aria-hidden
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -right-2 top-2 grid h-11 w-11 place-items-center rounded-2xl glass text-lg shadow-glass"
          >
            👋
          </motion.span>
        </motion.div>

        <motion.h1
          variants={item}
          className="max-w-4xl font-display text-5xl font-semibold leading-[1.05] text-blush-900 sm:text-6xl md:text-7xl"
        >
          Hi, I&apos;m <span className="text-gradient">{profile.firstName}</span>
        </motion.h1>

        <motion.div
          variants={item}
          className="mt-5 flex flex-wrap items-center justify-center gap-3"
        >
          {profile.roles.map((r) => (
            <span
              key={r}
              className="rounded-full border border-blush-200/70 bg-white/60 px-5 py-2 font-display text-lg font-medium italic text-blush-700 backdrop-blur-md sm:text-xl"
            >
              {r}
            </span>
          ))}
        </motion.div>

        <motion.p
          variants={item}
          className="mt-6 max-w-2xl text-balance text-lg leading-relaxed text-blush-900/60 sm:text-xl"
        >
          {profile.tagline}
        </motion.p>

        <motion.div
          variants={item}
          className="mt-4 flex items-center gap-2 text-sm text-blush-900/50"
        >
          <MapPin className="h-4 w-4" />
          {profile.location}
        </motion.div>

        <motion.div
          variants={item}
          className="mt-8 flex w-full flex-wrap items-center justify-center gap-4"
        >
          <MagneticButton href="#projects">View My Work</MagneticButton>
          <MagneticButton href={profile.resumeUrl} variant="ghost" download>
            <Download className="h-4 w-4" /> Download CV
          </MagneticButton>
          <MagneticButton href="#contact" variant="ghost">
            Contact Me
          </MagneticButton>
        </motion.div>

        {/* Compact hire status below the buttons on smaller screens */}
        <motion.div variants={item} className="mt-8 xl:hidden">
          <AvailabilityCard variant="inline" />
        </motion.div>
      </motion.div>

      {/* Floating hire card beside the intro on wide screens */}
      <div className="absolute right-8 top-1/2 hidden -translate-y-1/2 xl:block 2xl:right-16">
        <AvailabilityCard variant="floating" />
      </div>

      {/* Scroll cue */}
      <motion.a
        href="#about"
        aria-label="Scroll to about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-6 left-1/2 flex [@media(max-height:820px)]:hidden -translate-x-1/2 flex-col items-center gap-2 text-blush-500"
      >
        <span className="text-[11px] uppercase tracking-[0.3em]">Scroll</span>
        <motion.span
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown className="h-4 w-4" />
        </motion.span>
      </motion.a>
    </section>
  );
}
