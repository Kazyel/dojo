import type { Tags, Years } from "@/components/posts/post-filters";

import { useEffect } from "react";
import { usePostsStore } from "../store/use-posts-store";
import { Route } from "@tanstack/react-router";
import { sanitizeInitialTags } from "../utils";

export function useURLSync(Route: Route) {
  const navigate = Route.useNavigate();
  const searchParams: Record<string, string | number> = Route.useSearch();

  useEffect(() => {
    const unsubscribe = usePostsStore.subscribe(
      (state) => state.filters,
      (filters) => {
        const params = new URLSearchParams();

        if (filters.tags.size > 0) {
          params.set("tags", [...filters.tags].join(","));
        }

        if (filters.year) {
          params.set("year", filters.year.toString());
        }

        const search = params.toString();
        const newPath = search ? `?${search}` : window.location.pathname;
        navigate({
          to: newPath,
          replace: true,
        });
      },
      { fireImmediately: false }
    );

    return unsubscribe;
  }, [navigate]);

  useEffect(() => {
    const yearParam = searchParams["year"];
    const tagsParam = searchParams["tags"];
    const pageParam = searchParams["page"];

    const setFilters = usePostsStore.getState().setFilters;
    const setPage = usePostsStore.getState().setPage;

    if (!pageParam) {
      return;
    }

    if (!tagsParam && !yearParam) return;

    setFilters((prev) => ({
      tags: tagsParam
        ? new Set(sanitizeInitialTags(tagsParam as string))
        : prev.tags,
      year: yearParam ? (Number(yearParam) as Years[number]) : prev.year,
    }));

    setPage(Number(pageParam));
  }, []);
}
