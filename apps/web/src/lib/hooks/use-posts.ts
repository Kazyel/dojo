import type { Tags, Years } from "@/components/posts/post-filters";
import type { Post } from "../types";
import { useMemo, useState } from "react";

export type Filters = {
  tags: Tags;
  year: Years[number] | null;
};

type InitialProps = {
  page?: number;
  tags?: Tags;
  year?: Years[number] | null;
};

const FETCH_OFFSET = 6;

export default function usePosts(
  postsJson: Post[],
  options?: {
    initialProps?: InitialProps;
  }
) {
  const [page, setPage] = useState(options?.initialProps?.page ?? 0);

  const [filters, setFilters] = useState<Filters>({
    tags: options?.initialProps?.tags ?? [],
    year: options?.initialProps?.year ?? null,
  });

  const availablePosts = useMemo(() => {
    return postsJson.filter((post) => {
      const matchesTags =
        filters.tags.length === 0 ||
        filters.tags.every((tag) => post.tags.includes(tag as any));

      const matchesYear = filters.year === null || post.year === filters.year;

      return matchesTags && matchesYear;
    }).length;
  }, [filters, postsJson]);

  const totalPages = Math.max(1, Math.ceil(availablePosts / FETCH_OFFSET));
  const lastPage = Math.max(0, totalPages - 1);

  // const updateSearchPage = (page: number) => {
  //   const newURL = new URL(window.location.href);

  //   if (page === 0) {
  //     newURL.searchParams.delete("page");
  //     window.history.replaceState({}, "", newURL.toString());
  //     return;
  //   }

  //   newURL.searchParams.set("page", String(page));
  //   window.history.replaceState({}, "", newURL.toString());
  // };

  // if (page > lastPage) {
  //   updateSearchPage(lastPage);
  // }

  // if (page < 0) {
  //   updateSearchPage(0);
  // }

  const effectivePage = Math.min(page, lastPage);

  const nextPage = () => {
    if (effectivePage >= lastPage) return;
    setPage((prev) => Math.min(prev + 1, lastPage));
  };

  const previousPage = () => {
    if (effectivePage === 0) return;
    setPage((prev) => Math.max(prev - 1, 0));
  };

  const isFirstPage = effectivePage === 0;
  const isLastPage = effectivePage >= lastPage;

  const paginatedPosts: Array<Post> = useMemo(() => {
    const effStart = effectivePage * FETCH_OFFSET;
    const effEnd = effStart + FETCH_OFFSET;

    return postsJson
      .filter((post) => {
        const matchesTags =
          filters.tags.length === 0 ||
          filters.tags.every((tag) => post.tags.includes(tag as any));

        const matchesYear = filters.year === null || post.year === filters.year;

        return matchesTags && matchesYear;
      })
      .slice(effStart, effEnd);
  }, [effectivePage, postsJson, filters]);

  const currentPosts = Math.min(availablePosts, (effectivePage + 1) * FETCH_OFFSET);

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
