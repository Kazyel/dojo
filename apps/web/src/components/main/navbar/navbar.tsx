import { useRef, useState } from "react";
import { Link } from "@tanstack/react-router";

import { cn } from "@/lib/utils";
import { useOnScroll } from "@/lib/hooks/use-on-scroll";

import { LanguageMenu } from "@/components/main/navbar/language-menu";
import { ThemeChanger } from "@/components/main/navbar/theme-changer";

export function Navbar() {
  const [showNavbar, setShowNavbar] = useState(true);

  const navRef = useRef<HTMLElement | null>(null);

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
        <ThemeChanger />
      </div>
    </nav>
  );
}
