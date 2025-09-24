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

export const syncFiltersWithURL = (searchProps: {
  tags?: "remove" | ((old: string | undefined) => string);
  year?: "remove" | null | number;
  navigate: UseNavigateResult<"/">;
}) => {
  searchProps.navigate({
    search: (old) => {
      const next: Record<string, any> = { ...old };

      if (searchProps.tags === "remove") {
        delete next.tags;
      }

      if (searchProps.year === "remove") {
        delete next.year;
      }

      if (typeof searchProps.tags === "function") {
        const updated = searchProps.tags(next.tags);
        next.tags = updated;
      }

      if (typeof searchProps.year === "number") {
        next.year = searchProps.year;
      }

      return next;
    },
    replace: true,
  });
};
