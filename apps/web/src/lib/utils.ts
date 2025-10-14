import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

import type { Tags } from "@/components/main/posts/post-filters";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const sanitizeInitialTags = (tags: string) => {
  return new Set(tags.split(",").map((tag) => tag.trim().toLowerCase())) as Set<
    Tags[number]
  >;
};
