"use client";

import * as React from "react";
import Link from "next/link";
import { Menu, Search } from "lucide-react";

import { SidebarNav } from "@/components/layout/sidebar-nav";
import { useSearchModal } from "@/components/search/search-provider";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { DOC_CATEGORIES, DOC_CATEGORY_LABELS } from "@/lib/docs-config";
import type { DocEntry } from "@/lib/mdx";

type MobileNavProps = {
  docs: DocEntry[];
};

export function MobileNav({ docs }: MobileNavProps) {
  const [open, setOpen] = React.useState(false);
  const { open: openSearch } = useSearchModal();

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        render={
          <Button
            type="button"
            variant="outline"
            size="icon"
            className="lg:hidden"
            aria-label="문서 메뉴 열기"
          />
        }
      >
        <Menu className="size-4" />
      </SheetTrigger>
      <SheetContent side="left" className="w-[86vw] p-0" showCloseButton={false}>
        <SheetHeader className="border-b border-border/70 px-4 py-4">
          <SheetTitle>문서 메뉴</SheetTitle>
          <SheetDescription>
            문서 허브와 검색을 먼저 쓰고, 필요할 때만 보조 도구로 확장할 수 있습니다.
          </SheetDescription>
        </SheetHeader>
        <div className="min-h-0 flex-1 p-4">
          <aside className="h-full rounded-3xl border border-border/70 bg-card/70 backdrop-blur">
            <ScrollArea className="h-full">
              <div className="space-y-8 p-4">
                <div className="space-y-2 px-3">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                    빠른 이동
                  </p>
                  <p className="text-sm leading-6 text-muted-foreground">
                    문서 허브와 검색에서 먼저 시작하고, 카테고리 문서로 바로 이동할 수
                    있습니다.
                  </p>
                </div>

                <div className="grid gap-2 px-3">
                  <QuickLink href="/docs" label="문서 허브 보기" onClick={() => setOpen(false)} />
                  <Button
                    type="button"
                    variant="outline"
                    className="h-11 justify-between rounded-2xl px-4 text-muted-foreground"
                    onClick={() => {
                      setOpen(false);
                      openSearch();
                    }}
                  >
                    <span className="flex items-center gap-2">
                      <Search className="size-4" />
                      검색 열기
                    </span>
                    <span className="rounded-md border border-border/80 bg-muted px-1.5 py-0.5 text-[11px] font-medium text-foreground/80">
                      Ctrl/Cmd + K
                    </span>
                  </Button>
                </div>

                {DOC_CATEGORIES.map((category) => {
                  const items = docs.filter((doc) => doc.category === category);

                  if (items.length === 0) {
                    return null;
                  }

                  return (
                    <SidebarNav
                      key={category}
                      category={category}
                      categoryLabel={DOC_CATEGORY_LABELS[category]}
                      items={items}
                      onNavigate={() => setOpen(false)}
                    />
                  );
                })}

                <div className="space-y-2 px-3">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                    다음 단계
                  </p>
                  <div className="grid gap-2">
                    <QuickLink href="/guides" label="기능 가이드" onClick={() => setOpen(false)} />
                    <QuickLink href="/casebooks" label="사례집" onClick={() => setOpen(false)} />
                    <QuickLink href="/workouts" label="실습 훈련" onClick={() => setOpen(false)} />
                    <QuickLink href="/playbooks" label="플레이북" onClick={() => setOpen(false)} />
                    <QuickLink href="/operations" label="운영 가이드" onClick={() => setOpen(false)} />
                  </div>
                </div>

                <div className="space-y-2 px-3">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                    보조 도구
                  </p>
                  <div className="grid gap-2">
                    <QuickLink href="/compare" label="비교 허브" onClick={() => setOpen(false)} />
                    <QuickLink href="/scenarios" label="상황 허브" onClick={() => setOpen(false)} />
                  </div>
                </div>
              </div>
            </ScrollArea>
          </aside>
        </div>
      </SheetContent>
    </Sheet>
  );
}

function QuickLink({
  href,
  label,
  onClick,
}: {
  href: string;
  label: string;
  onClick: () => void;
}) {
  return (
    <Link
      href={href}
      className="rounded-2xl border border-border/70 bg-background/70 px-4 py-3 text-sm font-medium transition-colors hover:bg-muted/60"
      onClick={onClick}
    >
      {label}
    </Link>
  );
}
