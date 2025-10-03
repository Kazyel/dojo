import CodeBlock from "@/components/mdx/code-block";
import type { MDXProps } from "mdx/types";

export const useMDXComponents = () => {
  return {
    h1(properties: MDXProps) {
      return (
        <h1
          className="text-5xl font-extrabold tracking-tighter prose-h1 text-foreground mb-8"
          {...properties}
        />
      );
    },
    h2(properties: MDXProps) {
      return (
        <h2
          className="text-4xl font-semibold tracking-tight text-foreground"
          {...properties}
        />
      );
    },
    h3(properties: MDXProps) {
      return (
        <h3
          className="text-2xl font-semibold tracking-tight text-foreground"
          {...properties}
        />
      );
    },
    hr(properties: MDXProps) {
      return <hr className="border-foreground/60 mb-6 mt-0" {...properties} />;
    },
    blockquote(properties: MDXProps) {
      return (
        <blockquote
          className="border-l-4 dark:border-acc-gold/60 text-lg dark:bg-acc-gold/10 bg-acc-red/10 border-acc-red/60 pl-4 italic my-4 text-foreground/85 font-extralight py-1"
          {...properties}
        />
      );
    },
    p(properties: MDXProps) {
      return (
        <p
          className="dark:text-off-w/85 text-lg text-black/85"
          {...properties}
        />
      );
    },
    ol(properties: MDXProps) {
      return (
        <ol
          className="list-decimal list-inside text-lg text-foreground"
          {...properties}
        />
      );
    },
    ul(properties: MDXProps) {
      return (
        <ul
          className="list-disc list-inside text-lg text-foreground"
          {...properties}
        />
      );
    },
    a(properties: MDXProps) {
      return (
        <a
          className="text-acc-red dark:text-acc-gold underline underline-offset-2 decoration-1 hover:text-acc-red/70 dark:hover:text-acc-gold/70 transition-colors duration-150"
          {...properties}
        />
      );
    },
    pre: CodeBlock,
  };
};
