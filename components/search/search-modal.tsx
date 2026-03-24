"use client";

import * as React from "react";
import { Command } from "cmdk";
import { CalendarDays, FileText, Search, Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import type { SearchRecord } from "@/lib/mdx";
import { cn } from "@/lib/utils";

type SearchModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  items: SearchRecord[];
};

type RoleFilter = "전체" | SearchRecord["roleTargets"][number];

const STARTER_HREFS = new Set([
  "/docs/ui-ux/modal",
  "/docs/frontend/component",
  "/docs/backend/api",
  "/docs/ui-ux/user-flow",
  "/docs/ui-ux/information-architecture",
  "/playbooks/planner-signup-page",
  "/playbooks/junior-api-integration",
]);

const ROLE_QUERY_MAP = {
  기획자: ["기획자", "pm", "po", "프로덕트"],
  디자이너: ["디자이너", "ux", "ui", "프로덕트 디자이너"],
  "주니어 개발자": ["주니어 개발자", "프론트엔드", "개발자", "주니어"],
} as const;

function normalize(value: string) {
  return value.toLowerCase().trim();
}

function getPriorityRank(priority: SearchRecord["priority"]) {
  return priority === "P1" ? 0 : priority === "P2" ? 1 : 2;
}

function getRoleWeight(item: SearchRecord, query: string) {
  const normalizedQuery = normalize(query);

  if (!normalizedQuery) {
    return item.priority === "P1" ? 12 : 0;
  }

  let weight = 0;

  for (const [role, aliases] of Object.entries(ROLE_QUERY_MAP)) {
    if (
      aliases.some((alias) => normalize(alias).includes(normalizedQuery)) &&
      item.roleTargets.includes(role as SearchRecord["roleTargets"][number])
    ) {
      weight += 80;
    }
  }

  return weight;
}

export function SearchModal({
  open,
  onOpenChange,
  items,
}: SearchModalProps) {
  const [query, setQuery] = React.useState("");
  const [selectedRole, setSelectedRole] = React.useState<RoleFilter>("전체");
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
      setSelectedRole("전체");
    }
  }, [open]);

  const filteredItems = React.useMemo(() => {
    const normalizedQuery = normalize(query);

    return items
      .map((item) => {
        const title = normalize(item.title);
        const description = normalize(item.description);
        const tags = item.tags.map(normalize);
        const aliases = item.aliases.map(normalize);
        const prerequisites = item.prerequisites.map(normalize);
        const roles = item.roleTargets.map(normalize);
        let score = 0;

        if (normalizedQuery) {
          if (title === normalizedQuery) score += 120;
          if (aliases.includes(normalizedQuery)) score += 100;
          if (title.startsWith(normalizedQuery)) score += 90;
          if (title.includes(normalizedQuery)) score += 70;
          if (tags.some((tag) => tag.includes(normalizedQuery))) score += 50;
          if (aliases.some((alias) => alias.includes(normalizedQuery))) score += 45;
          if (description.includes(normalizedQuery)) score += 30;
          if (roles.some((role) => role.includes(normalizedQuery))) score += 25;
          if (prerequisites.some((value) => value.includes(normalizedQuery))) {
            score += 20;
          }
          if (normalize(item.category).includes(normalizedQuery)) score += 10;
        }

        score += getRoleWeight(item, query);

        return { item, score };
      })
      .filter(({ item, score }) => {
        const roleMatched =
          selectedRole === "전체" || item.roleTargets.includes(selectedRole);

        if (!roleMatched) {
          return false;
        }

        return !normalizedQuery || score > 0;
      })
      .sort((left, right) => {
        if (left.score !== right.score) {
          return right.score - left.score;
        }

        const starterDiff =
          Number(STARTER_HREFS.has(right.item.href)) -
          Number(STARTER_HREFS.has(left.item.href));

        if (starterDiff !== 0) {
          return starterDiff;
        }

        const priorityDiff =
          getPriorityRank(left.item.priority) - getPriorityRank(right.item.priority);

        if (priorityDiff !== 0) {
          return priorityDiff;
        }

        return left.item.order - right.item.order;
      })
      .map(({ item }) => item);
  }, [items, query, selectedRole]);

  const suggestedItems = React.useMemo(
    () => items.filter((item) => item.priority === "P1").slice(0, 5),
    [items],
  );

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
            placeholder="문서 제목, 설명, 태그, 별칭, 선행 개념으로 검색해보세요."
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

        <div className="flex flex-wrap gap-2 border-b border-border/70 px-4 py-3">
          {(["전체", "기획자", "디자이너", "주니어 개발자"] as const).map(
            (role) => (
              <Button
                key={role}
                type="button"
                variant={selectedRole === role ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedRole(role)}
              >
                {role}
              </Button>
            ),
          )}
        </div>

        <Command.List className="max-h-[28rem] overflow-y-auto p-3">
          <Command.Empty className="space-y-4 px-3 py-10 text-center text-sm text-muted-foreground">
            <p>검색 결과가 없습니다.</p>
            <div className="flex flex-wrap justify-center gap-2">
              {suggestedItems.slice(0, 3).map((item) => (
                <Button
                  key={item.href}
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    onOpenChange(false);
                    router.push(item.href);
                  }}
                >
                  {item.title}
                </Button>
              ))}
            </div>
          </Command.Empty>
          <Command.Group heading={query ? "검색 결과" : "추천 시작 문서"}>
            {(query ? filteredItems : suggestedItems).map((item) => (
              <Command.Item
                key={item.href}
                value={`${item.title} ${item.description} ${item.category} ${item.priority} ${item.tags.join(" ")} ${item.aliases.join(" ")} ${item.prerequisites.join(" ")} ${item.roleTargets.join(" ")} ${item.updatedAt}`}
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
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="font-medium text-foreground">{item.title}</p>
                    <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[11px] font-semibold text-primary">
                      {item.priority}
                    </span>
                    <span className="rounded-full bg-muted px-2 py-0.5 text-[11px] font-medium text-muted-foreground">
                      {item.difficulty}
                    </span>
                    {item.priority === "P1" ? (
                      <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2 py-0.5 text-[11px] font-medium text-emerald-700 dark:text-emerald-400">
                        <Sparkles className="size-3" />
                        입문 추천
                      </span>
                    ) : null}
                  </div>
                  <p className="line-clamp-2 text-muted-foreground">
                    {item.description}
                  </p>
                  <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                    <span>{item.categoryLabel}</span>
                    <span>·</span>
                    <span>대상 {item.roleTargets.join(", ")}</span>
                    <span>·</span>
                    <span className="inline-flex items-center gap-1">
                      <CalendarDays className="size-3" />
                      {item.updatedAt}
                    </span>
                    {item.prerequisites.length > 0 ? (
                      <>
                        <span>·</span>
                        <span>선행: {item.prerequisites.join(", ")}</span>
                      </>
                    ) : null}
                  </div>
                </div>
              </Command.Item>
            ))}
          </Command.Group>
        </Command.List>
      </Command>
    </div>
  );
}
