import type { Dispatch, SetStateAction } from "react";
import { cn } from "@/lib/utils";

export type Tags = typeof TAGS;

interface PostFiltersProps {
  appliedFilters: Tags;
  setAppliedFilters: Dispatch<SetStateAction<Tags>>;
}

const TAGS = ["Coding", "Random talk", "Tips", "Review", "Thoughts"];

export function PostFilters({ setAppliedFilters, appliedFilters }: PostFiltersProps) {
  return (
    <aside className="top-3 border-l-2 border-foreground px-4 pt-2 pb-4 rounded-sm hidden gap-y-3 lg:flex lg:flex-col lg:sticky lg:col-span-1 max-h-fit">
      <p className="text-foreground text-2xl font-bold tracking-tight">Filters</p>

      <div className="flex flex-wrap gap-2">
        {TAGS.map((tag) => {
          return (
            <button
              key={tag}
              onClick={() => {
                setAppliedFilters((prev) =>
                  prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
                );
              }}
              className={cn(
                "shrink-0 px-2 py-1 italic font-mono bg-acc-gold/50 rounded border border-acc-gold/75 cursor-pointer hover:bg-acc-gold/25 transition-all duration-100",

                appliedFilters.includes(tag) &&
                  "text-acc-red font-medium bg-acc-red/15 border-acc-red/50 hover:bg-acc-red/10"
              )}
            >
              {tag}
            </button>
          );
        })}
      </div>
    </aside>
  );
}
