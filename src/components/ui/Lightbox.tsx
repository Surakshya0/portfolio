"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

export type GalleryImage = { src: string; caption: string };

/**
 * Full-screen image slider. Opens on the given `startIndex`, supports
 * arrow buttons, keyboard (←/→/Esc), drag-to-swipe, dots, and a counter.
 */
export default function Lightbox({
  title,
  images,
  startIndex = 0,
  onClose,
}: {
  title: string;
  images: GalleryImage[];
  startIndex?: number;
  onClose: () => void;
}) {
  const [index, setIndex] = useState(startIndex);

  const go = useCallback(
    (dir: number) =>
      setIndex((i) => (i + dir + images.length) % images.length),
    [images.length]
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    // Lock body scroll while open.
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [go, onClose]);

  const current = images[index];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-blush-900/70 p-4 backdrop-blur-md sm:p-8"
    >
      {/* Top bar */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="mb-4 flex w-full max-w-5xl items-center justify-between text-white"
      >
        <p className="font-display text-lg font-semibold drop-shadow">
          {title}
          <span className="ml-3 text-sm font-normal text-white/70">
            {index + 1} / {images.length}
          </span>
        </p>
        <button
          onClick={onClose}
          aria-label="Close"
          className="grid h-10 w-10 place-items-center rounded-full bg-white/15 text-white transition-colors hover:bg-white/30"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      {/* Stage */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative flex w-full max-w-5xl flex-1 items-center justify-center"
      >
        <button
          onClick={() => go(-1)}
          aria-label="Previous"
          className="absolute left-0 z-10 grid h-11 w-11 -translate-x-1 place-items-center rounded-full bg-white/15 text-white transition-colors hover:bg-white/30 sm:-translate-x-14"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>

        <AnimatePresence mode="wait" initial={false}>
          <motion.figure
            key={index}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.15}
            onDragEnd={(_, info) => {
              if (info.offset.x < -80) go(1);
              else if (info.offset.x > 80) go(-1);
            }}
            className="flex max-h-[75vh] w-full cursor-grab flex-col items-center active:cursor-grabbing"
          >
            <div className="relative w-full overflow-hidden rounded-2xl bg-white/5 shadow-glass-lg ring-1 ring-white/20">
              <Image
                src={current.src}
                alt={current.caption}
                width={1600}
                height={1000}
                draggable={false}
                className="max-h-[70vh] w-full object-contain"
                priority
              />
            </div>
            <figcaption className="mt-4 text-center text-sm text-white/80">
              {current.caption}
            </figcaption>
          </motion.figure>
        </AnimatePresence>

        <button
          onClick={() => go(1)}
          aria-label="Next"
          className="absolute right-0 z-10 grid h-11 w-11 translate-x-1 place-items-center rounded-full bg-white/15 text-white transition-colors hover:bg-white/30 sm:translate-x-14"
        >
          <ChevronRight className="h-6 w-6" />
        </button>
      </div>

      {/* Dots */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="mt-5 flex flex-wrap items-center justify-center gap-2"
      >
        {images.map((img, i) => (
          <button
            key={img.src}
            onClick={() => setIndex(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`h-2.5 rounded-full transition-all ${
              i === index ? "w-6 bg-white" : "w-2.5 bg-white/40 hover:bg-white/60"
            }`}
          />
        ))}
      </div>
    </motion.div>
  );
}
