import { renderHook, act } from "@testing-library/react";
import { expect, test } from "vitest";
import { describe } from "node:test";

import type { Post } from "@/lib/types";
import { usePostsStore } from "@/lib/store/use-posts-store";

import type { Tags } from "@/components/main/posts/post-filters";

const makePosts = (count: number, year = 2025): Post[] =>
  Array.from({ length: count }).map((_, i) => ({
    id: i,
    title: `p${i}`,
    description: "desc",
    slug: `p${i}`,
    year: year,
    tags:
      i % 2 === 0
        ? (["coding"] as unknown as Tags)
        : (["thoughts"] as unknown as Tags),
  }));

describe("Posts Store", () => {
  test("Initialize posts working correctly", () => {
    const { result } = renderHook(() => usePostsStore());

    act(() => {
      result.current.initializePosts(makePosts(10));
    });

    expect(result.current.posts.length).toBe(10);
    expect(result.current.filteredPosts.length).toBe(10);
    expect(result.current.paginatedPosts.length).toBe(6);
    expect(result.current.totalPages).toBe(2);
    expect(result.current.isFirstPage).toBe(true);
    expect(result.current.isLastPage).toBe(false);
    expect(result.current.totalPosts).toBe(10);
    expect(result.current.currentPosts).toBe(6);
  });

  test("Pagination working correctly", () => {
    const { result } = renderHook(() => usePostsStore());

    act(() => {
      result.current.initializePosts(makePosts(10));
    });

    expect(result.current.page).toBe(1);
    expect(result.current.isFirstPage).toBe(true);
    expect(result.current.isLastPage).toBe(false);

    act(() => {
      result.current.nextPage();
    });

    expect(result.current.page).toBe(2);
    expect(result.current.isFirstPage).toBe(false);
    expect(result.current.isLastPage).toBe(true);
    expect(result.current.paginatedPosts.length).toBe(4);
    expect(result.current.currentPosts).toBe(10);

    act(() => {
      result.current.previousPage();
    });

    expect(result.current.page).toBe(1);
    expect(result.current.isFirstPage).toBe(true);
    expect(result.current.isLastPage).toBe(false);
    expect(result.current.paginatedPosts.length).toBe(6);
    expect(result.current.currentPosts).toBe(6);

    act(() => {
      result.current.setPage(2);
    });

    expect(result.current.page).toBe(2);
    expect(result.current.isFirstPage).toBe(false);
    expect(result.current.isLastPage).toBe(true);
    expect(result.current.paginatedPosts.length).toBe(4);
    expect(result.current.currentPosts).toBe(10);
  });

  test("Filtering working correctly", () => {
    const { result } = renderHook(() => usePostsStore());

    act(() => {
      result.current.initializePosts(
        makePosts(10, 2025).concat(makePosts(10, 2024))
      );
    });

    act(() => {
      result.current.setFilters({ tags: new Set(["coding"]), year: null });
    });

    expect(result.current.filteredPosts.length).toBe(10);
    expect(result.current.totalPosts).toBe(10);
    expect(result.current.paginatedPosts.length).toBe(6);
    expect(result.current.currentPosts).toBe(6);
  });

  test("Resetting filters working correctly", () => {
    const { result } = renderHook(() => usePostsStore());

    act(() => {
      result.current.initializePosts(
        makePosts(10, 2025).concat(makePosts(10, 2024))
      );
    });

    act(() => {
      result.current.setFilters({ tags: new Set(["coding"]), year: null });
    });

    expect(result.current.filteredPosts.length).toBe(10);
    expect(result.current.paginatedPosts.length).toBe(6);
    expect(result.current.totalPosts).toBe(10);
    expect(result.current.currentPosts).toBe(6);

    act(() => {
      result.current.resetFilters();
    });

    expect(result.current.filteredPosts.length).toBe(20);
    expect(result.current.paginatedPosts.length).toBe(6);
    expect(result.current.totalPosts).toBe(20);
    expect(result.current.currentPosts).toBe(6);
  });
});
