import type { Dispatch, SetStateAction } from "react";
import type { Filters } from "@/lib/hooks/use-posts";

import { cn, syncFiltersWithURL } from "@/lib/utils";
import { ListFilter, X } from "lucide-react";
import { useNavigate } from "@tanstack/react-router";

interface PostFiltersProps {
  filters: Filters;
  setFilters: Dispatch<SetStateAction<Filters>>;
}

const TAGS = ["coding", "random talk", "tips", "review", "thoughts"] as const;
const YEARS = [2025] as const;

export type Tags = (typeof TAGS)[number][];
export type Years = (typeof YEARS)[number][];

export function PostFilters({ setFilters, filters }: PostFiltersProps) {
  const navigate = useNavigate({ from: "/" });

  const handleTagFilter = (tag: Tags[number]) => {
    if (filters.tags.includes(tag)) {
      const filteredTags = filters.tags.filter((t) => t !== tag);

      if (filteredTags.length === 0) {
        syncFiltersWithURL({ tags: "remove", navigate });
      } else {
        syncFiltersWithURL({
          tags: (old) =>
            old!
              .split(",")
              .filter((t) => t !== tag)
              .join(","),
          navigate,
        });
      }

      setFilters((prev) => ({
        ...prev,
        tags: prev.tags.filter((t) => t !== tag),
      }));
      return;
    }

    syncFiltersWithURL({
      tags: (old) => (old ? [...old.split(","), tag].join(",") : tag),
      navigate,
    });

    setFilters((prev) => ({
      ...prev,
      tags: [...prev.tags, tag],
    }));
  };

  const handleYearFilter = (year: Years[number] | null) => {
    if (filters.year === year) {
      syncFiltersWithURL({ year: "remove", navigate });

      setFilters((prev) => ({
        ...prev,
        year: null,
      }));
      return;
    }

    syncFiltersWithURL({ year, navigate });
    setFilters((prev) => ({
      ...prev,
      year,
    }));
  };

  return (
    <aside className="top-3 border-l-2 border-foreground px-4 pt-2 pb-4 rounded-sm hidden gap-y-3 lg:flex lg:flex-col lg:sticky lg:col-span-1 max-h-fit">
      <div className="flex items-center gap-x-2">
        <ListFilter className="size-6" />
        <p className="text-foreground text-2xl font-bold tracking-tight">Filters</p>
      </div>

      <div className="flex flex-wrap gap-2">
        <p className="w-full text-lg tracking-tighter underline">Tags:</p>

        {TAGS.map((tag) => {
          return (
            <button
              key={tag}
              className={cn(
                "relative shrink-0 px-2 py-1 italic font-mono bg-acc-gold/35 tracking-tight rounded border border-acc-gold/75 cursor-pointer hover:bg-acc-gold/25 transition-all duration-100",

                filters.tags.includes(tag) &&
                  "text-acc-red font-medium bg-acc-red/15 border-acc-red/50 hover:bg-acc-red/10"
              )}
              onClick={() => {
                handleTagFilter(tag);
              }}
            >
              {tag}

              {filters.tags.includes(tag) && (
                <div className="absolute -top-1.5 -right-1.5 p-[1px] bg-off-w rounded-full border border-acc-red">
                  <X className="size-2.5" />
                </div>
              )}
            </button>
          );
        })}
      </div>

      <div className="flex flex-wrap gap-2">
        <p className="w-full text-lg tracking-tighter underline">Years:</p>

        {YEARS.map((year) => {
          return (
            <button
              key={year}
              className={cn(
                "relative shrink-0 px-2 py-1 italic font-mono bg-acc-gold/35 tracking-tight rounded border border-acc-gold/75 cursor-pointer hover:bg-acc-gold/25 transition-all duration-100",

                filters.year === year &&
                  "text-acc-red font-medium bg-acc-red/15 border-acc-red/50 hover:bg-acc-red/10"
              )}
              onClick={() => {
                handleYearFilter(year);
              }}
            >
              {year}

              {filters.year === year && (
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
