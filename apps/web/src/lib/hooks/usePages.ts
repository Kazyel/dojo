import type { Tags } from "@/components/posts/post-filters";
import type { Post } from "../types";
import { useMemo, useState } from "react";

const FETCH_OFFSET = 6;

export function usePages(postsJson: Post[]) {
  const [page, setPage] = useState(0);
  const [appliedFilters, setAppliedFilters] = useState<Tags>([]);

  const start = useMemo(() => {
    return page * FETCH_OFFSET;
  }, [page]);

  const end = useMemo(() => {
    return start + FETCH_OFFSET;
  }, [start]);

  const isFirstPage = page === 0;
  const isLastPage = end >= postsJson.length;

  const availablePosts =
    appliedFilters.length === 0
      ? postsJson.length
      : postsJson.filter((post) => {
          return appliedFilters.every((filter) => post.tags.includes(filter as any));
        }).length;

  const currentPosts = Math.min(availablePosts, (page + 1) * FETCH_OFFSET);

  const nextPage = () => {
    if (end >= postsJson.length) return;
    setPage((prev) => prev + 1);
  };

  const previousPage = () => {
    if (page === 0) return;
    setPage((prev) => prev - 1);
  };

  const paginatedPosts: Array<Post> = useMemo(() => {
    return postsJson
      .filter((post) => {
        if (appliedFilters.length === 0) return true;
        return appliedFilters.every((filter) => post.tags.includes(filter as any));
      })
      .slice(start, end);
  }, [start, end, postsJson, appliedFilters]);

  return {
    nextPage,
    previousPage,
    setAppliedFilters,
    isFirstPage,
    isLastPage,
    currentPosts,
    availablePosts,
    paginatedPosts,
    appliedFilters,
  };
}
