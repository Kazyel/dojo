import type { Tags, Years } from "./post-filters";
import { usePostsStore } from "@/lib/store/use-posts-store";

import { cn } from "@/lib/utils";
import { useNavigate } from "@tanstack/react-router";

interface PostTagsProps {
  type: "tag" | "year";
  tag: Tags[number] | Years[number];
}

export function PostTag({ type, tag }: PostTagsProps) {
  const { filters, toggleTag, toggleYear } = usePostsStore();
  const navigate = useNavigate({ from: "/" });

  const isYear = type === "year";
  const isTag = type === "tag";

  const isSelected = () => {
    if (isTag) {
      return filters.tags.has(tag as Tags[number]);
    }

    if (isYear) {
      return filters.year === tag;
    }

    return false;
  };

  return (
    <button
      className={cn(
        "relative shrink-0 px-2 py-0.5 text-base italic font-normal text-foreground/85 font-mono bg-acc-gold/35 tracking-tighter rounded border border-acc-gold/75 cursor-pointer",
        "hover:bg-acc-gold/25 transition-all duration-100",

        isSelected() &&
          "text-acc-red bg-acc-red/15 border-acc-red/50 hover:bg-acc-red/10"
      )}
      onClick={() => {
        if (isTag) {
          toggleTag(tag as Tags[number], navigate);
          return;
        }
        toggleYear(tag as Years[number], navigate);
      }}
    >
      {tag}
    </button>
  );
}
