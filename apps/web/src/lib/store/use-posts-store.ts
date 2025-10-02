import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";
import type { Tags, Years } from "@/components/posts/post-filters";
import type { Post } from "@/lib/types";

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
    initialFilters?: Partial<Filters>,
    initialPage?: number
  ) => void;

  setFilters: (filters: Filters | ((prev: Filters) => Filters)) => void;
  toggleTag: (tag: Tags[number]) => void;
  toggleYear: (year: Years[number]) => void;
  setPage: (page: number) => void;
  nextPage: () => void;
  previousPage: () => void;
  resetFilters: () => void;
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

export const usePostsStore = create<PostsStore>()(
  subscribeWithSelector((set, get) => ({
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

    initializePosts: (posts) => {
      set({
        posts,
        filters: defaultFilters,
        page: 0,
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
  }))
);
