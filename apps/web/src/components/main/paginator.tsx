import { Trans } from "react-i18next";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { useIsMobile } from "@/lib/hooks/use-is-mobile";
import { usePostsStore } from "@/lib/store/use-posts-store";

import { PostFiltersModal } from "@/components/main/posts/post-filters-modal";

export function Paginator() {
  const isMobile = useIsMobile();

  const {
    nextPage,
    previousPage,
    isFirstPage,
    isLastPage,
    currentPosts,
    filteredPosts,
  } = usePostsStore();

  return (
    <div className="py-4 space-y-2 w-full">
      <div className="flex items-center">
        <h2 className="font-semibold tracking-tighter text-3xl sm:text-4xl font-unbounded text-foreground">
          Posts
        </h2>

        <div className="flex items-center justify-between w-full">
          <div className="flex ml-4 gap-x-1.5">
            <button
              onClick={previousPage}
              disabled={isFirstPage}
              className="mt-1 cursor-pointer disabled:cursor-default disabled:opacity-30"
            >
              <ChevronLeft className="size-6 stroke-3 text-foreground" />
            </button>

            <button
              onClick={nextPage}
              disabled={isLastPage}
              className="mt-1 cursor-pointer disabled:cursor-default disabled:opacity-30"
            >
              <ChevronRight className="size-6 stroke-3 text-foreground" />
            </button>
          </div>

          {isMobile && <PostFiltersModal />}
        </div>
      </div>

      <p className="text-primary/75 font-light text-base sm:text-lg">
        <Trans i18nKey="posts.post_count">
          {{ currentPosts }} of {{ filteredPosts }} posts.
        </Trans>
      </p>
    </div>
  );
}
