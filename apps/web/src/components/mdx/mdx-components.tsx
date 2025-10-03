import type { MDXProps } from "mdx/types";

import CodeBlock from "@/components/mdx/code-block";

export const useMDXComponents = () => {
  return {
    h1(properties: MDXProps) {
      return (
        <h1
          className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tighter prose-h1 text-foreground lg:mb-6 text-balance"
          {...properties}
        />
      );
    },
    h2(properties: MDXProps) {
      return (
        <h2
          className="text-2xl sm:text-3xl lg:text-5xl font-extrabold tracking-tighter text-foreground text-balance lg:mt-12 lg:mb-6"
          {...properties}
        />
      );
    },
    h3(properties: MDXProps) {
      return (
        <h3
          className="text-xl sm:text-2xl lg:text-3xl font-medium tracking-tighter text-foreground text-balance lg:mt-3 lg:mb-3"
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
          className="border-l-4 dark:border-acc-gold/60 dark:bg-acc-gold/10 bg-acc-red/10 border-acc-red/60 italic text-foreground py-px font-light"
          {...properties}
        />
      );
    },
    p(properties: MDXProps) {
      return (
        <p
          className="text-foreground/75 text-base md:text-lg "
          {...properties}
        />
      );
    },
    ol(properties: MDXProps) {
      return (
        <ol
          className="list-decimal list-inside text-base md:text-lg text-foreground/75 ml-0 pl-1 md:pl-2"
          {...properties}
        />
      );
    },
    ul(properties: MDXProps) {
      return (
        <ul
          className="list-disc list-inside text-base md:text-lg text-foreground/75 ml-0 pl-1 md:pl-2"
          {...properties}
        />
      );
    },
    li(properties: MDXProps) {
      return <li className="[&>p]:inline" {...properties} />;
    },
    strong(properties: MDXProps) {
      return (
        <strong className="font-extrabold text-foreground/90" {...properties} />
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
