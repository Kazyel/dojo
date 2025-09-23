import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import { AnimatePresence, motion } from "motion/react";
import { MoonIcon, SunIcon } from "lucide-react";

export default function Navbar() {
  const { theme, setTheme } = useTheme();

  return (
    <nav className="px-3.5 py-2.5 flex justify-between items-center sticky top-0 w-full z-50 bg-background xl:bg-transparent">
      <a href={"/"}>
        <h1
          className={cn(
            "relative text-foreground ml-7 text-lg flex-1 font-extrabold tracking-tighter cursor-pointer",
            "before:absolute before:-left-6 before:text-lg before:content-['新'] transition-all duration-150",
            "hover:text-foreground/60"
          )}
        >
          Kazyel
        </h1>
      </a>

      <button onClick={() => setTheme((prev) => (prev === "light" ? "dark" : "light"))}>
        <AnimatePresence mode="wait">
          <motion.span
            key={theme === "dark" ? "dark" : "light"}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ type: "spring", duration: 0.1 }}
          >
            {theme === "dark" ? (
              <MoonIcon className="size-5 text-foreground cursor-pointer" />
            ) : (
              <SunIcon className="size-5 text-foreground cursor-pointer" />
            )}
          </motion.span>
        </AnimatePresence>
      </button>
    </nav>
  );
}
