import Link from "next/link";
import {
  ArrowRight,
  Blocks,
  BookOpenCheck,
  BrushCleaning,
  DatabaseZap,
  Sparkles,
  SplitSquareVertical,
} from "lucide-react";

import { HomeSearchButton } from "@/components/search/home-search-button";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DOC_CATEGORY_LABELS } from "@/lib/docs-config";
import { getAllDocsMeta, getDocsBySlugs } from "@/lib/mdx";
import { CATEGORY_META, ROLE_PATHS, SITE_NAME } from "@/lib/site-config";

const CATEGORY_ICONS = {
  "ui-ux": BrushCleaning,
  frontend: Blocks,
  backend: DatabaseZap,
} as const;

const COMPARISON_LINKS = [
  {
    title: "모달 vs 다이얼로그 vs 드로어",
    href: "/docs/ui-ux/modal",
    description: "겹쳐 뜨는 UI를 구분해서 요청할 때 가장 먼저 보는 비교 축입니다.",
  },
  {
    title: "SSR vs CSR vs 하이드레이션",
    href: "/docs/frontend/ssr",
    description: "렌더링 방식과 초기 화면 동작을 설명할 때 기준이 되는 묶음입니다.",
  },
  {
    title: "API vs 엔드포인트 vs 요청/응답 구조",
    href: "/docs/backend/api",
    description: "백엔드 요구사항을 구체적인 계약 언어로 바꿀 때 유용한 시작점입니다.",
  },
] as const;

export default function Home() {
  const docs = getAllDocsMeta();
  const firstDoc = docs[0];
  const starterPaths = Object.entries(CATEGORY_META).map(([category, meta]) => ({
    category,
    ...meta,
    docs: docs.filter((doc) => doc.category === category).slice(0, 3),
  }));
  const rolePaths = ROLE_PATHS.map((pathItem) => ({
    ...pathItem,
    docs: getDocsBySlugs([...pathItem.slugs]),
  }));

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
                  {SITE_NAME}
                </h1>
                <p className="max-w-2xl text-base leading-8 text-muted-foreground sm:text-lg">
                  기획자, 디자이너, 주니어 개발자가 웹 개발과 UI/UX 용어를 빠르게
                  이해하고 AI IDE에 더 구체적인 요청을 전달하도록 돕는 레퍼런스
                  문서 사이트입니다.
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
              <Link href="/compare">
                <Button variant="outline" size="lg">
                  비교 허브
                </Button>
              </Link>
              <Link href="/updates">
                <Button variant="ghost" size="lg">
                  최근 업데이트
                </Button>
              </Link>
            </div>
          </div>

          <div className="grid gap-4">
            {starterPaths.map((item) => {
              const Icon =
                CATEGORY_ICONS[item.category as keyof typeof CATEGORY_ICONS];

              return (
                <Link key={item.category} href={`/docs/${item.category}`}>
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
                      {
                        DOC_CATEGORY_LABELS[
                          item.category as keyof typeof DOC_CATEGORY_LABELS
                        ]
                      }{" "}
                      문서 보기
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-6 pb-12">
        <div className="space-y-4 pb-6">
          <p className="text-sm font-medium uppercase tracking-[0.22em] text-muted-foreground">
            Starter Paths
          </p>
          <h2 className="text-3xl font-semibold tracking-tight">입문 추천 경로</h2>
          <p className="max-w-3xl text-base leading-8 text-muted-foreground">
            처음 들어온 사용자가 어디부터 읽어야 할지 바로 판단할 수 있도록
            카테고리별 시작 문서를 묶었습니다.
          </p>
        </div>

        <div className="grid gap-5 lg:grid-cols-3">
          {starterPaths.map((pathItem) => (
            <Card
              key={pathItem.category}
              className="rounded-[1.75rem] border border-border/70 bg-card/80"
            >
              <CardHeader className="space-y-4">
                <div className="flex items-center justify-between gap-3">
                  <CardTitle className="text-xl">
                    {pathItem.title} 시작
                  </CardTitle>
                  <Badge variant="secondary">{pathItem.docs.length}개 추천</Badge>
                </div>
                <p className="text-sm leading-7 text-muted-foreground">
                  {pathItem.description}
                </p>
              </CardHeader>
              <CardContent className="space-y-3">
                {pathItem.docs.map((doc, index) => (
                  <Link
                    key={doc.slug}
                    href={doc.href}
                    className="block rounded-2xl border border-border/70 bg-background/70 px-4 py-4 transition-colors hover:bg-muted/60"
                  >
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">
                        {String(index + 1).padStart(2, "0")}
                      </Badge>
                      <Badge variant="secondary">{doc.priority}</Badge>
                      <Badge variant="outline">{doc.difficulty}</Badge>
                    </div>
                    <p className="mt-3 font-semibold">{doc.title}</p>
                    <p className="mt-2 text-sm leading-6 text-muted-foreground">
                      {doc.description}
                    </p>
                  </Link>
                ))}
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-6 pb-12">
        <div className="space-y-4 pb-6">
          <p className="text-sm font-medium uppercase tracking-[0.22em] text-muted-foreground">
            Role Paths
          </p>
          <h2 className="text-3xl font-semibold tracking-tight">역할별 빠른 진입</h2>
          <p className="max-w-3xl text-base leading-8 text-muted-foreground">
            지금 맡은 역할에 맞는 문서부터 보고 싶다면 아래 경로에서 시작하면
            됩니다.
          </p>
        </div>

        <div className="grid gap-5 lg:grid-cols-3">
          {rolePaths.map((pathItem) => (
            <Card
              key={pathItem.role}
              className="rounded-[1.75rem] border border-border/70 bg-card/80"
            >
              <CardHeader className="space-y-4">
                <div className="flex items-center justify-between gap-3">
                  <CardTitle className="flex items-center gap-2 text-xl">
                    <Sparkles className="size-4 text-primary" />
                    {pathItem.role}
                  </CardTitle>
                  <Badge variant="secondary">{pathItem.docs.length}개 경로</Badge>
                </div>
                <p className="text-sm leading-7 text-muted-foreground">
                  {pathItem.description}
                </p>
              </CardHeader>
              <CardContent className="space-y-3">
                {pathItem.docs.map((doc, index) => (
                  <Link
                    key={doc.slug}
                    href={doc.href}
                    className="block rounded-2xl border border-border/70 bg-background/70 px-4 py-4 transition-colors hover:bg-muted/60"
                  >
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">
                        {String(index + 1).padStart(2, "0")}
                      </Badge>
                      <Badge variant="secondary">{doc.priority}</Badge>
                    </div>
                    <p className="mt-3 font-semibold">{doc.title}</p>
                    <p className="mt-2 text-sm leading-6 text-muted-foreground">
                      {doc.description}
                    </p>
                  </Link>
                ))}
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-6 pb-12">
        <Card className="rounded-[2rem] border border-border/70 bg-card/80">
          <CardHeader className="space-y-4">
            <div className="flex items-center gap-2">
              <SplitSquareVertical className="size-5 text-primary" />
              <CardTitle className="text-2xl">헷갈리기 쉬운 비교 묶음</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-3">
            {COMPARISON_LINKS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-2xl border border-border/70 bg-background/70 p-5 transition-colors hover:bg-muted/60"
              >
                <p className="font-semibold">{item.title}</p>
                <p className="mt-2 text-sm leading-7 text-muted-foreground">
                  {item.description}
                </p>
              </Link>
            ))}
          </CardContent>
          <div className="px-6 pb-6">
            <Link href="/compare" className="inline-flex items-center gap-2 text-sm font-medium text-primary">
              비교 허브 전체 보기
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </Card>
      </section>

      <section className="mx-auto w-full max-w-7xl px-6 pb-24">
        <Card className="rounded-[2rem] border border-border/70 bg-card/80">
          <CardHeader className="space-y-4">
            <div className="flex items-center gap-2">
              <BookOpenCheck className="size-5 text-primary" />
              <CardTitle className="text-2xl">문서 사이트 사용 팁</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-3">
            <div className="rounded-2xl border border-border/70 bg-background/70 p-5">
              <p className="font-semibold">정확한 용어부터 찾기</p>
              <p className="mt-2 text-sm leading-7 text-muted-foreground">
                검색창에서 실무 표현이나 별칭으로 먼저 찾고, 상세 문서에서 정확한
                용어를 통일하면 작업 맥락이 더 빨리 잡힙니다.
              </p>
            </div>
            <div className="rounded-2xl border border-border/70 bg-background/70 p-5">
              <p className="font-semibold">선행 개념 따라가기</p>
              <p className="mt-2 text-sm leading-7 text-muted-foreground">
                문서 헤더의 선행 개념 배지와 문서 하단 추천 학습을 따라가면 용어를
                끊기지 않고 이어서 공부할 수 있습니다.
              </p>
            </div>
            <div className="rounded-2xl border border-border/70 bg-background/70 p-5">
              <p className="font-semibold">프롬프트 예시 바로 복사하기</p>
              <p className="mt-2 text-sm leading-7 text-muted-foreground">
                각 문서의 프롬프트 블록은 AI IDE에 바로 붙여 넣을 수 있게 작성돼
                있어 개념 학습과 실전 요청을 동시에 연습할 수 있습니다.
              </p>
            </div>
          </CardContent>
        </Card>
      </section>
    </main>
  );
}
