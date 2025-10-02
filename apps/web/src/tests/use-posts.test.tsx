import type { Post } from "@/lib/types";
import type { Tags } from "@/components/posts/post-filters";

import { expect, test } from "vitest";
import { renderHook, act } from "@testing-library/react";

const makePosts = (count: number, year = 2025): Post[] =>
  Array.from({ length: count }).map((_, i) => ({
    title: `p${i}`,
    description: "desc",
    link: `/p/${i}`,
    year: year,
    tags:
      i % 2 === 0
        ? (["coding"] as unknown as Tags[])
        : (["thoughts"] as unknown as Tags[]),
  }));

test("pagination and counts work with default filters", () => {
  const posts = makePosts(10);
  const { result } = renderHook(() => usePosts(posts));
  expect(result.current.paginatedPosts).toHaveLength(6);
  expect(result.current.availablePosts).toBe(10);
  expect(result.current.currentPosts).toBe(6);
});

test("year filter returns only matching posts and clamps page", () => {
  const posts = [...makePosts(3, 2025), ...makePosts(6, 2024)];
  const { result } = renderHook(() => usePosts(posts as Post[]));

  act(() => {
    result.current.nextPage();
  });

  act(() => {
    result.current.setFilters({ tags: [], year: 2025 });
  });

  expect(result.current.availablePosts).toBe(3);
  expect(result.current.paginatedPosts.every((p) => p.year === 2025)).toBe(
    true
  );
  expect(result.current.isFirstPage).toBe(true);
});

test("tag filter returns only matching posts and clamps page", () => {
  const posts = makePosts(10);
  const { result } = renderHook(() => usePosts(posts as Post[]));

  act(() => {
    result.current.nextPage();
  });

  act(() => {
    result.current.setFilters({ tags: ["coding"], year: null });
  });

  expect(result.current.availablePosts).toBe(5);
  expect(
    result.current.paginatedPosts.every((p) => p.tags.includes("coding" as any))
  ).toBe(true);
  expect(result.current.isFirstPage).toBe(true);
});

test("combined filters return only matching posts", () => {
  const posts = [...makePosts(3, 2025), ...makePosts(6, 2024)];
  const { result } = renderHook(() => usePosts(posts as Post[]));

  act(() => {
    result.current.setFilters({ tags: ["coding"], year: 2024 as any });
  });

  expect(result.current.availablePosts).toBe(3);

  expect(
    result.current.paginatedPosts.every(
      (p) => p.tags.includes("coding" as any) && p.year === 2024
    )
  ).toBe(true);
});
