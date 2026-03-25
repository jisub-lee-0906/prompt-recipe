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
    "헷갈리기 쉬운 용어를 비교 묶음으로 정리해, AI IDE에 어떤 표현을 써야 하는지 빠르게 판단할 수 있게 돕는 허브입니다.",
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
              비슷해 보이는 용어라도 실제로는 다른 층위와 목적을 가집니다. 이
              페이지는 AI IDE에 요청하기 전에 어떤 단어가 더 정확한지 빠르게
              가려내도록 돕는 비교 학습 허브입니다.
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

      <section className="mt-8 rounded-[1.75rem] border border-dashed border-border/70 bg-background/60 px-6 py-6">
        <h2 className="text-xl font-semibold tracking-tight">비교 허브를 보는 법</h2>
        <p className="mt-3 max-w-4xl text-sm leading-7 text-muted-foreground">
          비교 허브는 정의를 외우기 위한 페이지가 아닙니다. 실제로 요청문을 쓰기 전에
          “지금 내가 말하려는 것이 모달인지, 다이얼로그인지, 드로어인지”처럼 헷갈리는
          순간에 바로 확인하는 용도로 쓰는 것이 가장 효과적입니다.
        </p>
      </section>
    </main>
  );
}
