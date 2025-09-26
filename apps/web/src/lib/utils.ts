import type { Tags } from "@/components/posts/post-filters";
import type { UseNavigateResult } from "@tanstack/react-router";

import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const sanitizeInitialTags = (tags: string) => {
  return tags.split(",").map((tag) => tag.trim().toLowerCase()) as Tags;
};
