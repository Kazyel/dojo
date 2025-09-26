import type { Tags } from "@/components/posts/post-filters";
import type { UseNavigateResult } from "@tanstack/react-router";

export type SearchProps = {
  tagOptions?: {
    action: "add" | "filter" | "remove";
    tag?: Tags[number];
  };
  year?: "remove" | null | number;
  navigate: UseNavigateResult<"/">;
};

export type SearchOldParams = {
  page?: number | undefined;
  tags?: string | undefined;
  year?: number | undefined;
};

export const syncFiltersWithURL = (searchProps: SearchProps) => {
  searchProps.navigate({
    search: (old: SearchOldParams) => {
      return oldURLParser(old, searchProps);
    },
    replace: true,
  });
};

export const oldURLParser = (
  old: SearchOldParams,
  searchProps: Omit<SearchProps, "navigate">
) => {
  const next: Record<string, any> = { ...old };

  if (searchProps.tagOptions?.action === "add") {
    if (old.tags) {
      next.tags = [...old.tags.split(","), searchProps.tagOptions.tag].join(",");
    } else {
      next.tags = searchProps.tagOptions.tag;
    }
  }

  if (searchProps.tagOptions?.action === "filter") {
    next.tags = old
      .tags!.split(",")
      .filter((t) => t !== searchProps.tagOptions?.tag)
      .join(",");
  }

  if (searchProps.tagOptions?.action === "remove") {
    delete next.tags;
  }

  if (typeof searchProps.year === "number") {
    next.year = searchProps.year;
  }

  if (searchProps.year === "remove") {
    delete next.year;
  }

  return next;
};
