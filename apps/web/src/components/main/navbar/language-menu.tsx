import { useState } from "react";
import { useTranslation } from "react-i18next";
import { AnimatePresence, motion } from "motion/react";
import { LanguagesIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { SUPPORTED_LANGUAGES } from "@/lib/utils";
import { useClickOutside } from "@/lib/hooks/use-click-outside";
import { useOnScroll } from "@/lib/hooks/use-on-scroll";
import { useRouter } from "@tanstack/react-router";

export function LanguageMenu() {
  const [showLanguageMenu, setShowLanguageMenu] = useState(false);
  const router = useRouter();
  const { i18n } = useTranslation();

  useOnScroll(() => setShowLanguageMenu(false));

  const ref = useClickOutside<HTMLDivElement>(() => {
    setShowLanguageMenu(false);
  });

  const changeLanguage = (languageCode: string) => {
    if (localStorage.getItem("preferred-language")) {
      localStorage.setItem("preferred-language", languageCode);
    }

    i18n.changeLanguage(languageCode);
    router.invalidate();
  }

  return (
    <div className="relative inline-block" ref={ref}>
      <motion.button
        animate={{ scale: 1 }}
        whileTap={{ scale: 0.85 }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 20,
        }}
        className="will-change-transform"
        onClick={() => setShowLanguageMenu((prev) => !prev)}
      >
        <LanguagesIcon className="size-5 md:size-6 text-foreground cursor-pointer mx-auto inline" />
      </motion.button>

      <AnimatePresence>
        {showLanguageMenu && (
          <motion.ul
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.15 }}
            exit={{ opacity: 0 }}
            className="absolute -right-8 xl:left-0 mt-5 w-36 bg-popover border border-foreground/5 rounded shadow-sm z-50 overflow-hidden">

            {SUPPORTED_LANGUAGES.map(({ code, name, icon: Icon }) => (
              <li key={code}>
                <button
                  className={cn(
                    "flex items-center font-merriweather gap-x-2 w-full text-left px-3.5 py-2.5 hover:bg-foreground/10 text-sm sm:text-base text-foreground",
                    "disabled:font-bold disabled:bg-foreground/5 disabled:pointer-events-none"
                  )}
                  onClick={() => {
                    changeLanguage(code);
                    setShowLanguageMenu(false);
                  }}
                  disabled={i18n.resolvedLanguage === code}
                >
                  <Icon className="size-4 shrink-0" />
                  {name}
                </button>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
