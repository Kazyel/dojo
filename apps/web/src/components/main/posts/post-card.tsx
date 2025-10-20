import { useTranslation } from "react-i18next";
import { motion } from "motion/react";
import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";

import type { Post } from "@/lib/types";
import { cn } from "@/lib/utils";

interface PostCardProps {
  post: Post;
  index: number;
}

export function PostCard({ post, index }: PostCardProps) {
  const { i18n } = useTranslation()

  return (
    <motion.article
      key={post.id}
      animate={{
        opacity: [0.9, 1],
      }}
      transition={{ delay: index * 0.075, duration: 0.3, ease: "easeInOut" }}
      exit={{ opacity: 0, transition: { duration: 0.1 } }}

      className={cn(
        "group rounded-md bg-foreground px-4 py-5 w-full hover:bg-foreground/85 transition-colors duration-150",
        "sm:w-[275px] sm:h-[300px] md:w-[300px] md:h-[350px]"
      )}
    >
      <Link
        to={"/p/" + post.slug}
        viewTransition={{ types: ["fade"] }}
        className="flex flex-col justify-between h-full"
      >
        <div>
          <div className="flex justify-between gap-x-3">
            <p className="text-2xl sm:text-3xl font-bold tracking-tight text-secondary text-balance mb-1">
              {i18n.resolvedLanguage === "pt" ? post.title.pt : post.title.en}
            </p>

            <span className="rounded-full h-fit shrink-0 bg-background p-1 sm:p-1.5">
              <ArrowUpRight className="text-foreground size-4.5 sm:size-4.5 stroke-2" />
            </span>
          </div>

          <span className="text-acc-red italic font-semibold text-xs sm:text-sm font-unbounded">
            {post.year}
          </span>
        </div>

        <p className="text-base sm:text-lg text-secondary tracking-tight font-light line-clamp-1 md:line-clamp-3 text-pretty">
          {i18n.resolvedLanguage === "pt"
            ? post.description.pt
            : post.description.en}
        </p>
      </Link>
    </motion.article>
  );
}
