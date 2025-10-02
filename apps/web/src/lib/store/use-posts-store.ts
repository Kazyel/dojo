import type { Tags, Years } from "@/components/posts/post-filters";
import type { Post } from "@/lib/types";
import type { UseNavigateResult } from "@tanstack/react-router";

import { create } from "zustand";
import { syncFiltersWithURL } from "../utils/url-sync";

export type Filters = {
  tags: Set<Tags[number]>;
  year: Years[number] | null;
};

type PostsStore = {
  posts: Post[];
  filters: Filters;
  page: number;

  filteredPosts: Post[];
  paginatedPosts: Post[];
  totalPages: number;
  currentPage: number;
  isFirstPage: boolean;
  isLastPage: boolean;
  totalPosts: number;
  currentPosts: number;

  initializePosts: (
    posts: Post[],
    initialFilters?: Filters,
    initialPage?: number
  ) => void;
  setFilters: (filters: Filters | ((prev: Filters) => Filters)) => void;
  setPage: (page: number) => void;
  nextPage: () => void;
  previousPage: () => void;
  resetFilters: () => void;
  toggleTag: (tag: Tags[number], navigate?: UseNavigateResult<"/">) => void;
  toggleYear: (year: Years[number], navigate?: UseNavigateResult<"/">) => void;

  _computeValues: () => void;
};

const ITEMS_PER_PAGE = 6;

const filterPosts = (posts: Post[], filters: Filters) => {
  return posts.filter((post) => {
    const matchesTags =
      filters.tags.size === 0 ||
      [...filters.tags].every((tag) => post.tags.includes(tag as any));
    const matchesYear = filters.year === null || post.year === filters.year;
    return matchesTags && matchesYear;
  });
};

const defaultFilters: Filters = {
  tags: new Set(),
  year: null,
};

export const usePostsStore = create<PostsStore>((set, get) => ({
  posts: [],
  filters: defaultFilters,
  page: 0,
  filteredPosts: [],
  paginatedPosts: [],
  totalPages: 1,
  currentPage: 0,
  isFirstPage: true,
  isLastPage: true,
  totalPosts: 0,
  currentPosts: 0,

  initializePosts: (posts, initialFilters, initialPage) => {
    set({
      posts,
      filters: initialFilters
        ? { ...defaultFilters, ...initialFilters }
        : defaultFilters,
      page: initialPage ?? 0,
    });
    get()._computeValues();
  },

  setFilters: (filtersOrUpdater) => {
    const newFilters =
      typeof filtersOrUpdater === "function"
        ? filtersOrUpdater(get().filters)
        : filtersOrUpdater;

    set({ filters: newFilters, page: 0 });
    get()._computeValues();
  },

  setPage: (page) => {
    set({ page });
    get()._computeValues();
  },

  nextPage: () => {
    const { page, totalPages } = get();
    const lastPage = Math.max(0, totalPages - 1);
    set({ page: Math.min(page + 1, lastPage) });
    get()._computeValues();
  },

  previousPage: () => {
    const { page } = get();
    set({ page: Math.max(page - 1, 0) });
    get()._computeValues();
  },

  resetFilters: () => {
    set({ filters: defaultFilters, page: 0 });
    get()._computeValues();
  },

  toggleTag: (tag: Tags[number], navigate?: UseNavigateResult<"/">) => {
    const { filters } = get();
    const newTags = new Set(filters.tags);
    const isRemoving = newTags.has(tag);

    if (isRemoving) {
      newTags.delete(tag);
    } else {
      newTags.add(tag);
    }

    set({
      filters: { ...filters, tags: newTags },
      page: 0,
    });
    get()._computeValues();

    if (navigate) {
      const action = isRemoving
        ? newTags.size === 0
          ? "remove"
          : "filter"
        : "add";

      syncFiltersWithURL({
        tagOptions: {
          action,
          ...(action !== "remove" && { tag }),
        },
        navigate,
      });
    }
  },

  toggleYear: (year: Years[number], navigate?: UseNavigateResult<"/">) => {
    const { filters } = get();
    const isRemoving = filters.year === year;
    const newYear = isRemoving ? null : year;

    set({
      filters: { ...filters, year: newYear },
      page: 0,
    });
    get()._computeValues();

    if (navigate) {
      syncFiltersWithURL({
        yearOptions: {
          action: isRemoving ? "remove" : "add",
          ...(!isRemoving && { year }),
        },
        navigate,
      });
    }
  },

  _computeValues: () => {
    const { posts, filters, page } = get();

    const filteredPosts = filterPosts(posts, filters);
    const totalPosts = filteredPosts.length;
    const totalPages = Math.max(1, Math.ceil(totalPosts / ITEMS_PER_PAGE));
    const lastPage = Math.max(0, totalPages - 1);
    const currentPage = Math.min(page, lastPage);

    const startIndex = currentPage * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const paginatedPosts = filteredPosts.slice(startIndex, endIndex);

    const currentPosts = Math.min(
      totalPosts,
      (currentPage + 1) * ITEMS_PER_PAGE
    );
    const isFirstPage = currentPage === 0;
    const isLastPage = currentPage >= lastPage;

    set({
      filteredPosts,
      paginatedPosts,
      totalPages,
      currentPage,
      isFirstPage,
      isLastPage,
      totalPosts,
      currentPosts,
    });
  },
}));
