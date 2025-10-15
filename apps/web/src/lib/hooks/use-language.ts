import { useEffect, useState } from "react";
import { useRouter } from "@tanstack/react-router";

import type { SupportedLanguage } from "@/lib/utils";

export function useLanguage() {
  const [preferredLanguage, setPreferredLanguage] =
    useState<SupportedLanguage>("en");

  const router = useRouter();

  useEffect(() => {
    const storedLanguage = localStorage.getItem(
      "preferred-language"
    ) as SupportedLanguage;

    if (storedLanguage) {
      setPreferredLanguage(storedLanguage);
    }
  }, []);

  async function setLanguage(code: SupportedLanguage) {
    localStorage.setItem("preferred-language", code);
    setPreferredLanguage(code);
    document.documentElement.lang = code;
    await router?.invalidate();
  }

  return { preferredLanguage, setLanguage };
}
