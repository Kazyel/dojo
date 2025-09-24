import type { Tags, Years } from "@/components/posts/post-filters";
import type { Post } from "../types";
import { useMemo, useState, useEffect } from "react";

export type Filters = {
  tags: Tags;
  year: Years[number] | "";
};

const FETCH_OFFSET = 6;

export default function usePosts(postsJson: Post[]) {
  const [page, setPage] = useState(0);

  const [filters, setFilters] = useState<Filters>({
    tags: [],
    year: "",
  });

  const start = useMemo(() => {
    return page * FETCH_OFFSET;
  }, [page]);

  const end = useMemo(() => {
    return start + FETCH_OFFSET;
  }, [start]);

  const availablePosts = useMemo(() => {
    return postsJson.filter((post) => {
      const matchesTags =
        filters.tags.length === 0 ||
        filters.tags.every((tag) => post.tags.includes(tag as any));

      const matchesYear = filters.year === "" || post.year === filters.year;

      return matchesTags && matchesYear;
    }).length;
  }, [filters, postsJson]);

  const nextPage = () => {
    if (end >= availablePosts) return;
    setPage((prev) => prev + 1);
  };

  const previousPage = () => {
    if (page === 0) return;
    setPage((prev) => prev - 1);
  };

  const isFirstPage = page === 0;
  const isLastPage = end >= availablePosts;

  useEffect(() => {
    const lastPage = Math.max(0, Math.ceil(availablePosts / FETCH_OFFSET) - 1);
    if (page > lastPage) {
      setPage(lastPage);
    }
  }, [availablePosts, page]);

  const paginatedPosts: Array<Post> = useMemo(() => {
    return postsJson
      .filter((post) => {
        const matchesTags =
          filters.tags.length === 0 ||
          filters.tags.every((tag) => post.tags.includes(tag as any));

        const matchesYear = filters.year === "" || post.year === filters.year;

        return matchesTags && matchesYear;
      })
      .slice(start, end);
  }, [start, end, postsJson, filters]);

  const currentPosts = Math.min(availablePosts, (page + 1) * FETCH_OFFSET);

  return {
    nextPage,
    previousPage,
    setFilters,
    isFirstPage,
    isLastPage,
    currentPosts,
    availablePosts,
    paginatedPosts,
    filters,
  };
}
