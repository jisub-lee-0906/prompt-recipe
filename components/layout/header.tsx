import Link from "next/link";
import { Search } from "lucide-react";

import { ThemeToggle } from "@/components/layout/theme-toggle";
import { Button } from "@/components/ui/button";

export function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border/70 bg-background/85 backdrop-blur-xl">
      <div className="mx-auto flex h-[var(--header-height)] w-full max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link
          href="/"
          className="flex items-center gap-3 text-sm font-semibold tracking-tight"
        >
          <span className="inline-flex size-9 items-center justify-center rounded-2xl bg-primary text-sm text-primary-foreground">
            AI
          </span>
          <span className="hidden sm:inline">프롬프팅 가이드</span>
        </Link>
        <div className="flex items-center gap-2">
          <Button
            type="button"
            variant="outline"
            className="h-9 w-auto min-w-0 justify-between gap-3 px-3 text-muted-foreground sm:min-w-64"
            aria-label="검색 준비 중"
          >
            <span className="flex items-center gap-2">
              <Search className="size-4" />
              <span className="hidden sm:inline">문서 검색...</span>
              <span className="sm:hidden">검색</span>
            </span>
            <span className="hidden rounded-md border border-border/80 bg-muted px-1.5 py-0.5 text-[11px] font-medium text-foreground/80 sm:inline-flex">
              Cmd + K
            </span>
          </Button>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
