"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Send, Check, Phone, MapPin, Loader2, AlertCircle } from "lucide-react";
import { profile } from "@/lib/data";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";

type Status = "idle" | "sending" | "success" | "error";

// Free access key from https://web3forms.com (tied to your email — messages
// are delivered straight to your inbox). Set it in .env.local / Vercel:
//   NEXT_PUBLIC_WEB3FORMS_KEY=your-access-key
const WEB3FORMS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_KEY;

export default function Contact() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;

    if (!WEB3FORMS_KEY) {
      setStatus("error");
      setError(`The form is unavailable right now — please email me at ${profile.email}.`);
      return;
    }

    setStatus("sending");
    setError("");

    try {
      const data = new FormData(form);
      data.append("access_key", WEB3FORMS_KEY);
      // Keep the visitor's subject; fall back to a default when left blank.
      const subject = String(data.get("subject") ?? "").trim();
      data.set("subject", subject || `Portfolio message from ${data.get("name") || "visitor"}`);
      data.append("from_name", "Portfolio Contact Form");

      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: data,
      });
      const json = await res.json();

      if (json.success) {
        setStatus("success");
        form.reset();
        setTimeout(() => setStatus("idle"), 4000);
      } else {
        throw new Error(json.message || "Something went wrong.");
      }
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Failed to send. Please try again.");
    }
  };

  const field =
    "w-full rounded-2xl border border-blush-200/70 bg-white/60 px-4 py-3 text-blush-900 placeholder:text-blush-900/40 outline-none transition-all duration-300 focus:border-blush-400 focus:bg-white/80 focus:ring-4 focus:ring-blush-200/50";

  return (
    <section id="contact" className="section-pad relative">
      <div className="container-tight">
        <SectionHeading
          eyebrow="Contact"
          title="Let's work together"
          intro="Hiring for a full stack or frontend role? I'd love to hear about it — remote or onsite."
        />

        <div className="mt-16 grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
          {/* Left: invitation card */}
          <Reveal direction="right">
            <div className="relative h-full overflow-hidden rounded-[2rem] glass-strong p-8 shadow-glass-lg">
              <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-blush-300/40 blur-3xl" />
              <h3 className="font-display text-3xl font-semibold text-blush-900">
                Say hello 💌
              </h3>
              <p className="mt-4 leading-relaxed text-blush-900/60">
                I&apos;ve completed my BCA and I&apos;m available to start a
                full-time Full Stack or Frontend Developer role — remote or
                onsite. Email is the fastest way to reach me.
              </p>

              <div className="mt-8 space-y-3">
                <a
                  href={`mailto:${profile.email}`}
                  className="flex items-center gap-3 rounded-2xl border border-blush-200/70 bg-white/60 px-4 py-3 text-blush-700 transition-colors hover:bg-white/80"
                >
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-blush-400 to-blush-600 text-white">
                    <Mail className="h-4 w-4" />
                  </span>
                  <span className="truncate font-medium">{profile.email}</span>
                </a>
                <a
                  href={`tel:${profile.phone.replace(/\s+/g, "")}`}
                  className="flex items-center gap-3 rounded-2xl border border-blush-200/70 bg-white/60 px-4 py-3 text-blush-700 transition-colors hover:bg-white/80"
                >
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-blush-400 to-blush-600 text-white">
                    <Phone className="h-4 w-4" />
                  </span>
                  <span className="font-medium">{profile.phone}</span>
                </a>
                <div className="flex items-center gap-3 rounded-2xl border border-blush-200/70 bg-white/60 px-4 py-3 text-blush-700">
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-blush-400 to-blush-600 text-white">
                    <MapPin className="h-4 w-4" />
                  </span>
                  <span className="font-medium">{profile.location}</span>
                </div>
              </div>

              <div className="mt-8">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blush-500">
                  Find me on
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {profile.socials.map((s) => (
                    <a
                      key={s.label}
                      href={s.href}
                      target="_blank"
                      rel="noreferrer"
                      className="rounded-full border border-blush-200/70 bg-white/60 px-4 py-2 text-sm font-medium text-blush-700 transition-all duration-300 hover:-translate-y-0.5 hover:border-blush-400 hover:bg-blush-100"
                    >
                      {s.label}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>

          {/* Right: form */}
          <Reveal direction="left">
            <form
              onSubmit={handleSubmit}
              className="rounded-[2rem] glass p-8 shadow-glass"
            >
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="name" className="mb-2 block text-sm font-medium text-blush-800">
                    Name
                  </label>
                  <input id="name" name="name" required placeholder="Your name" className={field} />
                </div>
                <div>
                  <label htmlFor="email" className="mb-2 block text-sm font-medium text-blush-800">
                    Email
                  </label>
                  <input id="email" name="email" type="email" required placeholder="you@email.com" className={field} />
                </div>
              </div>

              <div className="mt-5">
                <label htmlFor="subject" className="mb-2 block text-sm font-medium text-blush-800">
                  Subject
                </label>
                <input id="subject" name="subject" placeholder="What's this about?" className={field} />
              </div>

              <div className="mt-5">
                <label htmlFor="message" className="mb-2 block text-sm font-medium text-blush-800">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  placeholder="Tell me about the role or project..."
                  className={`${field} resize-none`}
                />
              </div>

              {/* Honeypot — hidden from users, catches bots */}
              <input
                type="checkbox"
                name="botcheck"
                tabIndex={-1}
                autoComplete="off"
                className="hidden"
                aria-hidden
              />

              <motion.button
                type="submit"
                disabled={status === "sending"}
                whileHover={{ scale: status === "sending" ? 1 : 1.02 }}
                whileTap={{ scale: status === "sending" ? 1 : 0.98 }}
                className="shimmer relative mt-6 flex w-full items-center justify-center gap-2 overflow-hidden rounded-2xl bg-gradient-to-r from-blush-500 to-blush-400 px-6 py-4 font-semibold text-white shadow-glow transition-colors hover:from-blush-600 hover:to-blush-500 disabled:cursor-not-allowed disabled:opacity-80"
              >
                {status === "sending" ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" /> Sending…
                  </>
                ) : status === "success" ? (
                  <>
                    <Check className="h-5 w-5" /> Message sent — thank you!
                  </>
                ) : (
                  <>
                    <Send className="h-5 w-5" /> Send message
                  </>
                )}
              </motion.button>

              {status === "error" && (
                <p className="mt-3 flex items-center justify-center gap-2 text-center text-sm text-blush-600">
                  <AlertCircle className="h-4 w-4 shrink-0" />
                  {error}
                </p>
              )}
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
