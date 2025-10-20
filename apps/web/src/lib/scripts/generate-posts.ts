import fs from "fs";
import path from "path";

const CONTENT_DIR = path.resolve("./src/lib/content");
const OUTPUT_FILE = path.resolve("./src/lib/posts.generated.ts");

function getAllMdxFiles(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  let files = [];

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files = files.concat(getAllMdxFiles(fullPath));
    } else if (entry.isFile() && entry.name.endsWith(".mdx")) {
      files.push(fullPath);
    }
  }

  return files;
}

function generatePostsObject(files) {
  return files
    .map((filePath) => {
      const relativePath = path.relative(path.resolve("./src/lib"), filePath).replace(/\\/g, "/");
      const match = relativePath.match(/content\/([^/]+)\/([^/]+)\.mdx$/);
      if (!match) return null;

      const [, language, postName] = match;
      return `"${language}:${postName}": () => import("./${relativePath}")`;
    })
    .filter(Boolean)
    .join(",\n  ");
}

function main() {
  const files = getAllMdxFiles(CONTENT_DIR);
  const postsContent = `
    //AUTO GENERATED FILE - DO NOT EDIT

    export type Posts = {
      [key: string]: () => Promise<{
        default: React.ComponentType<any>;
      }>;
    }

    export const posts: Posts = {\n  ${generatePostsObject(files)}\n};\n
    `;

  fs.writeFileSync(OUTPUT_FILE, postsContent);
  console.log(`Generated posts map at ${OUTPUT_FILE}`);
}

main();
