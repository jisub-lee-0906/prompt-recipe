"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import type { DocEntry } from "@/lib/mdx";
import { cn } from "@/lib/utils";

type SidebarNavProps = {
  category: DocEntry["category"];
  categoryLabel: string;
  items: DocEntry[];
  onNavigate?: () => void;
};

export function SidebarNav({
  category,
  categoryLabel,
  items,
  onNavigate,
}: SidebarNavProps) {
  const pathname = usePathname();
  const isCategoryActive =
    pathname === `/docs/${category}` || pathname.startsWith(`/docs/${category}/`);

  return (
    <section className="space-y-3">
      <Link
        href={`/docs/${category}`}
        onClick={onNavigate}
        className={cn(
          "block rounded-xl px-3 text-xs font-semibold uppercase tracking-[0.18em] transition-colors",
          isCategoryActive
            ? "text-foreground"
            : "text-muted-foreground hover:text-foreground",
        )}
      >
        {categoryLabel}
      </Link>
      <nav className="space-y-1">
        {items.map((item) => {
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onNavigate}
              className={cn(
                "flex rounded-xl px-3 py-2 text-sm leading-6 transition-colors",
                isActive
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground",
              )}
            >
              {item.title}
            </Link>
          );
        })}
      </nav>
    </section>
  );
}
