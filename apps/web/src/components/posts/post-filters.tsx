import { usePostsStore } from "@/lib/store/use-posts-store";

import { PostTag } from "@/components/posts/post-tags";
import { Calendar, ListFilterPlus, Tags } from "lucide-react";

export type Tags = (typeof TAGS)[number][];
export type Years = (typeof YEARS)[number][];

const TAGS = ["coding", "random talk", "tips", "review", "thoughts"] as const;
const YEARS = [2025] as const;

export function PostFilters() {
  const { filters, resetFilters } = usePostsStore();

  return (
    <aside className="top-3 border-l border-foreground/65 px-4 pt-2 pb-4 rounded-sm hidden lg:flex lg:flex-col lg:sticky lg:col-span-1 h-fit">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-x-1.5">
          <ListFilterPlus className="size-6 text-foreground" />

          <h2 className="text-foreground text-2xl font-extrabold tracking-tight font-unbounded">
            Filters
          </h2>
        </div>

        {(filters.tags.size > 0 || filters.year) && (
          <button
            onClick={resetFilters}
            className="text-xs border border-acc-red/50 text-primary font-mono font-extrabold cursor-pointer transition-all duration-200 hover:bg-acc-red bg-acc-red/10 px-1.5 py-0.5 rounded-sm"
          >
            Reset
          </button>
        )}
      </div>

      <div className="flex flex-wrap gap-2 mb-5">
        <div className="w-full flex items-center gap-x-2">
          <Tags className="size-5 text-acc-red" />

          <h3 className="font-semibold font-unbounded text-foreground/85">
            Tags
          </h3>
        </div>

        {TAGS.map((tag) => {
          return <PostTag key={tag} type="tag" tag={tag} />;
        })}
      </div>

      <div className="flex flex-wrap gap-2">
        <div className="w-full flex items-center gap-x-2">
          <Calendar className="size-5 text-acc-red" />

          <h3 className="font-semibold font-unbounded text-foreground/85">
            Years
          </h3>
        </div>

        {YEARS.map((year) => {
          return <PostTag key={year} type="year" tag={year} />;
        })}
      </div>
    </aside>
  );
}
