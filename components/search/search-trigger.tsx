"use client";

import { Search } from "lucide-react";

import { useSearchModal } from "@/components/search/search-provider";
import { Button } from "@/components/ui/button";

type SearchTriggerProps = {
  compact?: boolean;
  className?: string;
};

export function SearchTrigger({
  compact = false,
  className,
}: SearchTriggerProps) {
  const { open } = useSearchModal();

  return (
    <Button
      type="button"
      variant="outline"
      className={className}
      aria-label="문서 검색"
      onClick={open}
    >
      <span className="flex items-center gap-2">
        <Search className="size-4" />
        <span className={compact ? "sm:hidden" : ""}>
          {compact ? "검색" : "문서 검색"}
        </span>
      </span>
      <span className="hidden rounded-md border border-border/80 bg-muted px-1.5 py-0.5 text-[11px] font-medium text-foreground/80 sm:inline-flex">
        Cmd + K
      </span>
    </Button>
  );
}
