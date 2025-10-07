import type { Post } from "@/lib/types";
import type { Tags } from "@/components/posts/post-filters";

import { screen, cleanup, render } from "@testing-library/react";
import { expect, test, describe, afterEach } from "vitest";

import { usePostsStore } from "@/lib/store/use-posts-store";
import { Paginator } from "@/components/main/paginator";

afterEach(() => {
  cleanup();
});

const renderAndInitialize = (posts: Post[]) => {
  const { initializePosts } = usePostsStore.getState();
  initializePosts(posts);
  return render(<Paginator />);
};

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
  test("Displays correct post counts", async () => {
    renderAndInitialize(makePosts(10));

    await screen.findByText("6 of 10 posts");
  });

  test("Next and previous buttons work", async () => {
    renderAndInitialize(makePosts(10));

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
  });
});
