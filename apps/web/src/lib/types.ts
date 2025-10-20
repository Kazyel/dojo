import type { Tags } from "@/components/main/posts/post-filters";

export type Post = {
  id: number;
  title: {
    pt: string;
    en: string;
  };
  description: {
    pt: string;
    en: string;
  };
  slug: string;
  year: number;
  tags: Tags[number][];
};
