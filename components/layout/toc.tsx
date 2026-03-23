import { ScrollArea } from "@/components/ui/scroll-area";

export function Toc() {
  return (
    <aside className="sticky top-[calc(var(--header-height)+1rem)] h-[calc(100vh-var(--header-height)-1.5rem)] rounded-3xl border border-border/70 bg-card/70 backdrop-blur">
      <div className="border-b border-border/70 px-5 py-4">
        <h2 className="text-sm font-semibold tracking-tight">On This Page</h2>
      </div>
      <ScrollArea className="h-[calc(100%-57px)]">
        <div className="space-y-3 p-5 text-sm text-muted-foreground">
          <div className="h-4 w-28 rounded-full bg-muted" />
          <div className="h-4 w-36 rounded-full bg-muted" />
          <div className="h-4 w-24 rounded-full bg-muted" />
        </div>
      </ScrollArea>
    </aside>
  );
}
