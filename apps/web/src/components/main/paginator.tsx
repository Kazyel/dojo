import { ChevronLeft, ChevronRight } from "lucide-react";
import { PostFiltersModal } from "../posts/post-filters-modal";
import { useIsMobile } from "@/lib/hooks/use-is-mobile";
import { usePostsStore } from "@/lib/store/use-posts-store";

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
    <div className="py-4 flex flex-col w-full">
      <div className="flex items-center">
        <h2 className="font-extrabold tracking-tighter text-4xl font-unbounded text-foreground">
          Posts
        </h2>

        <div className="flex items-center justify-between w-full">
          <div className="flex ml-3 gap-x-1.5">
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

      <p className="text-primary/75 font-light text-lg">
        {currentPosts} of {filteredPosts.length} posts
      </p>
    </div>
  );
}
