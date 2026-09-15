# Aurora — Premium Portfolio

A modern, luxurious portfolio website with a soft pink & white aesthetic, glassmorphism, animated gradients, smooth scrolling, floating particles, and elegant motion throughout.

Built with **Next.js 14 (App Router)**, **TypeScript**, **Tailwind CSS**, **Framer Motion**, **GSAP**, and **Lenis**.

## ✨ Features

- 🌸 Soft pink & white, feminine, minimal design language
- 🪟 Glassmorphism surfaces with layered blur and glow
- 🎨 Animated gradient background blobs + gradient text
- 🌊 Buttery smooth scrolling (Lenis) synced with GSAP ScrollTrigger
- ✦ Floating particle field on a performant canvas
- 🎬 Scroll-reveal animations on every section (Framer Motion + GSAP)
- 🧲 Magnetic buttons, hover tilt, and micro-interactions
- 📽️ Elegant page-load transition + scroll progress bar
- 📱 Fully responsive with an animated mobile menu
- ♿ Respects `prefers-reduced-motion`
- ⚡ Optimized: `next/font`, `next/image` (AVIF/WebP), lazy canvas, reduced-motion guards

## 🗂️ Sections

Hero (circular profile) · About · Skills · Projects · Experience (timeline) · Contact

## 🚀 Getting started

```bash
npm install
npm run dev      # http://localhost:3000
```

Build for production:

```bash
npm run build
npm run start
```

## ✏️ Customization

All content lives in **`src/lib/data.ts`** — edit your name, role, bio, skills,
projects, experience, socials, and profile image there. The color palette and
motion tokens live in **`tailwind.config.ts`**; global styles in
**`src/app/globals.css`**.

> Replace the placeholder Unsplash images (including `profile.avatar`) with your
> own. Remote hosts are allow-listed in `next.config.mjs`.

## 📦 Deployment

Deploy to [Vercel](https://vercel.com) (zero config) or any Node host:

```bash
npm run build && npm run start
```

## 🧭 Structure

```
src/
├── app/                 # App Router entry (layout, page, globals)
├── components/
│   ├── sections/        # Hero, About, Skills, Projects, Experience, Contact
│   ├── ui/              # Reveal, SectionHeading, MagneticButton, ScrollProgress
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   ├── Particles.tsx
│   ├── PageTransition.tsx
│   └── SmoothScroll.tsx # Lenis + GSAP integration
└── lib/                 # data.ts (content) + utils.ts
```
