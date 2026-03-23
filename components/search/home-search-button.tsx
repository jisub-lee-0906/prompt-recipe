"use client";

import { Search } from "lucide-react";

import { useSearchModal } from "@/components/search/search-provider";
import { Button } from "@/components/ui/button";

export function HomeSearchButton() {
  const { open } = useSearchModal();

  return (
    <Button variant="outline" size="lg" onClick={open}>
      <Search className="size-4" />
      검색하기
      <span className="hidden rounded-md border border-border/80 bg-muted px-1.5 py-0.5 text-[11px] font-medium text-foreground/80 sm:inline-flex">
        Cmd + K
      </span>
    </Button>
  );
}
