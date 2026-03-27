import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpen, Compass, LifeBuoy } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DOC_CATEGORY_LABELS } from "@/lib/docs-config";
import { getAllDocsMeta } from "@/lib/mdx";
import { CATEGORY_META } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "문서 허브",
  description:
    "UI/UX, 프론트엔드, 백엔드 핵심 문서를 탐색하면서 스스로 필요한 개념부터 찾아 읽을 수 있는 문서 허브입니다.",
};

export default function DocsHubPage() {
  const docs = getAllDocsMeta();
  const categoryCards = Object.entries(CATEGORY_META).map(([category, meta]) => ({
    category,
    ...meta,
    docs: docs.filter((doc) => doc.category === category).slice(0, 4),
  }));
  const starterDocs = docs.filter((doc) => doc.priority === "P1").slice(0, 6);

  return (
    <main className="mx-auto w-full max-w-6xl px-6 py-12">
      <section className="rounded-[1.5rem] border border-border/80 bg-card/72 px-6 py-8 sm:px-10 sm:py-10">
        <div className="space-y-4">
          <Badge variant="secondary" className="w-fit">
            문서 허브
          </Badge>
          <div className="space-y-3">
            <h1 className="flex items-center gap-3 text-3xl font-semibold tracking-tight sm:text-4xl">
              <BookOpen className="size-7 text-primary" />
              문서 중심으로 탐색하는 학습 허브
            </h1>
            <p className="max-w-3xl text-base leading-8 text-muted-foreground">
              정해진 순서를 강하게 밀기보다, 지금 막히는 개념부터 문서를 찾아 읽고
              필요한 만큼만 이어서 확장할 수 있게 정리한 시작점입니다.
            </p>
          </div>
        </div>
      </section>

      <section className="mt-8 rounded-[1.5rem] border border-border/80 bg-background/68 px-6 py-6">
        <div className="flex items-center gap-2">
          <Compass className="size-5 text-primary" />
          <h2 className="text-xl font-semibold tracking-tight">이 페이지를 쓰는 법</h2>
        </div>
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          <InfoBlock
            title="막히는 단어부터 찾기"
            description="지금 이해가 안 되는 용어나 기능 개념부터 찾아 읽고, 필요한 만큼만 이어서 확장하세요."
          />
          <InfoBlock
            title="선행 개념 따라가기"
            description="문서 카드의 선행 개념과 추천 문서를 따라가면 과하게 넓히지 않고 학습 범위를 유지할 수 있습니다."
          />
          <InfoBlock
            title="실전 섹션은 나중에"
            description="문서로 개념을 잡은 뒤에만 가이드, 사례집, 실습으로 넘어가면 덜 헷갈립니다."
          />
        </div>
      </section>

      <section className="mt-8">
        <div className="space-y-2 pb-4">
          <h2 className="text-2xl font-semibold tracking-tight">먼저 읽기 좋은 핵심 문서</h2>
          <p className="text-sm leading-7 text-muted-foreground">
            입문자가 스스로 탐색을 시작할 때 부담 없이 열기 좋은 P1 문서들입니다.
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {starterDocs.map((doc) => (
            <Link key={doc.slug} href={doc.href} className="block h-full">
              <Card className="flex h-full flex-col rounded-[1.375rem] border border-border/80 bg-card/78 transition-colors hover:bg-muted/45">
                <CardHeader className="flex-1 space-y-3">
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary">{doc.priority}</Badge>
                    <Badge variant="outline">{doc.difficulty}</Badge>
                    <Badge variant="outline">
                      {DOC_CATEGORY_LABELS[doc.category]}
                    </Badge>
                  </div>
                  <CardTitle className="line-clamp-2 text-xl">{doc.title}</CardTitle>
                </CardHeader>
                <CardContent className="mt-auto border-t border-border/70 pt-4">
                  <p className="line-clamp-4 text-sm leading-7 text-muted-foreground">
                    {doc.description}
                  </p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      <section className="mt-8 grid gap-5 lg:grid-cols-3">
        {categoryCards.map((item) => (
            <Card
              key={item.category}
              className="flex h-full flex-col rounded-[1.5rem] border border-border/80 bg-card/78"
            >
              <CardHeader className="flex-1 space-y-3">
                <CardTitle className="text-xl">{item.title}</CardTitle>
                <p className="line-clamp-4 text-sm leading-7 text-muted-foreground">
                  {item.description}
                </p>
              </CardHeader>
              <CardContent className="mt-auto space-y-3">
                {item.docs.map((doc) => (
                  <Link
                    key={doc.slug}
                    href={doc.href}
                    className="flex min-h-32 flex-col rounded-[1.25rem] border border-border/80 bg-background/72 px-4 py-4 transition-colors hover:bg-muted/45"
                  >
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline">{doc.priority}</Badge>
                    <Badge variant="outline">{doc.difficulty}</Badge>
                  </div>
                    <p className="mt-2 line-clamp-2 font-semibold">{doc.title}</p>
                    <p className="mt-2 line-clamp-3 text-sm leading-6 text-muted-foreground">
                      {doc.description}
                    </p>
                  </Link>
                ))}
                <Link
                  href={`/docs/${item.category}`}
                  className="inline-flex items-center gap-2 border-t border-border/70 pt-1 text-sm font-medium text-primary"
                >
                  카테고리 전체 보기
                  <ArrowRight className="size-4" />
              </Link>
            </CardContent>
          </Card>
        ))}
      </section>

      <section className="mt-10 rounded-[1.5rem] border border-dashed border-border/80 bg-background/55 px-6 py-6">
        <div className="flex items-center gap-2">
          <LifeBuoy className="size-5 text-primary" />
          <h2 className="text-xl font-semibold tracking-tight">막힐 때 쓰는 보조 탐색</h2>
        </div>
        <p className="mt-3 max-w-4xl text-sm leading-7 text-muted-foreground">
          문서로 개념을 먼저 잡은 뒤에도 용어 차이나 실제 기능 흐름이 헷갈릴 때만
          아래 보조 도구로 확장하면 됩니다.
        </p>
        <div className="mt-5 grid gap-4 lg:grid-cols-2">
          <Link href="/compare" className="block h-full">
            <Card className="flex h-full flex-col rounded-[1.375rem] border border-border/80 bg-card/78 transition-colors hover:bg-muted/45">
              <CardHeader className="flex-1 space-y-3">
                <CardTitle className="text-xl">비교 허브</CardTitle>
                <p className="text-sm leading-7 text-muted-foreground">
                  모달과 다이얼로그처럼 비슷한 용어 차이를 빠르게 확인해야 할 때
                  쓰는 보조 도구입니다.
                </p>
              </CardHeader>
              <CardContent className="mt-auto border-t border-border/70 pt-4 text-sm font-medium text-primary">
                비교 허브 열기
              </CardContent>
            </Card>
          </Link>
          <Link href="/scenarios" className="block h-full">
            <Card className="flex h-full flex-col rounded-[1.375rem] border border-border/80 bg-card/78 transition-colors hover:bg-muted/45">
              <CardHeader className="flex-1 space-y-3">
                <CardTitle className="text-xl">상황 허브</CardTitle>
                <p className="text-sm leading-7 text-muted-foreground">
                  회원가입, 검색처럼 실제 기능 단위에서 어떤 문서와 실전 자료를
                  먼저 볼지 막막할 때 쓰는 보조 도구입니다.
                </p>
              </CardHeader>
              <CardContent className="mt-auto border-t border-border/70 pt-4 text-sm font-medium text-primary">
                상황 허브 열기
              </CardContent>
            </Card>
          </Link>
        </div>
        <div className="mt-5 grid gap-4 lg:grid-cols-3">
          {[
            {
              title: "기능 가이드",
              description: "문서 개념을 실제 화면·상태·API 흐름으로 이어서 보고 싶을 때 봅니다.",
              href: "/guides",
            },
            {
              title: "사례집",
              description: "실제 기능을 AI IDE에 끝까지 시키는 완성형 예시를 보고 싶을 때 봅니다.",
              href: "/casebooks",
            },
            {
              title: "실습 훈련",
              description: "직접 요청문을 고치며 연습하고 싶을 때 마지막 단계로 넘어갑니다.",
              href: "/workouts",
            },
          ].map((item) => (
            <Link key={item.href} href={item.href} className="flex min-h-32 flex-col rounded-[1.25rem] border border-border/80 bg-card/78 px-4 py-4 transition-colors hover:bg-muted/45">
              <p className="font-semibold">{item.title}</p>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                {item.description}
              </p>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}

function InfoBlock({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div>
      <p className="font-medium">{title}</p>
      <p className="mt-2 text-sm leading-7 text-muted-foreground">
        {description}
      </p>
    </div>
  );
}
