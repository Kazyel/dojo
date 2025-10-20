import { createFileRoute, notFound } from "@tanstack/react-router";
import { posts } from "@/lib/posts";

import { NotFound } from "@/components/main/not-found";

type PostModule = {
  default: React.ComponentType
};

export const loadPost = async (postName: string, language = "en") => {
  const key = `${language}:${postName}`;
  const loader = posts[key];

  if (!loader) {
    const fallbackKey = `en:${postName}`;
    if (!posts[fallbackKey]) return null;
    return posts[fallbackKey]();
  }

  return loader();
};

export const Route = createFileRoute("/p/$postName")({
  component: RouteComponent,
  notFoundComponent: () => <NotFound isPost />,
  loader: ({ params, context }) => {
    const module = loadPost(params.postName, context.language);
    if (!module) throw notFound();
    return module;
  },
});

function RouteComponent() {
  const postModule: PostModule = Route.useLoaderData();
  const PostComponent = postModule.default;

  return (
    <div className="mx-auto max-w-5xl px-6 py-12 md:px-8 md:py-14 font-merriweather prose-sm">
      <PostComponent />
    </div>
  );
}
