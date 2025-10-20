import { useTheme } from "next-themes";
import { motion } from "motion/react"
import { MoonIcon, SunIcon } from "lucide-react";

export function ThemeChanger() {
  const { theme, setTheme } = useTheme();

  const updateTheme = () => {
    if (!document.startViewTransition) {
      setTheme((prev) => (prev === "light" ? "dark" : "light"))
      return
    }

    document.startViewTransition(() => setTheme((prev) => (prev === "light" ? "dark" : "light")))
  }


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
      onClick={updateTheme}
    >
      {theme === "dark" ? (
        <MoonIcon className="size-5 md:size-6 text-foreground cursor-pointer mx-auto inline shrink-0" />
      ) : (
        <SunIcon className="size-5 md:size-6 text-foreground cursor-pointer mx-auto inline shrink-0" />
      )}
    </motion.button>
  )
}
