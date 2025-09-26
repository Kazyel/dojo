import type { Tags, Years } from "@/components/posts/post-filters";
import type { UseNavigateResult } from "@tanstack/react-router";

export type SearchProps = {
  tagOptions?: {
    action: "add" | "filter" | "remove";
    tag?: Tags[number];
  };
  yearOptions?: {
    action: "remove" | "add";
    year?: Years[number];
  };
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

  switch (searchProps.tagOptions?.action) {
    case "add":
      if (old.tags) {
        next.tags = [...old.tags.split(","), searchProps.tagOptions.tag].join(",");
      } else {
        next.tags = searchProps.tagOptions.tag;
      }
      break;
    case "filter":
      next.tags = old
        .tags!.split(",")
        .filter((t) => t !== searchProps.tagOptions?.tag)
        .join(",");
      break;
    case "remove":
      delete next.tags;
      break;
    default:
      break;
  }

  switch (searchProps.yearOptions?.action) {
    case "add":
      next.year = searchProps.yearOptions.year;
      break;
    case "remove":
      delete next.year;
      break;
  }

  return next;
};
