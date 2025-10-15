import { useState } from "react";
import { motion } from "motion/react";
import { LanguagesIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { SUPPORTED_LANGUAGES } from "@/lib/utils";
import { useClickOutside } from "@/lib/hooks/use-click-outside";
import { useOnScroll } from "@/lib/hooks/use-on-scroll";
import { useLanguage } from "@/lib/hooks/use-language";

export function LanguageMenu() {
  const [showLanguageMenu, setShowLanguageMenu] = useState(false);

  const { preferredLanguage, setLanguage } = useLanguage();
  useOnScroll(() => setShowLanguageMenu(false));

  const ref = useClickOutside<HTMLDivElement>(() => {
    setShowLanguageMenu(false);
  });

  return (
    <div className="relative inline-block" ref={ref}>
      <motion.button
        animate={{ scale: 1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setShowLanguageMenu((prev) => !prev)}
      >
        <LanguagesIcon className="size-5 md:size-6 text-foreground cursor-pointer mx-auto inline" />
      </motion.button>

      {showLanguageMenu && (
        <motion.ul className="absolute -right-8 xl:left-0 mt-5 w-36 bg-popover border border-foreground/15 rounded-sm shadow-sm z-50 overflow-hidden">
          {SUPPORTED_LANGUAGES.map(({ code, name, icon: Icon }) => (
            <li key={code}>
              <button
                className={cn(
                  "flex items-center font-merriweather gap-x-2 w-full text-left px-3.5 py-2.5 hover:bg-foreground/10 text-sm sm:text-base text-foreground",
                  "disabled:font-bold disabled:bg-foreground/5 disabled:pointer-events-none"
                )}
                onClick={() => {
                  setLanguage(code);
                  setShowLanguageMenu(false);
                }}
                disabled={preferredLanguage === code}
              >
                <Icon className="size-4 shrink-0" />
                {name}
              </button>
            </li>
          ))}
        </motion.ul>
      )}
    </div>
  );
}
