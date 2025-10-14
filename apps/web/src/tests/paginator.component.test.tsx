import { expect, test, describe } from "vitest";

import { screen, render } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";

import type { Post } from "@/lib/types";
import { usePostsStore } from "@/lib/store/use-posts-store";

import type { Tags } from "@/components/main/posts/post-filters";
import { Paginator } from "@/components/main/paginator";

const startPaginator = (posts: Post[]) => {
  const { initializePosts } = usePostsStore.getState();
  initializePosts(posts);

  const rendered = render(<Paginator />);
  const user = userEvent.setup();
  return {
    rendered,
    user,
  };
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
    startPaginator(makePosts(10));
    screen.getByText("6 of 10 posts");
  });

  test("Next and previous buttons work", async () => {
    const { user } = startPaginator(makePosts(10));

    const [prevButton, nextButton] = screen.getAllByRole(
      "button"
    ) as HTMLButtonElement[];

    await user.click(nextButton);
    expect(screen.getByText("10 of 10 posts")).toBeInTheDocument();
    expect(prevButton).toBeEnabled();
    expect(nextButton).toBeDisabled();

    await user.click(prevButton);
    expect(screen.getByText("6 of 10 posts")).toBeInTheDocument();
    expect(prevButton).toBeDisabled();
    expect(nextButton).toBeEnabled();
  });
});
