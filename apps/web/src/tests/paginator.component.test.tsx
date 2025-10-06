import type { Post } from "@/lib/types";
import type { Tags } from "@/components/posts/post-filters";

import { screen, render, cleanup } from "@testing-library/react";
import { expect, test, describe } from "vitest";
import { usePostsStore } from "../lib/store/use-posts-store";
import { Paginator } from "@/components/main/paginator";

const makePosts = (count: number, year = 2025): Post[] =>
  Array.from({ length: count }).map((_, i) => ({
    id: i,
    slug: `p${i}`,
    title: `p${i}`,
    description: "desc",
    year: year,
    tags:
      i % 2 === 0
        ? (["coding"] as unknown as Tags)
        : (["thoughts"] as unknown as Tags),
  }));

describe("Paginator Component", () => {
  test("Paginator displays correct post counts", async () => {
    const { initializePosts } = usePostsStore.getState();
    initializePosts(makePosts(10));

    render(<Paginator />);

    await screen.findByText("6 of 10 posts");

    cleanup();
  });

  test("Paginator next and previous buttons work", async () => {
    const { initializePosts } = usePostsStore.getState();
    initializePosts(makePosts(10));

    render(<Paginator />);

    const [prevButton, nextButton] = (await screen.findAllByRole(
      "button"
    )) as HTMLButtonElement[];

    nextButton.click();
    expect(prevButton.disabled).toBe(true);
    expect(nextButton.disabled).toBe(false);
    expect(await screen.findByText("10 of 10 posts"));

    prevButton.click();
    expect(prevButton.disabled).toBe(false);
    expect(nextButton.disabled).toBe(true);
    expect(await screen.findByText("6 of 10 posts"));

    cleanup();
  });
});
