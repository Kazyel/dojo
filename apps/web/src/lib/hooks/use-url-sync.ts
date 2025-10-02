import { useNavigate, useSearch } from "@tanstack/react-router";
import { useEffect } from "react";
import { usePostsStore } from "../store/use-posts-store";
import type { Years } from "@/components/posts/post-filters";
import { sanitizeInitialTags } from "../utils";

type PageSearch = {
  tags?: string;
  year?: number;
};

export function useURLSync() {
  const navigate = useNavigate({ from: "/" });
  const { tags, year }: PageSearch = useSearch({ from: "__root__" });

  useEffect(() => {
    const unsubscribe = usePostsStore.subscribe(
      (state) => state.filters,
      (filters) => {
        navigate({
          search: (prev) => {
            const newSearch: Record<string, any> = {};

            if (filters.tags.size > 0) {
              newSearch.tags = [...filters.tags].join(",");
            }

            if (filters.tags.size <= 0) {
              delete prev.tags;
            }

            if (filters.year) {
              newSearch.year = filters.year;
            }

            if (!filters.year) {
              delete prev.year;
            }

            return { ...prev, ...newSearch };
          },
          replace: true,
        });
      },
      { fireImmediately: false }
    );

    return unsubscribe;
  }, [navigate]);

  useEffect(() => {
    if (!tags && !year) return;

    const setFilters = usePostsStore.getState().setFilters;
    setFilters({
      tags: tags ? new Set(sanitizeInitialTags(tags)) : new Set(),
      year: (year as Years[number]) ?? null,
    });
  }, [tags, year]);
}
