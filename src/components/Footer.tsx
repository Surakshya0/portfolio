"use client";

import { Heart, ArrowUp } from "lucide-react";
import { profile, navLinks } from "@/lib/data";

export default function Footer() {
  return (
    <footer className="relative px-6 pb-10 pt-8">
      <div className="container-tight overflow-hidden rounded-[2rem] glass px-6 py-10 shadow-glass sm:px-10">
        <div className="flex flex-col items-center justify-between gap-8 md:flex-row md:items-start">
          <div className="text-center md:text-left">
            <p className="font-display text-2xl font-semibold text-blush-900">
              {profile.name}
            </p>
            <p className="mt-2 max-w-xs text-sm text-blush-900/55">
              {profile.role} in {profile.location} — open to remote and onsite roles.
            </p>
          </div>

          <div className="flex flex-col items-center gap-4 md:items-end">
            <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2 md:justify-end">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-sm font-medium text-blush-900/60 transition-colors hover:text-blush-600"
                >
                  {link.label}
                </a>
              ))}
            </nav>
            <div className="flex flex-wrap items-center justify-center gap-2 md:justify-end">
              {profile.socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full border border-blush-200/70 bg-white/60 px-4 py-1.5 text-xs font-semibold text-blush-700 transition-all duration-300 hover:-translate-y-0.5 hover:border-blush-400 hover:bg-blush-100"
                >
                  {s.label}
                </a>
              ))}
              <a
                href="#home"
                aria-label="Back to top"
                className="grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-blush-400 to-blush-600 text-white shadow-glow transition-transform duration-300 hover:-translate-y-1"
              >
                <ArrowUp className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-blush-100 pt-6 text-sm text-blush-900/50 sm:flex-row">
          <p>
            © {new Date().getFullYear()} {profile.name}. All rights reserved.
          </p>
          <p className="flex items-center gap-1.5">
            Designed &amp; Developed by {profile.name} with
            <Heart className="h-4 w-4 fill-blush-400 text-blush-400" />
          </p>
        </div>
      </div>
    </footer>
  );
}
