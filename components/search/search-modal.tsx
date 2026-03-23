"use client";

import * as React from "react";
import { Command } from "cmdk";
import { FileText, Search } from "lucide-react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import type { SearchRecord } from "@/lib/mdx";
import { cn } from "@/lib/utils";

type SearchModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  items: SearchRecord[];
};

function normalize(value: string) {
  return value.toLowerCase();
}

export function SearchModal({
  open,
  onOpenChange,
  items,
}: SearchModalProps) {
  const [query, setQuery] = React.useState("");
  const router = useRouter();

  React.useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        onOpenChange(!open);
      }

      if (event.key === "Escape" && open) {
        onOpenChange(false);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onOpenChange, open]);

  React.useEffect(() => {
    if (!open) {
      setQuery("");
    }
  }, [open]);

  const filteredItems = React.useMemo(() => {
    const normalizedQuery = normalize(query.trim());

    if (!normalizedQuery) {
      return items;
    }

    return items.filter((item) => {
      const haystack = normalize(
        [item.title, item.description, item.category, ...item.tags].join(" "),
      );

      return haystack.includes(normalizedQuery);
    });
  }, [items, query]);

  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[60] flex items-start justify-center bg-black/40 p-4 pt-20 backdrop-blur-sm">
      <button
        type="button"
        aria-label="검색 닫기"
        className="absolute inset-0"
        onClick={() => onOpenChange(false)}
      />
      <Command
        label="문서 검색"
        className="relative z-10 w-full max-w-2xl overflow-hidden rounded-[2rem] border border-border/70 bg-background shadow-2xl"
      >
        <div className="flex items-center gap-3 border-b border-border/70 px-4 py-4">
          <Search className="size-5 text-muted-foreground" />
          <Command.Input
            value={query}
            onValueChange={setQuery}
            placeholder="문서 제목, 설명, 태그로 검색하세요"
            className="h-10 flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
          />
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="text-muted-foreground"
            onClick={() => onOpenChange(false)}
          >
            닫기
          </Button>
        </div>

        <Command.List className="max-h-[26rem] overflow-y-auto p-3">
          <Command.Empty className="px-3 py-10 text-center text-sm text-muted-foreground">
            검색 결과가 없습니다.
          </Command.Empty>
          <Command.Group heading="문서">
            {filteredItems.map((item) => (
              <Command.Item
                key={item.href}
                value={`${item.title} ${item.description} ${item.category} ${item.tags.join(" ")}`}
                onSelect={() => {
                  onOpenChange(false);
                  router.push(item.href);
                }}
                className={cn(
                  "flex cursor-pointer items-start gap-3 rounded-2xl px-3 py-3 text-sm outline-none",
                  "data-[selected=true]:bg-muted",
                )}
              >
                <div className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-2xl bg-muted text-muted-foreground">
                  <FileText className="size-4" />
                </div>
                <div className="min-w-0 space-y-1">
                  <p className="font-medium text-foreground">{item.title}</p>
                  <p className="line-clamp-2 text-muted-foreground">
                    {item.description}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {item.category} · {item.tags.join(", ")}
                  </p>
                </div>
              </Command.Item>
            ))}
          </Command.Group>
        </Command.List>
      </Command>
    </div>
  );
}
