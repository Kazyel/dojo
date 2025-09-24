import type { Post } from "@/lib/types";

import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";

interface PostCardProps {
  post: Post;
}

export function PostCard({ post }: PostCardProps) {
  return (
    <Link to={post.link}>
      <article className="relative group flex flex-col rounded-xl justify-between bg-foreground px-4 py-5 w-full md:w-[300px] md:h-[350px] hover:bg-foreground/85 transition-colors duration-150">
        <div>
          <div className="flex justify-between gap-x-3">
            <p className="text-3xl font-semibold tracking-tight text-secondary text-balance mb-1">
              {post.title}
            </p>

            <span className="rounded-full h-fit shrink-0 bg-background p-1.5">
              <ArrowUpRight className="text-foreground size-4.5 stroke-2" />
            </span>
          </div>
          <span className="text-acc-red italic font-extrabold tracking-tight">
            {post.year}
          </span>
        </div>

        <p className="text-lg text-secondary tracking-tight font-light line-clamp-1 md:line-clamp-3 text-pretty">
          {post.description}
        </p>
      </article>
    </Link>
  );
}
