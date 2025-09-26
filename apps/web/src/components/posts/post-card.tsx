import type { Post } from "@/lib/types";

import { Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";

interface PostCardProps {
  post: Post;
  index: number;
}

export function PostCard({ post, index }: PostCardProps) {
  return (
    <Link to={post.link} viewTransition={{ types: ["fade"] }}>
      <motion.article
        key={post.link}
        animate={{
          opacity: [0.9, 1],
        }}
        transition={{ delay: index * 0.075, duration: 0.3, ease: "easeInOut" }}
        className="relative group flex flex-col rounded-xl justify-between bg-foreground px-4 py-5 w-full md:w-[300px] md:h-[350px] hover:bg-foreground/85 transition-colors duration-150"
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
          <span className="text-acc-red italic font-extrabold tracking-tight">
            {post.year}
          </span>
        </div>

        <p className="text-lg text-secondary tracking-tight font-light line-clamp-1 md:line-clamp-3 text-pretty">
          {post.description}
        </p>
      </motion.article>
    </Link>
  );
}
