"use client";

import { ArrowRight, Search } from "lucide-react";

import { useSearchModal } from "@/components/search/search-provider";
import { Button } from "@/components/ui/button";

export function HomeSearchButton() {
  const { open } = useSearchModal();

  return (
    <Button variant="outline" size="lg" onClick={open}>
      <Search className="size-4" />
      검색하기
      <span className="hidden rounded-md border border-border/80 bg-muted px-1.5 py-0.5 text-[11px] font-medium text-foreground/80 sm:inline-flex">
        Ctrl/Cmd + K
      </span>
    </Button>
  );
}

export function SearchGuideButton() {
  const { open } = useSearchModal();

  return (
    <Button
      type="button"
      variant="ghost"
      className="h-auto w-full justify-between rounded-2xl border border-border/70 bg-background/70 px-4 py-4 text-left transition-colors hover:bg-muted/60"
      onClick={open}
    >
      <div className="space-y-2">
        <p className="font-semibold text-foreground">바로 검색하고 싶을 때</p>
        <p className="text-sm leading-6 text-muted-foreground">
          헤더 검색에서 문서 제목, 태그, 선행 개념을 바로 찾아 원하는 문서로
          이동하세요.
        </p>
        <p className="text-xs font-medium text-primary">검색 열기</p>
      </div>
      <ArrowRight className="mt-1 size-4 shrink-0 text-primary" />
    </Button>
  );
}
