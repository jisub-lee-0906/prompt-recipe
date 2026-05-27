import Link from "next/link";

import { MobileNav } from "@/components/layout/mobile-nav";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { SearchTrigger } from "@/components/search/search-trigger";
import type { DocEntry } from "@/lib/mdx";

export function Header({ docs }: { docs: DocEntry[] }) {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border/70 bg-background/85 backdrop-blur-xl">
      <div className="mx-auto flex h-[var(--header-height)] w-full max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
        <div className="flex items-center gap-3">
          <MobileNav docs={docs} />
          <Link
            href="/"
            className="flex items-center text-xs font-semibold tracking-tight sm:text-sm"
          >
            <span>AI 프롬프팅 가이드</span>
          </Link>
        </div>

        <div className="flex items-center gap-2">
          <NavLink href="/docs" label="문서 허브" className="lg:inline-flex" />
          <SearchTrigger className="h-9 w-auto min-w-0 justify-between gap-3 px-3 text-muted-foreground sm:min-w-64" />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}

function NavLink({
  href,
  label,
  className,
}: {
  href: string;
  label: string;
  className: string;
}) {
  return (
    <Link
      href={href}
      className={`hidden rounded-xl border border-border/70 px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted/60 ${className}`}
    >
      {label}
    </Link>
  );
}
