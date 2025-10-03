import type { Tags } from "@/components/posts/post-filters";

export type Post = {
  id: number;
  title: string;
  description: string;
  slug: string;
  year: number;
  tags: Tags[number][];
};
