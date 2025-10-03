import { usePostsStore } from "@/lib/store/use-posts-store";

import { motion } from "motion/react";
import { PostTag } from "@/components/posts/post-tags";
import { Calendar, ListFilterPlus, ListRestart, Tags } from "lucide-react";

export type Tags = (typeof TAGS)[number][];
export type Years = (typeof YEARS)[number][];

const TAGS = ["coding", "random talk", "tips", "review", "thoughts"] as const;
const YEARS = [2025] as const;

export function PostFilters() {
  const { filters, resetFilters } = usePostsStore();

  return (
    <aside className="border-l-2 border-foreground pl-4.5 py-1.5 h-fit hidden lg:flex lg:flex-col lg:sticky lg:col-span-1 lg:top-4">
      <div className="flex items-center justify-between mb-2.5">
        <h2 className="text-foreground text-2xl font-extrabold tracking-tight font-unbounded">
          Filters
        </h2>

        {(filters.tags.size > 0 || filters.year) && (
          <motion.button
            className="cursor-pointer"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            whileTap={{ scale: 0.95 }}
            title="Reset filters"
            aria-label="Reset filters"
            onClick={resetFilters}
          >
            <ListRestart className="transition-all duration-200 hover:text-acc-red text-foreground" />
          </motion.button>
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
