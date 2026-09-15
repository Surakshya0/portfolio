"use client";

import { useEffect, useRef } from "react";

type Shape = "heart" | "petal";

type Particle = {
  x: number;
  y: number;
  size: number;
  vx: number;
  vy: number;
  alpha: number;
  hue: number;
  rot: number;
  vr: number;
  sway: number;
  swaySpeed: number;
  shape: Shape;
};

// Unit heart outline (centred on origin, ~1px wide), sampled once and
// reused for every particle via a canvas transform.
const HEART: { x: number; y: number }[] = (() => {
  const pts: { x: number; y: number }[] = [];
  for (let t = 0; t <= Math.PI * 2 + 0.001; t += Math.PI / 14) {
    const x = 16 * Math.sin(t) ** 3;
    const y =
      13 * Math.cos(t) -
      5 * Math.cos(2 * t) -
      2 * Math.cos(3 * t) -
      Math.cos(4 * t);
    // Normalise into a ~[-0.5, 0.5] box and flip y for canvas coords.
    pts.push({ x: x / 34, y: -y / 34 });
  }
  return pts;
})();

/**
 * Lightweight canvas field of soft, drifting hearts and petals.
 * Single canvas + requestAnimationFrame for performance; pauses when the
 * tab is hidden or the user prefers reduced motion.
 */
export default function Particles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let particles: Particle[] = [];
    let raf = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const count = () =>
      Math.min(46, Math.floor((window.innerWidth * window.innerHeight) / 42000));

    const make = (): Particle => {
      // A little under half are petals; the rest are hearts.
      const shape: Shape = Math.random() < 0.45 ? "petal" : "heart";
      return {
        x: Math.random() * width,
        y: Math.random() * height,
        size:
          shape === "petal"
            ? Math.random() * 9 + 9
            : Math.random() * 9 + 8,
        vx: (Math.random() - 0.5) * 0.2,
        vy: -(Math.random() * 0.3 + 0.08),
        alpha: Math.random() * 0.4 + 0.16,
        // Hearts stay pink; petals are a soft lavender/lilac to stand apart.
        hue: shape === "petal" ? 268 + Math.random() * 24 : 335 + Math.random() * 20,
        rot: Math.random() * Math.PI * 2,
        vr: (Math.random() - 0.5) * 0.012,
        sway: Math.random() * Math.PI * 2,
        swaySpeed: Math.random() * 0.02 + 0.008,
        shape,
      };
    };

    const seed = () => {
      particles = Array.from({ length: count() }, make);
    };

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      seed();
    };

    const drawHeart = () => {
      ctx.beginPath();
      for (let i = 0; i < HEART.length; i++) {
        const pt = HEART[i];
        if (i === 0) ctx.moveTo(pt.x, pt.y);
        else ctx.lineTo(pt.x, pt.y);
      }
      ctx.closePath();
      ctx.fill();
    };

    const drawPetal = () => {
      // Soft leaf/petal — pointed at both ends.
      ctx.beginPath();
      ctx.moveTo(0, -0.5);
      ctx.bezierCurveTo(0.34, -0.22, 0.34, 0.22, 0, 0.5);
      ctx.bezierCurveTo(-0.34, 0.22, -0.34, -0.22, 0, -0.5);
      ctx.closePath();
      ctx.fill();
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      for (const p of particles) {
        p.sway += p.swaySpeed;
        p.x += p.vx + Math.sin(p.sway) * 0.25;
        p.y += p.vy;
        p.rot += p.vr;

        // Recycle particles that drift off the top/sides.
        if (p.y < -20) {
          p.y = height + 20;
          p.x = Math.random() * width;
        }
        if (p.x < -20) p.x = width + 20;
        if (p.x > width + 20) p.x = -20;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot);
        ctx.scale(p.size, p.size);
        ctx.fillStyle = `hsla(${p.hue}, 85%, 74%, ${p.alpha})`;
        ctx.shadowColor = `hsla(${p.hue}, 90%, 78%, ${p.alpha})`;
        ctx.shadowBlur = 6;
        if (p.shape === "heart") drawHeart();
        else drawPetal();
        ctx.restore();
      }
      raf = requestAnimationFrame(draw);
    };

    const start = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(draw);
    };
    const stop = () => cancelAnimationFrame(raf);

    const onVisibility = () => (document.hidden ? stop() : start());

    resize();
    start();
    window.addEventListener("resize", resize);
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      stop();
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 h-full w-full"
    />
  );
}
