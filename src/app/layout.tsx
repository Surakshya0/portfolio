import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import Navbar from "@/components/Navbar";
import Particles from "@/components/Particles";
import { profile } from "@/lib/data";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://surakshyabhusal.com.np"),
  title: {
    default: `${profile.name} — ${profile.role}`,
    template: `%s — ${profile.name}`,
  },
  description: profile.tagline,
  keywords: [
    "portfolio",
    "full stack developer",
    "frontend developer",
    "UI/UX designer",
    "React developer",
    "Kathmandu",
    "Nepal",
    profile.name,
  ],
  authors: [{ name: profile.name }],
  openGraph: {
    title: `${profile.name} — ${profile.role}`,
    description: profile.tagline,
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: `${profile.name} — ${profile.role}`,
    description: profile.tagline,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#fff5f8",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${playfair.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* Set the theme before paint to avoid a flash of the wrong theme. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{if(localStorage.getItem('theme')==='dark')document.documentElement.classList.add('dark');}catch(e){}})();`,
          }}
        />
      </head>
      <body className="relative min-h-screen antialiased">
        <SmoothScroll>
          {/* Ambient aurora background — soft mesh blobs that slowly drift */}
          <div
            aria-hidden
            className="pointer-events-none fixed inset-0 -z-20 overflow-hidden"
          >
            <div className="absolute -left-40 -top-40 h-[42rem] w-[42rem] rounded-full bg-blush-200/60 blur-3xl animate-float-slow" />
            <div className="absolute right-[-12rem] top-1/4 h-[38rem] w-[38rem] rounded-full bg-blush-300/50 blur-3xl animate-float" />
            <div className="absolute bottom-[-14rem] left-1/3 h-[40rem] w-[40rem] rounded-full bg-petal blur-3xl animate-float-slow" />
            <div className="absolute left-1/4 top-[38%] h-[30rem] w-[30rem] rounded-full bg-[#f7cfe3]/50 blur-3xl animate-float" />
            <div className="absolute right-1/4 bottom-[6%] h-[26rem] w-[26rem] rounded-full bg-[#e7d5f5]/40 blur-3xl animate-float-slow" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.6),_transparent_60%)]" />
          </div>

          <Particles />
          <Navbar />
          <main>{children}</main>
        </SmoothScroll>
      </body>
    </html>
  );
}
