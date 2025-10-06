import { useEffect, useRef, useState } from "react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

import { motion } from "motion/react";
import { MoonIcon, SunIcon } from "lucide-react";
import { Link } from "@tanstack/react-router";

export function Navbar() {
  const { theme, setTheme } = useTheme();

  const [showNavbar, setShowNavbar] = useState(true);
  const navRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!navRef.current) return;
    let lastScroll = 0;
    let ticking = false;

    const handleScroll = () => {
      const currentScroll = window.scrollY;

      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (currentScroll > lastScroll) {
            setShowNavbar(false);
          } else {
            setShowNavbar(true);
          }

          lastScroll = currentScroll;
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      ref={navRef}
      className={cn(
        "px-3.5 py-4 flex justify-between items-center w-full sticky top-0 z-50 bg-background max-w-6xl mx-auto transition-all duration-250",
        showNavbar ? "translate-y-0" : "translate-y-[-100%]"
      )}
    >
      <Link to={"/"} viewTransition={{ types: ["fade"] }}>
        <h1
          className={cn(
            "relative text-foreground ml-7 flex-1 font-extrabold tracking-tighter cursor-pointer font-unbounded border-l pl-2",
            "before:absolute before:-left-6 before:text-base before:content-['新'] transition-all duration-150",
            "hover:text-foreground/60"
          )}
        >
          Kazyel
        </h1>
      </Link>

      <motion.button
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 1 }}
        onClick={() =>
          setTheme((prev) => (prev === "light" ? "dark" : "light"))
        }
      >
        {theme === "dark" ? (
          <MoonIcon className="size-5 text-foreground cursor-pointer mx-auto inline" />
        ) : (
          <SunIcon className="size-5 text-foreground cursor-pointer mx-auto inline" />
        )}
      </motion.button>
    </nav>
  );
}
