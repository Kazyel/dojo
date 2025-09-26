import type { Tags } from "@/components/posts/post-filters";
import { oldURLParser } from "@/lib/utils/url-sync";
import { expect, test } from "vitest";

type TagActions = "add" | "remove" | "filter";

test("url sync is applying filters correctly", () => {
  const oldURL = {
    page: undefined,
    year: undefined,
    tags: undefined,
  } as const;

  const searchProps = {
    tagOptions: {
      action: "add" as TagActions,
      tag: "coding" as Tags[number],
    },
  };

  const nextResult = oldURLParser(oldURL, searchProps);

  expect(nextResult).toStrictEqual({
    page: undefined,
    tags: "coding",
    year: undefined,
  });
});
