import { SidebarNav } from "@/components/layout/sidebar-nav";
import { ScrollArea } from "@/components/ui/scroll-area";
import { DOC_CATEGORIES, getAllDocsMeta, type DocCategory } from "@/lib/mdx";
import { cn } from "@/lib/utils";

const CATEGORY_LABELS: Record<DocCategory, string> = {
  "ui-ux": "UI/UX",
  frontend: "프론트엔드",
  backend: "백엔드",
};

type SidebarProps = {
  mobile?: boolean;
};

export function Sidebar({ mobile = false }: SidebarProps) {
  const docs = getAllDocsMeta();

  return (
    <aside
      className={cn(
        "rounded-3xl border border-border/70 bg-card/70 backdrop-blur",
        mobile
          ? "h-full"
          : "sticky top-[calc(var(--header-height)+1rem)] h-[calc(100vh-var(--header-height)-1.5rem)]",
      )}
    >
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
          {DOC_CATEGORIES.map((category) => {
            const items = docs.filter((doc) => doc.category === category);

            if (items.length === 0) {
              return null;
            }

            return (
              <SidebarNav
                key={category}
                categoryLabel={CATEGORY_LABELS[category]}
                items={items}
              />
            );
          })}
        </div>
      </ScrollArea>
    </aside>
  );
}
