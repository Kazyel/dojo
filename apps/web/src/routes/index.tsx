import type { Post } from "@/lib/types";

import { createFileRoute } from "@tanstack/react-router";

import usePosts from "@/lib/hooks/use-posts";
import postsJson from "@/lib/content/posts.json";
import { sanitizeInitialTags } from "@/lib/utils";

import { PostCard } from "@/components/posts/post-card";
import { PostFilters, type Years } from "@/components/posts/post-filters";
import { ChevronLeft, ChevronRight } from "lucide-react";

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
  const navigate = Route.useNavigate();
  const { page, tags, year } = Route.useSearch();

  const posts = postsJson as unknown as Post[];

  const {
    nextPage,
    previousPage,
    setFilters,
    filters,
    isFirstPage,
    isLastPage,
    currentPosts,
    availablePosts,
    paginatedPosts,
  } = usePosts(posts, {
    initialProps: {
      page: page ?? 0,
      tags: tags ? sanitizeInitialTags(tags) : [],
      year: year ? (year as Years[number]) : null,
    },
  });

  if (posts.length === 0) {
    return (
      <div className="flex items-center justify-center w-full min-h-screen px-8 py-6 text-center text-acc-red font-semibold text-lg">
        Error getting the posts.
      </div>
    );
  }

  return (
    <main className="container mx-auto max-w-5xl px-8 py-6">
      <section>
        <div className="mb-5 mt-12">
          <h1 className="font-extrabold tracking-tighter text-7xl mb-3">Kazyel's Dojo</h1>

          <p className="text-lg text-muted-foreground text-pretty">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ipsam provident
            quae, sapiente nemo blanditiis maiores id labore natus amet sed sint culpa
            neque, quis necessitatibus cum a ullam! Aut, perferendis!
          </p>
        </div>

        <div className="py-4 flex flex-col w-full">
          <div className="flex items-center">
            <h2 className="font-extrabold tracking-tighter text-4xl">Posts</h2>

            <div className="flex ml-3 gap-x-2">
              <button
                onClick={() => {
                  navigate({
                    search: { page: Math.max(0, (page ?? 0) - 1), tags, year },
                    replace: true,
                  });
                  previousPage();
                }}
                disabled={isFirstPage}
                className="mt-1 cursor-pointer disabled:cursor-default disabled:opacity-60"
              >
                <ChevronLeft className="size-6 stroke-3" />
              </button>

              <button
                onClick={() => {
                  navigate({
                    search: { page: Math.max(0, (page ?? 0) + 1), tags, year },
                    replace: true,
                  });
                  nextPage();
                }}
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
      </section>

      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 relative">
        <div className="flex items-center justify-center gap-4.5 flex-wrap col-span-1 sm:col-span-2 lg:col-span-2 lg:justify-start">
          {paginatedPosts.map((post, index) => {
            return <PostCard post={post} index={index} key={index} />;
          })}
        </div>

        <PostFilters setFilters={setFilters} filters={filters} />
      </section>
    </main>
  );
}
