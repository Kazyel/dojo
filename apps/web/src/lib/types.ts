import type { Tags } from "@/components/main/posts/post-filters";

export type Post = {
  id: number;
  title: string;
  description: string;
  slug: string;
  year: number;
  tags: Tags[number][];
};
