"use client";

import * as React from "react";

import { ScrollArea } from "@/components/ui/scroll-area";
import type { TocHeading } from "@/lib/mdx";
import { cn } from "@/lib/utils";

type TocProps = {
  headings: TocHeading[];
};

export function Toc({ headings }: TocProps) {
  const [activeId, setActiveId] = React.useState<string>(headings[0]?.id ?? "");

  React.useEffect(() => {
    if (headings.length === 0) {
      return;
    }

    const visibleHeadings = new Map<string, number>();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const id = entry.target.id;

          if (entry.isIntersecting) {
            visibleHeadings.set(id, entry.boundingClientRect.top);
          } else {
            visibleHeadings.delete(id);
          }
        }

        const sortedVisible = [...visibleHeadings.entries()].sort(
          (left, right) => Math.abs(left[1]) - Math.abs(right[1]),
        );

        if (sortedVisible[0]) {
          setActiveId(sortedVisible[0][0]);
          return;
        }

        const passedHeadings = headings.filter((heading) => {
          const element = document.getElementById(heading.id);
          return element ? element.getBoundingClientRect().top <= 140 : false;
        });

        if (passedHeadings.length > 0) {
          setActiveId(passedHeadings[passedHeadings.length - 1].id);
        }
      },
      {
        rootMargin: "-96px 0px -65% 0px",
        threshold: [0, 0.2, 0.6, 1],
      },
    );

    const elements = headings
      .map((heading) => document.getElementById(heading.id))
      .filter((element): element is HTMLElement => Boolean(element));

    for (const element of elements) {
      observer.observe(element);
    }

    return () => observer.disconnect();
  }, [headings]);

  if (headings.length === 0) {
    return null;
  }

  return (
    <aside className="hidden xl:block xl:w-64 xl:shrink-0">
      <div className="sticky top-[calc(var(--header-height)+1rem)] h-[calc(100vh-var(--header-height)-1.5rem)] rounded-3xl border border-border/70 bg-card/70 backdrop-blur">
        <div className="border-b border-border/70 px-5 py-4">
          <h2 className="text-sm font-semibold tracking-tight">이 페이지에서</h2>
        </div>
        <ScrollArea className="h-[calc(100%-57px)]">
          <nav className="space-y-1 p-4">
            {headings.map((heading) => {
              const isActive = heading.id === activeId;

              return (
                <a
                  key={heading.id}
                  href={`#${heading.id}`}
                  className={cn(
                    "block rounded-xl px-3 py-2 text-sm leading-6 transition-colors",
                    heading.level === 3 && "ml-4 text-[13px]",
                    isActive
                      ? "bg-primary/10 font-medium text-primary"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground",
                  )}
                >
                  {heading.text}
                </a>
              );
            })}
          </nav>
        </ScrollArea>
      </div>
    </aside>
  );
}
