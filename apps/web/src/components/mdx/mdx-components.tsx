import CodeBlock from "@/components/mdx/code-block";
import type { MDXProps } from "mdx/types";

export const useMDXComponents = () => {
  return {
    h1(properties: MDXProps) {
      return (
        <h1
          className="text-5xl font-extrabold tracking-tighter mb-5"
          {...properties}
        />
      );
    },
    h2(properties: MDXProps) {
      return (
        <h2
          className="text-4xl mt-5 font-semibold tracking-tight"
          {...properties}
        />
      );
    },
    h3(properties: MDXProps) {
      return (
        <h3
          className="text-2xl mt-5 font-semibold tracking-tight"
          {...properties}
        />
      );
    },
    hr(properties: MDXProps) {
      return <hr className="border-foreground/60" {...properties} />;
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
        <ol className="list-decimal list-inside my-3 text-lg" {...properties} />
      );
    },
    ul(properties: MDXProps) {
      return (
        <ul className="list-disc list-inside my-3 text-lg" {...properties} />
      );
    },
    a(properties: MDXProps) {
      return (
        <a
          className="text-acc-red dark:text-acc-gold underline underline-offset-2 decoration-1 hover:text-acc-red/70 dark:hover:text-acc-gold/70   transition-colors duration-150"
          {...properties}
        />
      );
    },
    pre: CodeBlock,
  };
};
