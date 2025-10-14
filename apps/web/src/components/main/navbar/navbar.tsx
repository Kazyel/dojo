import { useRef, useState } from "react";
import { useTheme } from "next-themes";
import { motion } from "motion/react";
import { Link } from "@tanstack/react-router";
import { MoonIcon, SunIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { useOnScroll } from "@/lib/hooks/use-on-scroll";

import { LanguageMenu } from "@/components/main/navbar/language-menu";

export function Navbar() {
  const [showNavbar, setShowNavbar] = useState(true);

  const navRef = useRef<HTMLElement | null>(null);
  const { theme, setTheme } = useTheme();

  useOnScroll((bool) => setShowNavbar(bool!));

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
            "relative text-foreground ml-6 md:ml-7 text-base md:text-lg flex-1 font-extrabold tracking-tighter cursor-pointer font-unbounded border-l-2 pl-2",
            "before:absolute before:-left-6 md:before:-left-7 before:text-base md:before:text-lg before:content-['新'] transition-all duration-150",
            "hover:text-foreground/60"
          )}
        >
          Kazyel
        </h1>
      </Link>

      <div className="space-x-4">
        <LanguageMenu />

        <motion.button
          animate={{ scale: 1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() =>
            setTheme((prev) => (prev === "light" ? "dark" : "light"))
          }
        >
          {theme === "dark" ? (
            <MoonIcon className="size-5 md:size-6 text-foreground cursor-pointer mx-auto inline" />
          ) : (
            <SunIcon className="size-5 md:size-6 text-foreground cursor-pointer mx-auto inline" />
          )}
        </motion.button>
      </div>
    </nav>
  );
}
