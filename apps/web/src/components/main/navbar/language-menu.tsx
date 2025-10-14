import { useState } from "react";
import { motion } from "motion/react";
import { LanguagesIcon } from "lucide-react";
import { SUPPORTED_LANGUAGES } from "@/routes/__root";

import { useClickOutside } from "@/lib/hooks/use-click-outside";
import { useOnScroll } from "@/lib/hooks/use-on-scroll";

export function LanguageMenu() {
  const [showLanguageMenu, setShowLanguageMenu] = useState(false);

  const ref = useClickOutside<HTMLDivElement>(() => {
    setShowLanguageMenu(false);
  });

  useOnScroll(() => setShowLanguageMenu(false));

  const setPreferredLanguage = (lang: string) => {
    localStorage.setItem("preferred-language", lang);
    window.location.reload();
    setShowLanguageMenu(false);
  };

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
        <motion.ul className="absolute left-0 mt-5 w-36 bg-popover border border-foreground/15 rounded-sm shadow-sm z-50 overflow-hidden">
          {SUPPORTED_LANGUAGES.map(({ code, name }) => (
            <li
              key={code}
              className="block w-full text-left px-4 py-2.5 text-sm text-foreground hover:bg-foreground/10"
              onClick={() => {
                setPreferredLanguage(code);
              }}
            >
              {name}
            </li>
          ))}
        </motion.ul>
      )}
    </div>
  );
}
