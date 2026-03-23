"use client";

import * as React from "react";
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
import type { DocCategory, DocEntry } from "@/lib/mdx";

const CATEGORY_LABELS: Record<DocCategory, string> = {
  "ui-ux": "UI/UX",
  frontend: "프론트엔드",
  backend: "백엔드",
};

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
            카테고리별 문서를 빠르게 이동할 수 있습니다.
          </SheetDescription>
        </SheetHeader>
        <div className="min-h-0 flex-1 p-4">
          <aside className="h-full rounded-3xl border border-border/70 bg-card/70 backdrop-blur">
            <ScrollArea className="h-full">
              <div className="space-y-8 p-4">
                <div className="space-y-2 px-3">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                    문서 탐색
                  </p>
                  <p className="text-sm leading-6 text-muted-foreground">
                    용어를 카테고리별로 빠르게 찾아보세요.
                  </p>
                </div>
                {(Object.keys(CATEGORY_LABELS) as DocCategory[]).map((category) => {
                  const items = docs.filter((doc) => doc.category === category);

                  if (items.length === 0) {
                    return null;
                  }

                  return (
                    <SidebarNav
                      key={category}
                      categoryLabel={CATEGORY_LABELS[category]}
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
