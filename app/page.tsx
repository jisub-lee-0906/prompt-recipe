import Link from "next/link";
import { ArrowRight, Blocks, BrushCleaning, DatabaseZap } from "lucide-react";

import { HomeSearchButton } from "@/components/search/home-search-button";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getAllDocsMeta } from "@/lib/mdx";

const CATEGORY_META = [
  {
    category: "ui-ux",
    title: "UI/UX",
    description:
      "모달, 토스트, 상호작용 패턴처럼 화면 경험을 설계할 때 필요한 용어를 설명합니다.",
    icon: BrushCleaning,
  },
  {
    category: "frontend",
    title: "프론트엔드",
    description:
      "컴포넌트, 상태 관리, 화면 구조처럼 실제 인터페이스 구현에 자주 쓰는 개념을 다룹니다.",
    icon: Blocks,
  },
  {
    category: "backend",
    title: "백엔드",
    description:
      "API, 인증 흐름, 데이터 통신처럼 서비스 동작을 설명할 때 필요한 용어를 정리합니다.",
    icon: DatabaseZap,
  },
] as const;

export default function Home() {
  const docs = getAllDocsMeta();
  const firstDoc = docs[0];

  return (
    <main className="bg-[radial-gradient(circle_at_top,rgba(120,119,198,0.08),transparent_35%),linear-gradient(to_bottom,transparent,rgba(15,23,42,0.02))]">
      <section className="mx-auto flex min-h-[calc(100vh-var(--header-height))] w-full max-w-7xl items-center px-6 py-16">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div className="space-y-8">
            <div className="space-y-5">
              <p className="text-sm font-medium uppercase tracking-[0.22em] text-muted-foreground">
                Prompting Docs
              </p>
              <div className="space-y-4">
                <h1 className="max-w-4xl text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
                  AI 프롬프팅 가이드
                </h1>
                <p className="max-w-2xl text-base leading-8 text-muted-foreground sm:text-lg">
                  기획자, 디자이너, 주니어 개발자가 웹 개발과 UI/UX 용어를
                  빠르게 이해하고, AI IDE에 더 구체적인 요청을 전달할 수 있도록
                  돕는 정적 문서 사이트입니다.
                </p>
              </div>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link href={firstDoc?.href ?? "/docs/ui-ux/modal"}>
                <Button size="lg">
                  문서 읽기
                  <ArrowRight className="size-4" />
                </Button>
              </Link>
              <HomeSearchButton />
            </div>
          </div>

          <div className="grid gap-4">
            {CATEGORY_META.map((item) => {
              const firstCategoryDoc = docs.find(
                (doc) => doc.category === item.category,
              );
              const Icon = item.icon;

              return (
                <Link
                  key={item.category}
                  href={firstCategoryDoc?.href ?? "/docs/ui-ux/modal"}
                >
                  <Card className="rounded-[1.75rem] border border-border/70 bg-card/80 py-0 transition-transform duration-200 hover:-translate-y-1 hover:shadow-lg">
                    <CardHeader className="flex flex-row items-start justify-between gap-4 px-6 py-6">
                      <div className="space-y-3">
                        <CardTitle className="text-xl">{item.title}</CardTitle>
                        <p className="text-sm leading-7 text-muted-foreground">
                          {item.description}
                        </p>
                      </div>
                      <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                        <Icon className="size-5" />
                      </div>
                    </CardHeader>
                    <CardContent className="border-t border-border/70 px-6 py-4 text-sm font-medium text-muted-foreground">
                      대표 문서로 이동
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}
