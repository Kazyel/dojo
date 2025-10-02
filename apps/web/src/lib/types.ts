import type { Tags } from "@/components/posts/post-filters";

export type Post = {
  title: string;
  description: string;
  link: string;
  year: number;
  tags: Tags[number][];
};
