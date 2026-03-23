"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import type { DocEntry } from "@/lib/mdx";
import { cn } from "@/lib/utils";

type SidebarNavProps = {
  categoryLabel: string;
  items: DocEntry[];
};

export function SidebarNav({ categoryLabel, items }: SidebarNavProps) {
  const pathname = usePathname();

  return (
    <section className="space-y-3">
      <h2 className="px-3 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
        {categoryLabel}
      </h2>
      <nav className="space-y-1">
        {items.map((item) => {
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
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
