
    export type Posts = {
      [key: string]: () => Promise<{
        default: React.ComponentType<any>;
      }>;
    }

    export const posts: Posts = {
  "en:why-i-started-this-blog": () => import("./content/en/why-i-started-this-blog.mdx"),
  "pt:why-i-started-this-blog": () => import("./content/pt/why-i-started-this-blog.mdx")
};

    