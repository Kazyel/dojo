import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

import type { Tags } from "@/components/main/posts/post-filters";
import { enUsFlag } from "@/components/svg/en-us";
import { ptBrFlag } from "@/components/svg/pt-br";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const sanitizeInitialTags = (tags: string) => {
  return new Set(tags.split(",").map((tag) => tag.trim().toLowerCase())) as Set<
    Tags[number]
  >;
};

export const SUPPORTED_LANGUAGES = [
  { code: "en", name: "English", icon: enUsFlag },
  { code: "pt", name: "Português", icon: ptBrFlag },
] as const;

export type SupportedLanguage = (typeof SUPPORTED_LANGUAGES)[number]["code"];

export function getUserLanguage(): string {
  if (localStorage.getItem("preferred-language")) {
    return localStorage.getItem("preferred-language")!;
  }

  const detected = navigator.language.split("-")[0];

  if (SUPPORTED_LANGUAGES.map((lang) => lang.code).includes(detected as any)) {
    return detected;
  }
  return "en";
}
