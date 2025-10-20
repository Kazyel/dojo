// scripts/generate-posts.ts
import fs from "fs";
import path from "path";

const contentDir = path.resolve(process.cwd(), "src/lib/content"); // adjust this
const outputFile = path.resolve(process.cwd(), "src/lib/posts.generated.ts");

type PostEntry = {
  language: string;
  name: string;
  filePath: string;
};

// Recursively scan content folder for MDX files
function scanDir(dir: string, language?: string): PostEntry[] {
  const entries: PostEntry[] = [];
  const files = fs.readdirSync(dir);

  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      // Treat folder name as language if not already set
      const lang = language || file;
      entries.push(...scanDir(fullPath, lang));
    } else if (file.endsWith(".mdx")) {
      if (!language) throw new Error(`MDX file "${fullPath}" must be inside a language folder`);
      const name = path.basename(file, ".mdx");
      entries.push({ language, name, filePath: fullPath });
    }
  }

  return entries;
}

// Generate TypeScript file content with static imports
function generateFile(posts: PostEntry[]) {
  const lines: string[] = [];
  lines.push("// THIS FILE IS AUTO-GENERATED");
  lines.push('import type { Posts } from "@/lib/types";');

  // Generate import statements
  posts.forEach((post, idx) => {
    const importName = `Post${idx}`;
    const relativePath = "./" + path.relative(path.dirname(outputFile), post.filePath).replace(/\\/g, "/");
    post["importName"] = importName; // store for later use
    lines.push(`import ${importName} from "${relativePath}";`);
  });

  lines.push("");
  lines.push("export const posts: Posts = {");

  // Generate posts object with static imports
  posts.forEach((post) => {
    const key = `${post.language}:${post.name}`;
    lines.push(`  "${key}": async () => ({ default: ${post.importName} }),`);
  });

  lines.push("};");

  return lines.join("\n");
}

const posts = scanDir(contentDir);
const content = generateFile(posts);

fs.writeFileSync(outputFile, content);
console.log(`Generated ${posts.length} posts at ${outputFile}`);
