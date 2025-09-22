import { createFileRoute } from "@tanstack/react-router";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import postsJson from "@/lib/content/posts.json";

export const Route = createFileRoute("/")({
  component: HomeComponent,
});

function HomeComponent() {
  const FETCH_OFFSET = 6;

  const [page, setPage] = useState(0);

  const start = page * FETCH_OFFSET;
  const end = start + FETCH_OFFSET;
  const paginatedPosts = postsJson.slice(start, end);

  const fetchMorePosts = () => {
    if (end >= postsJson.length) return;
    setPage((prev) => prev + 1);
  };

  const fetchLessPosts = () => {
    if (page === 0) return;
    setPage((prev) => prev - 1);
  };

  if (!paginatedPosts) {
    return "error";
  }

  return (
    <section className="container mx-auto max-w-5xl px-8 py-6">
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
            <ChevronLeft
              className="size-6 stroke-3 mt-1 cursor-pointer"
              onClick={fetchLessPosts}
            />
            <ChevronRight
              className="size-6 stroke-3 mt-1 cursor-pointer"
              onClick={fetchMorePosts}
            />
          </div>
        </div>

        <p className="text-primary/75 font-light text-lg">
          {Math.min(postsJson.length, (page + 1) * FETCH_OFFSET)} of {postsJson.length}
        </p>
      </div>

      <div className="grid grid-cols-3 grid-rows-8 relative gap-3">
        <div className="flex items-center justify-center gap-4.5 flex-wrap col-span-3 lg:col-span-2 row-span-7">
          {paginatedPosts.map((post, index) => {
            return (
              <a
                key={`post-${index}`}
                href={post.link}
                className="relative group flex flex-col rounded-xl justify-between bg-foreground text-pretty px-4 py-5 w-[300px] h-[350px] hover:bg-foreground/85 transition-colors duration-150"
              >
                <div>
                  <p className="text-3xl font-semibold tracking-tight text-secondary">
                    {post.title}
                  </p>
                  <span className="text-acc-gold italic font-medium tracking-tight">
                    {post.postedOn}
                  </span>
                </div>

                <p className="text-lg text-secondary/80 tracking-tight line-clamp-3">
                  {post.description}
                </p>

                <span className="right-4.5 rounded-full bg-background p-1.5 absolute">
                  <ArrowUpRight className="text-foreground size-4.5 stroke-2" />
                </span>
              </a>
            );
          })}
        </div>

        <div className="top-3 border-l-2 border-foreground lg:row-span-2 lg:col-span-1 px-4 py-2 rounded-sm hidden lg:block lg:sticky">
          <p className="text-foreground text-xl font-bold tracking-tight">Filters</p>
        </div>
      </div>
    </section>
  );
}
