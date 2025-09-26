import type { Dispatch, SetStateAction } from "react";
import type { Filters } from "@/lib/hooks/use-posts";

import { useNavigate } from "@tanstack/react-router";
import { syncFiltersWithURL } from "@/lib/utils/url-sync";

import { Calendar, ListFilter, Tags } from "lucide-react";
import { PostTag } from "./post-tags";

export type Tags = (typeof TAGS)[number][];
export type Years = (typeof YEARS)[number][];

interface PostFiltersProps {
  filters: Filters;
  setFilters: Dispatch<SetStateAction<Filters>>;
}

const TAGS = ["coding", "random talk", "tips", "review", "thoughts"] as const;
const YEARS = [2025] as const;

export function PostFilters({ setFilters, filters }: PostFiltersProps) {
  const navigate = useNavigate({ from: "/" });

  const handleTagFilter = (tag: Tags[number]) => {
    if (filters.tags.includes(tag)) {
      const filteredTags: Tags[number][] = filters.tags.filter((t) => t !== tag);

      setFilters((prev) => ({
        ...prev,
        tags: filteredTags,
      }));

      if (filteredTags.length === 0) {
        syncFiltersWithURL({
          tagOptions: {
            action: "remove",
          },
          navigate,
        });
        return;
      }

      syncFiltersWithURL({
        tagOptions: {
          action: "filter",
          tag,
        },
        navigate,
      });
      return;
    }

    setFilters((prev) => ({
      ...prev,
      tags: [...prev.tags, tag],
    }));

    syncFiltersWithURL({
      tagOptions: {
        action: "add",
        tag,
      },
      navigate,
    });
  };

  const handleYearFilter = (year: Years[number]) => {
    if (filters.year === year) {
      syncFiltersWithURL({
        yearOptions: {
          action: "remove",
        },
        navigate,
      });

      setFilters((prev) => ({
        ...prev,
        year: null,
      }));
      return;
    }

    if (year) {
      syncFiltersWithURL({
        yearOptions: {
          action: "add",
          year,
        },
        navigate,
      });

      setFilters((prev) => ({
        ...prev,
        year,
      }));
    }
  };

  return (
    <aside className="top-3 border-l-2 border-foreground px-4 pt-2 pb-4 rounded-sm hidden gap-y-3 lg:flex lg:flex-col lg:sticky lg:col-span-1 max-h-fit">
      <div className="flex items-center gap-x-2">
        <ListFilter className="size-6" />
        <h2 className="text-foreground text-2xl font-bold tracking-tight">Filters</h2>
      </div>

      <div className="flex flex-wrap gap-2">
        <div className="w-full flex items-center gap-x-2">
          <Tags className="size-4.5 text-acc-red" />
          <h3 className="text-lg tracking-tighter">Tags</h3>
        </div>

        {TAGS.map((tag) => {
          return (
            <PostTag
              key={tag}
              type="tag"
              tag={tag}
              filters={filters}
              handleFilter={handleTagFilter}
            />
          );
        })}
      </div>

      <div className="flex flex-wrap gap-2">
        <div className="w-full flex items-center gap-x-2">
          <Calendar className="size-4.5 text-acc-red" />
          <h3 className="text-lg tracking-tighter underline">Years</h3>
        </div>

        {YEARS.map((year) => {
          return (
            <PostTag
              key={year}
              type="year"
              tag={year}
              filters={filters}
              handleFilter={handleYearFilter}
            />
          );
        })}
      </div>
    </aside>
  );
}
