"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Briefcase, Check, Clock, Copy, Zap } from "lucide-react";
import { profile } from "@/lib/data";
import { cn } from "@/lib/utils";

/** Current time in the given IANA time zone, refreshed every 15s. Null until mounted to avoid hydration mismatch. */
function useLocalTime(timeZone: string) {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const format = new Intl.DateTimeFormat("en-US", {
      timeZone,
      hour: "numeric",
      minute: "2-digit",
    });
    const tick = () => setTime(format.format(new Date()));
    tick();
    const id = window.setInterval(tick, 15_000);
    return () => window.clearInterval(id);
  }, [timeZone]);

  return time;
}

function useCopyEmail() {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard can be blocked (e.g. insecure context) — fall back to the mail app.
      window.location.href = `mailto:${profile.email}`;
    }
  };

  return { copied, copy };
}

function StatusDot() {
  return (
    <span className="relative flex h-2.5 w-2.5">
      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
      <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
    </span>
  );
}

/**
 * "Available for hire" status: live local time, work modes, reply time and a copy-email action.
 * `floating` is the stacked card for wide screens; `inline` is a compact strip for smaller ones.
 */
export default function AvailabilityCard({
  variant,
  className,
}: {
  variant: "floating" | "inline";
  className?: string;
}) {
  const { hire } = profile;
  const time = useLocalTime(hire.timeZone);
  const { copied, copy } = useCopyEmail();

  const copyLabel = copied ? "Email copied!" : "Copy email";
  const CopyIcon = copied ? Check : Copy;

  if (variant === "inline") {
    return (
      <div
        className={cn(
          "flex flex-wrap items-center justify-center gap-2 text-sm",
          className
        )}
      >
        <span className="inline-flex items-center gap-2 rounded-full border border-blush-200/70 bg-white/60 px-3.5 py-1.5 font-medium text-blush-700 backdrop-blur-md">
          <StatusDot /> {hire.status} · {hire.workModes}
        </span>
        <span className="inline-flex items-center gap-1.5 rounded-full border border-blush-200/70 bg-white/60 px-3.5 py-1.5 text-blush-900/60 backdrop-blur-md">
          <Clock className="h-3.5 w-3.5" />
          <span className="tabular-nums">{time ?? "--:--"}</span> in Kathmandu
        </span>
        <button
          type="button"
          onClick={copy}
          aria-live="polite"
          className="inline-flex items-center gap-1.5 rounded-full border border-blush-200/70 bg-white/60 px-3.5 py-1.5 font-medium text-blush-700 backdrop-blur-md transition-colors hover:border-blush-400 hover:bg-blush-100"
        >
          <CopyIcon className="h-3.5 w-3.5" /> {copyLabel}
        </button>
      </div>
    );
  }

  return (
    <motion.aside
      aria-label="Availability"
      initial={{ opacity: 0, x: 24 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.9, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className={cn("w-64 rounded-3xl glass-strong p-5 text-left shadow-glass-lg", className)}
    >
      <motion.div
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      >
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-blush-500">
          Available for hire
        </p>

        <div className="mt-3 flex items-center gap-2.5">
          <StatusDot />
          <span className="font-display text-xl font-semibold text-blush-900">
            {hire.status}
          </span>
        </div>

        <ul className="mt-4 space-y-2.5 text-sm text-blush-900/70">
          <li className="flex items-center gap-2.5">
            <Briefcase className="h-4 w-4 shrink-0 text-blush-500" />
            {hire.workModes}
          </li>
          <li className="flex items-center gap-2.5">
            <Clock className="h-4 w-4 shrink-0 text-blush-500" />
            <span>
              <span className="font-semibold tabular-nums text-blush-800">
                {time ?? "--:--"}
              </span>{" "}
              <span className="text-blush-900/50">{hire.timeZoneLabel}</span>
            </span>
          </li>
          <li className="flex items-center gap-2.5">
            <Zap className="h-4 w-4 shrink-0 text-blush-500" />
            {hire.responseTime}
          </li>
        </ul>

        <button
          type="button"
          onClick={copy}
          aria-live="polite"
          className="mt-5 flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-blush-500 to-blush-400 px-4 py-2.5 text-sm font-semibold text-white shadow-glow transition-transform duration-300 hover:scale-[1.02]"
        >
          <CopyIcon className="h-4 w-4" /> {copyLabel}
        </button>
        <p className="mt-2 truncate text-center text-xs text-blush-900/50">
          {profile.email}
        </p>
      </motion.div>
    </motion.aside>
  );
}
