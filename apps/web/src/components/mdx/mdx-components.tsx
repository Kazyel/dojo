import type { Props } from "node_modules/@mdx-js/react/lib";
import CodeBlock from "@/components/mdx/code-block";

export const useMDXComponents = () => {
  return {
    h1(properties: Props) {
      return (
        <h1 className="text-5xl font-extrabold tracking-tighter mb-5" {...properties} />
      );
    },
    h2(properties: Props) {
      return (
        <h2 className="text-3xl mt-5 font-semibold tracking-tight" {...properties} />
      );
    },
    hr(properties: Props) {
      return <hr className="border-black dark:border-off-w" {...properties} />;
    },

    p(properties: Props) {
      return (
        <p className="dark:text-off-w/85 text-lg text-black/85 my-4" {...properties} />
      );
    },
    pre: CodeBlock,
  };
};
