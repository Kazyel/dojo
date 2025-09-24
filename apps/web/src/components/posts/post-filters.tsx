import type { Dispatch, SetStateAction } from "react";

import { cn } from "@/lib/utils";
import { ListFilter, X } from "lucide-react";

export type Tags = (typeof TAGS)[number][];

interface PostFiltersProps {
  appliedFilters: Tags;
  setAppliedFilters: Dispatch<SetStateAction<Tags>>;
}

const TAGS = ["Coding", "Random talk", "Tips", "Review", "Thoughts"] as const;

export function PostFilters({ setAppliedFilters, appliedFilters }: PostFiltersProps) {
  const handleFilters = (tag: Tags[number]) => {
    if (appliedFilters.includes(tag)) {
      setAppliedFilters((prev) => prev.filter((t) => t !== tag));
      return;
    }
    setAppliedFilters((prev) => [...prev, tag]);
  };

  return (
    <aside className="top-3 border-l-2 border-foreground px-4 pt-2 pb-4 rounded-sm hidden gap-y-3 lg:flex lg:flex-col lg:sticky lg:col-span-1 max-h-fit">
      <div className="flex items-center gap-x-2">
        <ListFilter className="size-6" />
        <p className="text-foreground text-2xl font-bold tracking-tight">Filters</p>
      </div>

      <div className="flex flex-wrap gap-2">
        {TAGS.map((tag) => {
          return (
            <button
              key={tag}
              className={cn(
                "relative shrink-0 px-2 py-1 italic font-mono bg-acc-gold/35 tracking-tight rounded border border-acc-gold/75 cursor-pointer hover:bg-acc-gold/25 transition-all duration-100",

                appliedFilters.includes(tag) &&
                  "text-acc-red font-medium bg-acc-red/15 border-acc-red/50 hover:bg-acc-red/10"
              )}
              onClick={() => {
                handleFilters(tag);
              }}
            >
              {tag}

              {appliedFilters.includes(tag) && (
                <div className="absolute -top-1.5 -right-1.5 p-[1px] bg-off-w rounded-full border border-acc-red">
                  <X className="size-2.5" />
                </div>
              )}
            </button>
          );
        })}
      </div>
    </aside>
  );
}
