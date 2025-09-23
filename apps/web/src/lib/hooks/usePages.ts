import type { Tags } from "@/components/main/post-filters";
import type { Post } from "../types";
import { useMemo, useState } from "react";

const FETCH_OFFSET = 6;

export function usePages(postsJson: Post[]) {
  const [page, setPage] = useState(0);
  const [appliedFilters, setAppliedFilters] = useState<Tags>([]);

  console.log(appliedFilters);

  const start = useMemo(() => {
    return page * FETCH_OFFSET;
  }, [page]);

  const end = useMemo(() => {
    return start + FETCH_OFFSET;
  }, [start]);

  const isFirstPage = page === 0;
  const isLastPage = end >= postsJson.length;
  const currentPosts = Math.min(postsJson.length, (page + 1) * FETCH_OFFSET);

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
        return appliedFilters.every((filter) => post.tags.includes(filter));
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
    paginatedPosts,
    appliedFilters,
  };
}
