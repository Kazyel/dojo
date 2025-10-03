import { TriangleAlert } from "lucide-react";

interface NotFoundProps {
  isPost?: boolean;
}

export function NotFound({ isPost = false }: NotFoundProps) {
  return (
    <div className="flex flex-col items-center gap-y-6 justify-center not-prose min-h-[calc(100vh-120px)]">
      <TriangleAlert className="w-16 h-16 text-acc-red dark:text-acc-gold" />

      <h2 className="text-7xl font-extrabold text-acc-red dark:text-acc-gold font-merriweather">
        {isPost ? "Post not found." : "Page not found."}
      </h2>
    </div>
  );
}
