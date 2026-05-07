import type { Metadata } from "next";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CHANGELOG_ENTRIES } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "업데이트",
  description: "문서 사이트의 최근 업데이트와 변경 이력을 확인할 수 있습니다.",
};

export default function UpdatesPage() {
  return (
    <main className="mx-auto w-full max-w-5xl px-6 py-12">
      <div className="space-y-4 pb-8">
        <p className="text-sm font-medium uppercase tracking-[0.22em] text-muted-foreground">
          Updates
        </p>
        <h1 className="text-4xl font-semibold tracking-tight">최근 업데이트</h1>
        <p className="max-w-3xl text-base leading-8 text-muted-foreground">
          문서 사이트에 어떤 내용이 보강되었는지 빠르게 확인할 수 있는 변경
          로그입니다.
        </p>
      </div>

      <div className="space-y-4">
        {CHANGELOG_ENTRIES.map((entry) => (
          <Card
            key={`${entry.date}-${entry.title}`}
            className="rounded-[1.75rem] border border-border/70 bg-card/80"
          >
            <CardHeader className="space-y-4">
              <div className="flex flex-wrap items-center gap-3">
                <Badge variant="secondary">{entry.date}</Badge>
                <CardTitle className="text-2xl">{entry.title}</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm leading-7 text-muted-foreground">
                {entry.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </main>
  );
}
