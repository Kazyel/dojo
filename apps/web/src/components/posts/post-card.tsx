import type { Post } from "@/lib/types";

import { Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface PostCardProps {
  post: Post;
  index: number;
}

export function PostCard({ post, index }: PostCardProps) {
  return (
    <motion.article
      key={post.link}
      animate={{
        opacity: [0.9, 1],
      }}
      transition={{ delay: index * 0.075, duration: 0.3, ease: "easeInOut" }}
      className={cn(
        "group rounded-xl bg-foreground px-4 py-5 w-full hover:bg-foreground/85 transition-colors duration-150",
        "sm:w-[275px] sm:h-[300px] md:w-[300px] md:h-[350px]"
      )}
    >
      <Link
        to={post.link}
        viewTransition={{ types: ["fade"] }}
        className="flex flex-col justify-between h-full"
      >
        <div>
          <div className="flex justify-between gap-x-3">
            <p className="text-3xl font-semibold tracking-tight text-secondary text-balance mb-1">
              {post.title}
            </p>

            <span className="rounded-full h-fit shrink-0 bg-background p-1.5">
              <ArrowUpRight className="text-foreground size-4.5 stroke-2" />
            </span>
          </div>

          <span className="text-acc-red italic font-bold text-xs font-unbounded">
            {post.year}
          </span>
        </div>

        <p className="text-lg text-secondary tracking-tight font-light line-clamp-1 md:line-clamp-3 text-pretty">
          {post.description}
        </p>
      </Link>
    </motion.article>
  );
}
