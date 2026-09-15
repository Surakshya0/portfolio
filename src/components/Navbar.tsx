"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, Sparkles } from "lucide-react";
import { navLinks, profile } from "@/lib/data";
import { cn } from "@/lib/utils";
import ThemeToggle from "@/components/ui/ThemeToggle";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll while the mobile menu is open.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4"
    >
      <nav
        className={cn(
          "container-tight flex items-center justify-between rounded-full px-5 py-3 transition-all duration-500",
          scrolled ? "glass-strong shadow-glass" : "border border-transparent bg-transparent"
        )}
      >
        <a
          href="#home"
          className="group flex items-center gap-2 font-display text-lg font-semibold text-blush-800"
        >
          <span className="grid h-8 w-8 place-items-center rounded-full bg-gradient-to-br from-blush-400 to-blush-600 text-white shadow-glow transition-transform duration-300 group-hover:rotate-12">
            <Sparkles className="h-4 w-4" />
          </span>
          {profile.name.split(" ")[0]}
        </a>

        {/* Desktop links */}
        <ul className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="group relative rounded-full px-4 py-2 text-sm font-medium text-blush-900/70 transition-colors hover:text-blush-700"
              >
                {link.label}
                <span className="absolute inset-x-4 -bottom-0.5 h-px origin-left scale-x-0 bg-blush-500 transition-transform duration-300 group-hover:scale-x-100" />
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-2 md:flex">
          <ThemeToggle />
          <a
            href="#contact"
            className="rounded-full bg-gradient-to-r from-blush-500 to-blush-400 px-5 py-2.5 text-sm font-semibold text-white shadow-glow transition-transform duration-300 hover:scale-[1.03]"
          >
            Let&apos;s talk
          </a>
        </div>

        {/* Mobile controls */}
        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
            className="grid h-10 w-10 place-items-center rounded-full glass text-blush-700"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-x-4 top-24 z-50 md:hidden"
          >
            <ul className="glass-strong flex flex-col gap-1 rounded-3xl p-4 shadow-glass-lg">
              {navLinks.map((link, i) => (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * i }}
                >
                  <a
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="block rounded-2xl px-4 py-3 text-base font-medium text-blush-900/80 transition-colors hover:bg-white/60 hover:text-blush-700"
                  >
                    {link.label}
                  </a>
                </motion.li>
              ))}
              <a
                href="#contact"
                onClick={() => setOpen(false)}
                className="mt-2 rounded-2xl bg-gradient-to-r from-blush-500 to-blush-400 px-4 py-3 text-center text-base font-semibold text-white shadow-glow"
              >
                Let&apos;s talk
              </a>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
