import { cn } from "@/lib/utils";
import { usePostsStore } from "@/lib/store/use-posts-store";

import type { Tags, Years } from "@/components/main/posts/post-filters";

interface PostTagsProps {
  type: "tag" | "year";
  tag: Tags[number] | Years[number];
}

export function PostTag({ type, tag }: PostTagsProps) {
  const { filters, toggleTag, toggleYear } = usePostsStore();

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
        "relative shrink-0 px-2 py-1 text-base font-mono rounded cursor-pointer tracking-tight",
        "bg-acc-gold/40 dark:text-red-200 dark:bg-acc-red/15",
        "hover:bg-acc-gold/70 dark:hover:bg-acc-red/35 transition-all duration-100",

        isSelected() &&
          "bg-acc-gold/70 hover:bg-acc-gold/40 dark:bg-acc-red/35 dark:hover:bg-acc-red/15 font-semibold"
      )}
      onClick={() => {
        if (isTag) {
          toggleTag(tag as Tags[number]);
          return;
        }
        toggleYear(tag as Years[number]);
      }}
    >
      {tag}
    </button>
  );
}
