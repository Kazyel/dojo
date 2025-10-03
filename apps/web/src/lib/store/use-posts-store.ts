import type { Tags, Years } from "@/components/posts/post-filters";
import type { Post } from "@/lib/types";

import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";

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
  isFirstPage: boolean;
  isLastPage: boolean;
  totalPosts: number;
  currentPosts: number;

  initializePosts: (posts: Post[]) => void;
  setFilters: (filters: Filters | ((prev: Filters) => Filters)) => void;
  toggleTag: (tag: Tags[number]) => void;
  toggleYear: (year: Years[number]) => void;
  setPage: (page: number) => void;
  nextPage: () => void;
  previousPage: () => void;
  resetFilters: () => void;
  _computePagination: () => void;
  _computeFilteredPosts: () => void;
};

const ITEMS_PER_PAGE = 6;

const filterPosts = (posts: Post[], filters: Filters) => {
  if (filters.tags.size === 0 && filters.year === null) {
    return posts;
  }

  return posts.filter((post) => {
    const matchesTags =
      filters.tags.size === 0 ||
      [...filters.tags].every((tag) => post.tags.includes(tag as any));
    const matchesYear = filters.year === null || post.year === filters.year;
    return matchesTags && matchesYear;
  });
};

const createDefaultFilters = (): Filters => ({
  tags: new Set(),
  year: null,
});

export const usePostsStore = create<PostsStore>()(
  subscribeWithSelector((set, get) => ({
    posts: [],
    filteredPosts: [],
    paginatedPosts: [],
    page: 1,
    totalPages: 1,
    totalPosts: 0,
    currentPosts: 0,
    isFirstPage: true,
    isLastPage: true,
    filters: createDefaultFilters(),

    initializePosts: (posts) => {
      set({
        posts,
        filters: createDefaultFilters(),
        page: 1,
      });
      get()._computeFilteredPosts();
      get()._computePagination();
    },

    setFilters: (filtersOrUpdater) => {
      const newFilters =
        typeof filtersOrUpdater === "function"
          ? filtersOrUpdater(get().filters)
          : filtersOrUpdater;

      set({ filters: newFilters, page: 1 });
      get()._computeFilteredPosts();
      get()._computePagination();
    },

    toggleTag: (tag) => {
      get().setFilters((prev) => {
        const newTags = new Set(prev.tags);
        if (newTags.has(tag)) {
          newTags.delete(tag);
        } else {
          newTags.add(tag);
        }
        return { ...prev, tags: newTags };
      });
    },

    toggleYear: (year) => {
      get().setFilters((prev) => ({
        ...prev,
        year: prev.year === year ? null : year,
      }));
    },

    setPage: (page) => {
      set({ page });
      get()._computePagination();
    },

    nextPage: () => {
      const { page, totalPages } = get();
      const lastPage = Math.max(0, totalPages);
      set({ page: Math.min(page + 1, lastPage) });
      get()._computePagination();
    },

    previousPage: () => {
      const { page } = get();
      set({ page: Math.max(page - 1, 0) });
      get()._computePagination();
    },

    resetFilters: () => {
      set({ filters: createDefaultFilters(), page: 1 });
      get()._computeFilteredPosts();
      get()._computePagination();
    },

    _computeFilteredPosts: () => {
      const { posts, filters } = get();
      const filteredPosts = filterPosts(posts, filters);
      set({ filteredPosts });
    },

    _computePagination: () => {
      const { page, filteredPosts } = get();

      const totalPosts = filteredPosts.length;
      const totalPages = Math.max(1, Math.ceil(totalPosts / ITEMS_PER_PAGE));
      const lastPage = Math.max(0, totalPages);
      const currentPage = Math.min(page, lastPage);

      const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
      const endIndex = startIndex + ITEMS_PER_PAGE;

      const paginatedPosts = filteredPosts.slice(startIndex, endIndex);
      const currentPosts = Math.min(totalPosts, currentPage * ITEMS_PER_PAGE);

      const isFirstPage = currentPage === 1;
      const isLastPage = currentPage >= lastPage;

      set({
        paginatedPosts,
        totalPages,
        isFirstPage,
        isLastPage,
        totalPosts,
        currentPosts,
      });
    },
  }))
);
