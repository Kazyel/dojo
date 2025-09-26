import type { Tags } from "@/components/posts/post-filters";
import { oldURLParser } from "@/lib/utils/url-sync";
import { expect, test } from "vitest";

type TagActions = "add" | "remove" | "filter";

test("url sync is applying filters correctly", () => {
  const oldURL = {
    page: undefined,
    tags: undefined,
    year: undefined,
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

test("url sync is aggregating filters correctly", () => {
  const oldURL = {
    page: undefined,
    tags: "coding",
    year: undefined,
  } as const;

  const searchProps = {
    tagOptions: {
      action: "add" as TagActions,
      tag: "thoughts" as Tags[number],
    },
  };

  const nextResult = oldURLParser(oldURL, searchProps);

  expect(nextResult).toStrictEqual({
    page: undefined,
    tags: "coding,thoughts",
    year: undefined,
  });
});

test("url sync is filtering filters correctly", () => {
  const oldURL = {
    page: undefined,
    tags: "coding,thoughts",
    year: undefined,
  } as const;

  const searchProps = {
    tagOptions: {
      action: "filter" as TagActions,
      tag: "thoughts" as Tags[number],
    },
  };

  const nextResult = oldURLParser(oldURL, searchProps);

  expect(nextResult).toStrictEqual({
    page: undefined,
    tags: "coding",
    year: undefined,
  });
});

test("url sync is removing filters entirely", () => {
  const oldURL = {
    page: undefined,
    tags: "coding,thoughts",
    year: undefined,
  } as const;

  const searchProps = {
    tagOptions: {
      action: "remove" as TagActions,
    },
  };

  const nextResult = oldURLParser(oldURL, searchProps);

  expect(nextResult).toStrictEqual({
    page: undefined,
    year: undefined,
  });
});
