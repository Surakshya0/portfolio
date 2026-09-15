"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Light/dark theme toggle. The initial class is set by an inline script in
 * the root layout (no flash of the wrong theme); this just reflects and
 * flips it, persisting the choice to localStorage.
 */
export default function ThemeToggle({ className }: { className?: string }) {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setTheme(
      document.documentElement.classList.contains("dark") ? "dark" : "light"
    );
  }, []);

  const toggle = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.classList.toggle("dark", next === "dark");
    try {
      localStorage.setItem("theme", next);
    } catch {
      /* ignore */
    }
  };

  return (
    <button
      onClick={toggle}
      aria-label="Toggle dark mode"
      title={theme === "dark" ? "Switch to light" : "Switch to dark"}
      className={cn(
        "grid h-10 w-10 place-items-center rounded-full glass text-blush-700 transition-colors hover:bg-white/70",
        className
      )}
    >
      {/* Avoid a hydration mismatch: render nothing until mounted. */}
      {mounted ? (
        theme === "dark" ? (
          <Sun className="h-[18px] w-[18px]" />
        ) : (
          <Moon className="h-[18px] w-[18px]" />
        )
      ) : (
        <span className="h-[18px] w-[18px]" />
      )}
    </button>
  );
}
