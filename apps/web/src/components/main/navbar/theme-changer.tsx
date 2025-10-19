import { MoonIcon, SunIcon } from "lucide-react";
import { motion } from "motion/react"
import { useTheme } from "next-themes";

export function ThemeChanger() {
  const { theme, setTheme } = useTheme();

  return (
    <motion.button
      animate={{ scale: 1 }}
      whileTap={{ scale: 0.85 }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 20,
      }}
      className="will-change-transform"
      onClick={() =>
        setTheme((prev) => (prev === "light" ? "dark" : "light"))
      }
    >
      {theme === "dark" ? (
        <MoonIcon className="size-5 md:size-6 text-foreground cursor-pointer mx-auto inline shrink-0" />
      ) : (
        <SunIcon className="size-5 md:size-6 text-foreground cursor-pointer mx-auto inline shrink-0" />
      )}
    </motion.button>
  )
}
