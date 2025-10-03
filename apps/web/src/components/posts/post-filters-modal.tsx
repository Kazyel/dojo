import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogDescription,
  DialogPortal,
  DialogTitle,
} from "@/components/ui/dialog";

import { PostFilters } from "./post-filters";
import { ListFilterPlus } from "lucide-react";

export function PostFiltersModal() {
  return (
    <Dialog>
      <DialogTrigger className="text-foreground">
        <ListFilterPlus className="size-7 stroke-2 cursor-pointer" />
      </DialogTrigger>
      <DialogPortal>
        <DialogTitle>Filters</DialogTitle>
        <DialogDescription>A dialog to filter out posts.</DialogDescription>
        <DialogContent className="border-none p-6">
          <PostFilters />
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
}
