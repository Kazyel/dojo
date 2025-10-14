import { createFileRoute, notFound } from "@tanstack/react-router";

import { NotFound } from "@/components/not-found";

type PostModule = {
  default: React.ComponentType;
};

const POST_MODULES = import.meta.glob<PostModule>("@/lib/content/*/*.mdx");

const createPostModuleMap = () => {
  return Object.fromEntries(
    Object.entries(POST_MODULES)
      .map(([path, loader]) => {
        const match = path.match(/\/([^/]+)\/([^/]+)\.mdx$/);

        if (match) {
          const [, language, postName] = match;
          return [`${language}:${postName}`, loader];
        }

        return null;
      })
      .filter(Boolean) as [string, () => Promise<PostModule>][]
  );
};

const POST_MODULE_MAP = createPostModuleMap();

const loadContent = (postName: string, language = "en") => {
  return POST_MODULE_MAP[`${language}:${postName}`];
};

export const Route = createFileRoute("/p/$postName")({
  loader: async ({ params, context }) => {
    const importFn = loadContent(params.postName, context.language);
    if (!importFn) {
      throw notFound();
    }
    return await importFn();
  },
  component: RouteComponent,
  notFoundComponent: () => <NotFound isPost={true} />,
});

function RouteComponent() {
  const postModule = Route.useLoaderData();
  const PostComponent = postModule.default;

  return (
    <div className="mx-auto max-w-5xl px-6 py-12 md:px-8 md:py-14 font-merriweather prose-sm">
      <PostComponent />
    </div>
  );
}
