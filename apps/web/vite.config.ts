import { tanstackRouter } from "@tanstack/router-plugin/vite";
import { defineConfig } from "vite";
import path from "node:path";

import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import mdx from "@mdx-js/rollup";
import rehypePrettyCode, { type Options } from "rehype-pretty-code";
import { transformerColorizedBrackets } from "@shikijs/colorized-brackets";

const prettyCodeOptions: Options = {
  theme: "kanagawa-wave",
  keepBackground: true,
  transformers: [transformerColorizedBrackets()],
};

export default defineConfig({
  plugins: [
    tailwindcss(),
    tanstackRouter({}),
    react(),
    mdx({
      providerImportSource: "@/components/mdx/mdx-components",
      rehypePlugins: [[rehypePrettyCode, prettyCodeOptions]],
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./vitest.setup.ts",
  },
});
