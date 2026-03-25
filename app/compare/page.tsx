import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, SplitSquareVertical } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getComparisonHubItems } from "@/lib/hubs";
import { getDocsBySlugs } from "@/lib/mdx";

export const metadata: Metadata = {
  title: "비교 허브",
  description:
    "헷갈리기 쉬운 개념을 비교 묶음으로 정리해, 어떤 용어를 써야 할지 빠르게 판단할 수 있는 허브입니다.",
};

export default function ComparePage() {
  const groups = getComparisonHubItems().map((group) => ({
    ...group,
    docs: getDocsBySlugs(group.docs),
  }));

  return (
    <main className="mx-auto w-full max-w-6xl px-6 py-12">
      <section className="rounded-[2rem] border border-border/70 bg-card/70 px-6 py-8 shadow-sm backdrop-blur sm:px-10 sm:py-10">
        <div className="space-y-4">
          <Badge variant="secondary" className="w-fit">
            비교 허브
          </Badge>
          <div className="space-y-3">
            <h1 className="flex items-center gap-3 text-3xl font-semibold tracking-tight sm:text-4xl">
              <SplitSquareVertical className="size-7 text-primary" />
              헷갈리기 쉬운 개념 비교 허브
            </h1>
            <p className="max-w-3xl text-base leading-8 text-muted-foreground">
              비슷해 보이지만 실제로는 다른 개념을 묶어서 정리했습니다. AI
              IDE에 요청하기 전에 어떤 용어가 가장 정확한지 먼저 확인할 수
              있습니다.
            </p>
          </div>
        </div>
      </section>

      <section className="mt-8 grid gap-5 lg:grid-cols-2">
        {groups.map((group) => (
          <Card
            key={group.slug}
            id={group.slug}
            className="rounded-[1.75rem] border border-border/70 bg-card/80"
          >
            <CardHeader className="space-y-3">
              <CardTitle className="text-2xl">{group.title}</CardTitle>
              <p className="text-sm leading-7 text-muted-foreground">
                {group.summary}
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2 rounded-2xl border border-border/70 bg-background/70 p-4">
                <p className="text-sm font-medium">언제 이 용어를 쓰는가</p>
                <p className="text-sm leading-7 text-muted-foreground">
                  {group.whenToUse}
                </p>
              </div>
              <div className="space-y-2 rounded-2xl border border-border/70 bg-background/70 p-4">
                <p className="text-sm font-medium">무엇과 헷갈리는가</p>
                <p className="text-sm leading-7 text-muted-foreground">
                  {group.confusedWith}
                </p>
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium">바로 가야 할 대표 문서</p>
                <div className="space-y-2">
                  {group.docs.map((doc) => (
                    <Link
                      key={doc.slug}
                      href={doc.href}
                      className="flex items-center justify-between rounded-2xl border border-border/70 bg-background/70 px-4 py-3 text-sm transition-colors hover:bg-muted/60"
                    >
                      <span>{doc.title}</span>
                      <ArrowRight className="size-4 text-primary" />
                    </Link>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </section>
    </main>
  );
}
