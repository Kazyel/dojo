import type { Tags, Years } from "./post-filters";
import type { Filters } from "@/lib/hooks/use-posts";

import { cn } from "@/lib/utils";
import { X } from "lucide-react";

interface PostTagsProps {
  type: "tag" | "year";
  tag: Tags[number] | Years[number];
  filters: Filters;
  handleFilter: (tag: any) => void;
}

export function PostTag({ type, tag, filters, handleFilter }: PostTagsProps) {
  const isYear = type === "year";
  const isTag = type === "tag";

  const isSelected = () => {
    if (isTag) {
      return filters.tags.includes(tag as Tags[number]);
    }

    if (isYear) {
      return filters.year === tag;
    }

    return false;
  };

  return (
    <button
      className={cn(
        "relative shrink-0 px-2 py-1 italic font-extralight font-mono bg-acc-gold/35 tracking-tighter rounded border border-acc-gold/75 cursor-pointer",
        "hover:bg-acc-gold/25 transition-all duration-100",

        isSelected() && "text-acc-red bg-acc-red/15 border-acc-red/50 hover:bg-acc-red/10"
      )}
      onClick={() => {
        handleFilter(tag);
      }}
    >
      {tag}

      {isSelected() && (
        <div className="absolute -top-1.5 -right-1.5 p-[1px] bg-off-w rounded-full border border-acc-red">
          <X className="size-2.5" />
        </div>
      )}
    </button>
  );
}
