import { motion } from "motion/react";
import { useTranslation } from "react-i18next";
import { Calendar, ListRestart, Tags } from "lucide-react";

import { cn } from "@/lib/utils";
import { useIsMobile } from "@/lib/hooks/use-is-mobile";
import { usePostsStore } from "@/lib/store/use-posts-store";

import { PostTag } from "@/components/main/posts/post-tags";

export type Tags = (typeof TAGS)[number][];
export type Years = (typeof YEARS)[number][];

const TAGS = ["coding", "random talk", "tips", "review", "thoughts"] as const;
const YEARS = [2025] as const;

export function PostFilters() {
  const { filters, resetFilters } = usePostsStore();
  const { t } = useTranslation();
  const isMobile = useIsMobile();

  return (
    <aside className="border-foreground h-fit flex flex-col sticky col-span-1 top-4 bg-acc-gold/15 dark:bg-acc-red/5 p-6 rounded">
      <div
        className={cn(
          `flex items-center justify-between mb-4`,
          isMobile && `justify-normal gap-x-4`
        )}
      >
        <h2 className="text-foreground text-3xl font-semibold tracking-tighter font-unbounded">
          {t("posts.filters")}
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

      <div className="space-y-7">
        <div className="flex flex-wrap gap-4">
          <div className="w-full flex items-center gap-x-2">
            <Tags className="size-6 text-acc-red" />

            <h3 className="font-medium font-unbounded text-foreground text-lg tracking-tight">
              Tags
            </h3>
          </div>

          <div className="flex flex-wrap gap-2.5">
            {TAGS.map((tag) => {
              return <PostTag key={tag} type="tag" tag={tag} />;
            })}
          </div>
        </div>

        <div className="flex flex-wrap gap-4">
          <div className="w-full flex items-center gap-x-2">
            <Calendar className="size-6 text-acc-red" />

            <h3 className="font-medium font-unbounded text-foreground text-lg tracking-tight">
              {t("posts.years")}
            </h3>
          </div>

          <div className="flex flex-wrap gap-2.5">
            {YEARS.map((year) => {
              return <PostTag key={year} type="year" tag={year} />;
            })}
          </div>
        </div>
      </div>
    </aside>
  );
}
