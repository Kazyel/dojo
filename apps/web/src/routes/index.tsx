import type { Post } from "@/lib/types";

import { createFileRoute, Route as currentRoute } from "@tanstack/react-router";

import postsJson from "@/lib/content/posts.json";
import { sanitizeInitialTags } from "@/lib/utils";
import { usePostsStore } from "@/lib/store/use-posts-store";

import { PostCard } from "@/components/posts/post-card";
import {
  PostFilters,
  type Tags,
  type Years,
} from "@/components/posts/post-filters";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useRef } from "react";
import { useURLSync } from "@/lib/hooks/use-url-sync";

type PageSearch = {
  page?: number;
  tags?: string;
  year?: number;
};

export const Route = createFileRoute("/")({
  component: HomeComponent,
  validateSearch: (search: Record<string, unknown>): PageSearch => {
    return {
      page: !search?.page ? undefined : Number(search?.page),
      tags: !search?.tags ? undefined : String(search?.tags),
      year: !search?.year ? undefined : Number(search?.year),
    };
  },
});

function HomeComponent() {
  const { page, tags, year } = Route.useSearch();
  const navigate = Route.useNavigate();

  useURLSync(Route as unknown as currentRoute);

  const postsData = useRef(postsJson as unknown as Post[]);

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

  const initialValues = {
    tags: tags
      ? new Set(sanitizeInitialTags(tags))
      : (new Set() as Set<Tags[number]>),
    year: (year ?? null) as Years[number] | null,
  };

  useEffect(() => {
    initializePosts(postsData.current, initialValues, page ?? 0);
  }, [postsData, initializePosts]);

  if (postsData.current.length === 0) {
    return (
      <div className="flex items-center justify-center w-full min-h-screen px-8 py-6 text-center text-acc-red font-semibold text-lg">
        Error getting the posts.
      </div>
    );
  }

  return (
    <main className="mx-auto max-w-5xl px-8 py-6 font-merriweather">
      <section>
        <div className="mb-5 mt-12">
          <h1 className="font-extrabold tracking-tighter text-7xl mb-6 font-unbounded text-foreground">
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
            <h2 className="font-extrabold tracking-tighter text-3xl font-unbounded text-foreground">
              Posts
            </h2>

            <div className="flex ml-3 gap-x-2">
              <button
                onClick={previousPage}
                disabled={isFirstPage}
                className="mt-1 cursor-pointer disabled:cursor-default disabled:opacity-60"
              >
                <ChevronLeft className="size-6 stroke-3 text-foreground" />
              </button>

              <button
                onClick={nextPage}
                disabled={isLastPage}
                className="mt-1 cursor-pointer disabled:cursor-default disabled:opacity-60"
              >
                <ChevronRight className="size-6 stroke-3 text-foreground" />
              </button>
            </div>
          </div>

          <p className="text-primary/75 font-light text-lg">
            {currentPosts} of {filteredPosts.length} posts
          </p>
        </div>
      </section>

      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 relative">
        <div className="flex items-center justify-center gap-4.5 flex-wrap col-span-1 sm:col-span-2 lg:col-span-2 lg:justify-start">
          {paginatedPosts.map((post, index) => {
            return <PostCard post={post} index={index} key={index} />;
          })}
        </div>

        <PostFilters />
      </section>
    </main>
  );
}
