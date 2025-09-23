import type { Post } from "@/lib/types";
import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";

import postsJson from "@/lib/content/posts.json";
import { usePages } from "@/lib/hooks/usePages";

export const Route = createFileRoute("/")({
  component: HomeComponent,
});

function HomeComponent() {
  const {
    nextPage,
    previousPage,
    isFirstPage,
    isLastPage,
    currentPosts,
    paginatedPosts,
  } = usePages(postsJson);

  if (postsJson.length === 0) {
    return <div>"Error getting the posts.";</div>;
  }

  return (
    <main className="container mx-auto max-w-5xl px-8 py-6">
      <div className="mb-6 mt-12">
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
          {currentPosts} of {postsJson.length}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 relative">
        <article className="flex items-center justify-center gap-4.5 flex-wrap col-span-1 sm:col-span-2 lg:col-span-2">
          {paginatedPosts.map((post, index) => {
            return (
              <Link
                key={index}
                to={post.link}
                className="relative group flex flex-col rounded-xl justify-between bg-foreground px-4 py-5 w-full md:w-[300px] md:h-[350px] hover:bg-foreground/85 transition-colors duration-150"
              >
                <div>
                  <p className="text-3xl font-semibold tracking-tight text-secondary text-balance">
                    {post.title}
                  </p>
                  <span className="text-acc-gold italic font-medium tracking-tight">
                    {post.postedOn}
                  </span>
                </div>

                <p className="text-lg text-secondary/80 tracking-tight line-clamp-1 md:line-clamp-3 text-pretty">
                  {post.description}
                </p>

                <span className="right-4.5 rounded-full bg-background p-1.5 absolute">
                  <ArrowUpRight className="text-foreground size-4.5 stroke-2" />
                </span>
              </Link>
            );
          })}
        </article>

        <aside className="top-3 border-l-2 border-foreground px-4 py-2 rounded-sm hidden lg:block lg:sticky lg:col-span-1 max-h-[350px]">
          <p className="text-foreground text-xl font-bold tracking-tight">Filters</p>
        </aside>
      </div>
    </main>
  );
}
