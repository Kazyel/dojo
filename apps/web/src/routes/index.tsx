import type { Post } from "@/lib/types";

import { z } from "zod";
import { useEffect, useRef } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useURLSync } from "@/lib/hooks/use-url-sync";
import { usePostsStore } from "@/lib/store/use-posts-store";
import postsJson from "@/lib/content/posts.json";

import { PostCard } from "@/components/posts/post-card";
import { PostFilters } from "@/components/posts/post-filters";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useIsMobile } from "@/lib/hooks/use-is-mobile";
import { PostFiltersModal } from "@/components/posts/post-filters-modal";

const searchSchema = z.object({
  tags: z.string().optional(),
  year: z.number().optional(),
});

export const Route = createFileRoute("/")({
  component: HomeComponent,
  validateSearch: searchSchema,
});

function HomeComponent() {
  const postsData = useRef(postsJson as unknown as Post[]);
  const isMobile = useIsMobile();

  const {
    initializePosts,
    nextPage,
    previousPage,
    isFirstPage,
    isLastPage,
    currentPosts,
    filteredPosts,
    paginatedPosts,
  } = usePostsStore();

  useEffect(() => {
    initializePosts(postsData.current);
  }, [postsData, initializePosts]);

  useURLSync();

  return (
    <main className="mx-auto max-w-5xl px-8 py-6 font-merriweather">
      <section>
        <div className="mb-5 mt-12">
          <h1 className="font-extrabold tracking-tighter text-6xl sm:text-7xl mb-6 font-unbounded text-foreground">
            Kazyel's Dojo
          </h1>

          <p className="text-lg text-muted-foreground text-pretty tracking-wide">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ipsam
            provident quae, sapiente nemo blanditiis maiores id labore natus
            amet sed sint culpa neque, quis necessitatibus cum a ullam! Aut,
            perferendis!
          </p>
        </div>

        <div className="py-4 flex flex-col w-full">
          <div className="flex items-center">
            <h2 className="font-extrabold tracking-tighter text-4xl font-unbounded text-foreground">
              Posts
            </h2>

            <div className="flex items-center justify-between w-full">
              <div className="flex ml-3 gap-x-1.5">
                <button
                  onClick={previousPage}
                  disabled={isFirstPage}
                  className="mt-1 cursor-pointer disabled:cursor-default disabled:opacity-30"
                >
                  <ChevronLeft className="size-6 stroke-3 text-foreground" />
                </button>

                <button
                  onClick={nextPage}
                  disabled={isLastPage}
                  className="mt-1 cursor-pointer disabled:cursor-default disabled:opacity-30"
                >
                  <ChevronRight className="size-6 stroke-3 text-foreground" />
                </button>
              </div>

              {isMobile && <PostFiltersModal />}
            </div>
          </div>

          <p className="text-primary/75 font-light text-lg">
            {currentPosts} of {filteredPosts.length} posts
          </p>
        </div>
      </section>

      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 relative">
        <div className="flex items-center justify-center gap-4.5 flex-wrap col-span-1 sm:col-span-2 lg:col-span-2 lg:justify-start">
          {postsData.current.length === 0 && (
            <p className="font-semibold text-lg text-foreground py-10 mx-auto">
              No posts available.
            </p>
          )}

          {paginatedPosts.map((post, index) => {
            return <PostCard post={post} index={index} key={index} />;
          })}
        </div>

        {!isMobile && <PostFilters />}
      </section>
    </main>
  );
}
