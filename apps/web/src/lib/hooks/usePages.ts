import type { Post } from "../types";
import { useMemo, useState } from "react";

const FETCH_OFFSET = 6;

export function usePages(postsJson: Array<Post>) {
  const [page, setPage] = useState(0);

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
    return postsJson.slice(start, end);
  }, [start, end]);

  return {
    nextPage,
    previousPage,
    isFirstPage,
    isLastPage,
    currentPosts,
    paginatedPosts,
  };
}
