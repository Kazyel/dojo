import { NotFound } from "@/components/not-found";
import { createFileRoute, notFound } from "@tanstack/react-router";

type PostModule = {
  default: React.ComponentType<any>;
};

const postModules = import.meta.glob<PostModule>("@/lib/content/mdx/*.mdx");
const postModuleMap: Record<string, () => Promise<any>> = {};

for (const fullPath in postModules) {
  const postName = fullPath.match(/\/([^/]+)\.mdx$/)?.[1];
  if (postName) {
    postModuleMap[postName] = postModules[fullPath] as any;
  }
}

export const Route = createFileRoute("/p/$postName")({
  loader: async ({ params }) => {
    const importFn = postModuleMap[params.postName];
    if (!importFn) {
      throw notFound();
    }
    return (await importFn()) as PostModule;
  },
  component: RouteComponent,
  notFoundComponent: () => <NotFound isPost={true} />,
});

function RouteComponent() {
  const postModule = Route.useLoaderData();
  const PostComponent = postModule.default;

  return (
    <div>
      <PostComponent />
    </div>
  );
}
