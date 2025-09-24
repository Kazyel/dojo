import type { Post } from "@/lib/types";

import { createFileRoute } from "@tanstack/react-router";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { usePages } from "@/lib/hooks/usePages";
import { PostCard } from "@/components/posts/post-card";
import { PostFilters } from "@/components/posts/post-filters";

import postsJson from "@/lib/content/posts.json";

export const Route = createFileRoute("/")({
  component: HomeComponent,
});

function HomeComponent() {
  const posts = postsJson as unknown as Post[];

  const {
    nextPage,
    previousPage,
    setAppliedFilters,
    isFirstPage,
    isLastPage,
    currentPosts,
    availablePosts,
    paginatedPosts,
    appliedFilters,
  } = usePages(posts);

  if (postsJson.length === 0) {
    return (
      <div className="flex items-center justify-center w-full min-h-screen px-8 py-6 text-center text-acc-red font-semibold text-lg">
        Error getting the posts.
      </div>
    );
  }

  return (
    <main className="container mx-auto max-w-5xl px-8 py-6">
      <div className="mb-5 mt-12">
        <h1 className="font-extrabold tracking-tighter text-7xl mb-3">Kazyel's Dojo</h1>

        <p className="text-lg text-muted-foreground text-pretty">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ipsam provident quae,
          sapiente nemo blanditiis maiores id labore natus amet sed sint culpa neque, quis
          necessitatibus cum a ullam! Aut, perferendis!
        </p>
      </div>

      <div className="py-4 flex flex-col w-full">
        <div className="flex items-center">
          <h2 className="font-extrabold tracking-tighter text-4xl">Posts</h2>

          <div className="flex ml-3 gap-x-2">
            <button
              onClick={previousPage}
              disabled={isFirstPage}
              className="mt-1 cursor-pointer disabled:cursor-default disabled:opacity-60"
            >
              <ChevronLeft className="size-6 stroke-3" />
            </button>

            <button
              onClick={nextPage}
              disabled={isLastPage}
              className="mt-1 cursor-pointer disabled:cursor-default disabled:opacity-60"
            >
              <ChevronRight className="size-6 stroke-3" />
            </button>
          </div>
        </div>

        <p className="text-primary/75 font-light text-lg">
          {currentPosts} of {availablePosts} posts
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 relative">
        <div className="flex items-center justify-center gap-4.5 flex-wrap col-span-1 sm:col-span-2 lg:col-span-2 lg:justify-start">
          {paginatedPosts.map((post, index) => {
            return <PostCard post={post} key={index} />;
          })}
        </div>

        <PostFilters
          setAppliedFilters={setAppliedFilters}
          appliedFilters={appliedFilters}
        />
      </div>
    </main>
  );
}
