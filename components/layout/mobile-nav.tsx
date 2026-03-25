"use client";

import * as React from "react";
import Link from "next/link";
import { Menu } from "lucide-react";

import { SidebarNav } from "@/components/layout/sidebar-nav";
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

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        render={
          <Button
            type="button"
            variant="outline"
            size="icon"
            className="md:hidden"
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
            학습 트랙, 사례집, 실습, 문서 카테고리를 한 번에 탐색할 수 있습니다.
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
                    역할별 학습과 실전 사례, 실습 훈련, 카테고리 문서를 빠르게
                    열 수 있습니다.
                  </p>
                </div>

                <div className="grid gap-2 px-3">
                  <QuickLink href="/tracks" label="학습 트랙 보기" onClick={() => setOpen(false)} />
                  <QuickLink href="/playbooks" label="플레이북 보기" onClick={() => setOpen(false)} />
                  <QuickLink href="/guides" label="기능 가이드 보기" onClick={() => setOpen(false)} />
                  <QuickLink href="/casebooks" label="사례집 보기" onClick={() => setOpen(false)} />
                  <QuickLink href="/workouts" label="실습 훈련 보기" onClick={() => setOpen(false)} />
                  <QuickLink href="/compare" label="비교 허브 보기" onClick={() => setOpen(false)} />
                  <QuickLink href="/scenarios" label="상황 허브 보기" onClick={() => setOpen(false)} />
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
