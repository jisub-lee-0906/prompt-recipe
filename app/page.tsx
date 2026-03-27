import Link from "next/link";
import {
  ArrowRight,
  Blocks,
  BookCopy,
  BrushCleaning,
  DatabaseZap,
  Compass,
  Sparkles,
  SplitSquareVertical,
} from "lucide-react";

import { HomeSearchButton } from "@/components/search/home-search-button";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getCasebooks } from "@/lib/casebooks";
import { DOC_CATEGORY_LABELS } from "@/lib/docs-config";
import { getFeatureGuides } from "@/lib/guides";
import { getComparisonHubItems, getScenarioHubItems } from "@/lib/hubs";
import { getAllDocsMeta } from "@/lib/mdx";
import { getPlaybooks } from "@/lib/playbooks";
import {
  CATEGORY_META,
  CHANGELOG_ENTRIES,
  SITE_NAME,
} from "@/lib/site-config";
import { getWorkouts } from "@/lib/workouts";

const CATEGORY_ICONS = {
  "ui-ux": BrushCleaning,
  frontend: Blocks,
  backend: DatabaseZap,
} as const;

export default function Home() {
  const docs = getAllDocsMeta();
  const casebooks = getCasebooks().slice(0, 3);
  const guides = getFeatureGuides().slice(0, 3);
  const playbooks = getPlaybooks().slice(0, 3);
  const workouts = getWorkouts().slice(0, 3);
  const compareItems = getComparisonHubItems().slice(0, 3);
  const scenarioItems = getScenarioHubItems().slice(0, 3);
  const categoryCards = Object.entries(CATEGORY_META).map(([category, meta]) => ({
    category,
    ...meta,
    docs: docs.filter((doc) => doc.category === category).slice(0, 3),
  }));
  const compactSections = [
    {
      title: "기능 가이드",
      description: "기능 단위로 읽으며 화면, 상태, API를 한 묶음으로 익힙니다.",
      href: "/guides",
      label: "가이드 전체 보기",
      items: guides.map((guide) => ({
        href: `/guides/${guide.slug}`,
        title: guide.title,
        summary: guide.summary,
      })),
    },
    {
      title: "실전 플레이북",
      description: "자주 마주치는 실전 상황을 어떤 순서와 표현으로 요청할지 정리했습니다.",
      href: "/playbooks",
      label: "플레이북 전체 보기",
      items: playbooks.map((playbook) => ({
        href: `/playbooks/${playbook.slug}`,
        title: playbook.title,
        summary: playbook.summary,
      })),
    },
    {
      title: "실습 훈련",
      description: "나쁜 요청을 좋은 요청으로 직접 고치며 표현을 몸에 익힙니다.",
      href: "/workouts",
      label: "실습 전체 보기",
      items: workouts.map((workout) => ({
        href: `/workouts/${workout.slug}`,
        title: workout.title,
        summary: workout.problem,
      })),
    },
  ];
  return (
    <main className="bg-[radial-gradient(circle_at_top,rgba(34,197,94,0.08),transparent_30%),linear-gradient(to_bottom,transparent,rgba(15,23,42,0.03))]">
      <section className="mx-auto flex min-h-[calc(100vh-var(--header-height))] w-full max-w-7xl items-center px-6 py-16">
        <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
          <div className="space-y-8">
            <div className="space-y-5">
              <p className="text-sm font-medium uppercase tracking-[0.22em] text-muted-foreground">
                AI IDE 협업 교과서
              </p>
              <div className="space-y-4">
                <h1 className="max-w-4xl text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
                  {SITE_NAME}
                </h1>
                <p className="max-w-2xl text-base leading-8 text-muted-foreground sm:text-lg">
                  웹 개발과 UI/UX 언어를 빠르게 익히고 AI IDE에 더 정확한 요청을
                  전달할 수 있도록 돕는 정적 문서형 교과서입니다. 문서 허브를
                  중심으로 필요한 개념을 직접 찾아 읽고, 필요할 때만 가이드와
                  사례집으로 확장하면 됩니다.
                </p>
              </div>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link href="/docs">
                <Button size="lg">
                  문서 허브로 시작
                  <ArrowRight className="size-4" />
                </Button>
              </Link>
              <HomeSearchButton />
            </div>
          </div>

          <Card className="rounded-[1.75rem] border border-border/70 bg-card/80">
            <CardHeader className="space-y-3">
              <CardTitle className="flex items-center gap-2 text-xl">
                <Sparkles className="size-4 text-primary" />
                문서 허브를 먼저 쓰는 법
              </CardTitle>
              <p className="text-sm leading-7 text-muted-foreground">
                정해진 순서를 강하게 따르기보다, 지금 막히는 개념부터 문서를 직접
                찾아 읽는 흐름을 기본으로 두는 편이 덜 복잡합니다.
              </p>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                {
                  title: "개념이 막힐 때",
                  description:
                    "문서 허브나 검색에서 모달, 상태 관리, API 같은 개념 문서부터 바로 여세요.",
                  href: "/docs",
                  label: "문서 허브 열기",
                },
                {
                  title: "용어 차이가 헷갈릴 때",
                  description:
                    "비교 허브에서 비슷한 용어 차이를 먼저 정리한 뒤 필요한 문서로 넘어가세요.",
                  href: "/compare",
                  label: "비교 허브 열기",
                },
                {
                  title: "구체적인 예시가 필요할 때",
                  description:
                    "문서로 개념을 잡은 뒤에만 기능 가이드, 사례집, 실습으로 확장하면 덜 헷갈립니다.",
                  href: "/guides",
                  label: "기능 가이드 보기",
                },
              ].map((item) => (
                <Link
                  key={item.title}
                  href={item.href}
                  className="block rounded-2xl border border-border/70 bg-background/70 px-4 py-4 transition-colors hover:bg-muted/60"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="space-y-2">
                      <p className="font-semibold">{item.title}</p>
                      <p className="text-sm leading-6 text-muted-foreground">
                        {item.description}
                      </p>
                      <p className="text-xs font-medium text-primary">{item.label}</p>
                    </div>
                    <ArrowRight className="mt-1 size-4 shrink-0 text-primary" />
                  </div>
                </Link>
              ))}
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="mx-auto grid w-full max-w-7xl gap-5 px-6 pb-12 lg:grid-cols-3">
        <LearningPromiseCard
          title="입문자는 무엇을 얻는가"
          description="용어를 외우는 대신, 어떤 말을 써야 AI IDE가 더 정확하게 움직이는지 빠르게 익힙니다."
        />
        <LearningPromiseCard
          title="실무자는 무엇을 줄이는가"
          description="모호한 요청, 누락된 상태, 뒤늦게 추가되는 예외 처리 같은 재작업을 줄이는 데 초점을 둡니다."
        />
        <LearningPromiseCard
          title="이 교과서는 어떻게 읽는가"
          description="먼저 문서 허브에서 필요한 개념을 직접 찾고, 더 구체적인 예시가 필요할 때만 가이드, 사례집, 실습으로 이어가면 됩니다."
        />
      </section>

      <SectionHeader
        eyebrow="사례집"
        title="프로젝트 사례집"
        description="회원가입, 로그인, 검색, 결제처럼 실제 기능을 AI IDE에 끝까지 시키는 완성형 사례를 먼저 보여줍니다."
      />
      <CardGrid>
        {casebooks.map((casebook) => (
          <Link key={casebook.slug} href={`/casebooks/${casebook.slug}`} className="block h-full">
            <Card className="flex h-full flex-col rounded-[1.75rem] border border-border/70 bg-card/80 transition-transform duration-200 hover:-translate-y-1 hover:shadow-lg">
              <CardHeader className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">{casebook.level}</Badge>
                  <Badge variant="outline">완성형 사례</Badge>
                </div>
                <CardTitle className="text-xl">{casebook.title}</CardTitle>
                <p className="text-sm leading-7 text-muted-foreground">
                  {casebook.summary}
                </p>
              </CardHeader>
              <CardContent className="mt-auto inline-flex items-center gap-2 text-sm font-medium text-primary">
                <BookCopy className="size-4" />
                사례집 보기
              </CardContent>
            </Card>
          </Link>
        ))}
      </CardGrid>

      <section className="mx-auto w-full max-w-7xl px-6 pb-12">
        <div className="rounded-[1.75rem] border border-border/70 bg-background/70 px-6 py-6">
          <p className="text-sm font-medium text-foreground">사례집을 먼저 봐야 하는 순간</p>
          <p className="mt-2 max-w-4xl text-sm leading-7 text-muted-foreground">
            단어 뜻은 알겠는데 실제 기능을 어디서부터 어떻게 시켜야 할지 막막할 때는
            사례집부터 보는 편이 빠릅니다. 화면, 상태, API, 완료 조건이 한 흐름으로
            묶여 있어서 실무 감각을 더 빨리 잡을 수 있습니다.
          </p>
        </div>
      </section>

      <SectionHeader
        eyebrow="실전 학습 허브"
        title="가이드, 플레이북, 실습을 짧게 고르기"
        description="홈에서는 대표 항목만 먼저 고르고, 자세한 탐색은 각 허브 페이지에서 이어서 할 수 있게 정리했습니다."
      />
      <section className="mx-auto grid w-full max-w-7xl gap-5 px-6 pb-12 lg:grid-cols-3">
        {compactSections.map((section) => (
          <Card
            key={section.title}
            className="flex h-full flex-col rounded-[1.75rem] border border-border/70 bg-card/80"
          >
            <CardHeader className="space-y-3">
              <CardTitle className="text-xl">{section.title}</CardTitle>
              <p className="text-sm leading-7 text-muted-foreground">
                {section.description}
              </p>
            </CardHeader>
            <CardContent className="mt-auto space-y-3">
              {section.items.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block rounded-2xl border border-border/70 bg-background/70 px-4 py-4 transition-colors hover:bg-muted/60"
                >
                  <p className="font-semibold">{item.title}</p>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground line-clamp-2">
                    {item.summary}
                  </p>
                </Link>
              ))}
              <Link
                href={section.href}
                className="inline-flex items-center gap-2 text-sm font-medium text-primary"
              >
                {section.label}
                <ArrowRight className="size-4" />
              </Link>
            </CardContent>
          </Card>
        ))}
      </section>

      <SectionHeader
        eyebrow="비교 허브"
        title="비교 허브와 상황 허브"
        description="헷갈리는 개념은 비교로 풀고, 실제 기능 상황은 추천 경로로 바로 들어갈 수 있게 구성했습니다."
      />
      <section className="mx-auto grid w-full max-w-7xl gap-6 px-6 pb-12 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="rounded-[1.75rem] border border-border/70 bg-card/80 p-6">
          <div className="flex items-center gap-2">
            <SplitSquareVertical className="size-5 text-primary" />
            <h3 className="text-xl font-semibold tracking-tight">비교 허브</h3>
          </div>
          <p className="mt-3 text-sm leading-7 text-muted-foreground">
            비슷한 개념의 차이를 빠르게 구분하고 싶을 때 가장 먼저 보면 좋은 허브입니다.
          </p>
          <div className="mt-5 space-y-3">
            {compareItems.map((item) => (
              <Link
                key={item.slug}
                href={`/compare#${item.slug}`}
                className="block border-b border-border/70 pb-3 last:border-b-0 last:pb-0"
              >
                <p className="font-semibold">{item.title}</p>
                <p className="mt-1 text-sm leading-6 text-muted-foreground">
                  {item.summary}
                </p>
              </Link>
            ))}
          </div>
        </div>

        <div className="rounded-[1.75rem] border border-border/70 bg-card/80 p-6">
          <div className="flex items-center gap-2">
            <Compass className="size-5 text-primary" />
            <h3 className="text-xl font-semibold tracking-tight">상황 허브</h3>
          </div>
          <p className="mt-3 text-sm leading-7 text-muted-foreground">
            실제 기능 상황에 따라 무엇부터 읽어야 할지 빠르게 고를 수 있는 요약 허브입니다.
          </p>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {scenarioItems.map((item) => (
              <Link
                key={item.slug}
                href={`/scenarios#${item.slug}`}
                className="rounded-2xl border border-border/70 bg-background/70 px-4 py-4 transition-colors hover:bg-muted/60"
              >
                <p className="font-semibold">{item.title}</p>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  {item.summary}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <SectionHeader
        eyebrow="문서"
        title="카테고리별 문서 진입"
        description="UI/UX, 프론트엔드, 백엔드 핵심 개념을 카테고리별로 탐색할 수 있습니다."
      />
      <section className="mx-auto grid w-full max-w-7xl gap-5 px-6 pb-12 lg:grid-cols-3">
        {categoryCards.map((item) => {
          const Icon = CATEGORY_ICONS[item.category as keyof typeof CATEGORY_ICONS];

          return (
            <Link key={item.category} href={`/docs/${item.category}`} className="block h-full">
              <Card className="flex h-full flex-col rounded-[1.75rem] border border-border/70 bg-card/80 py-0 transition-transform duration-200 hover:-translate-y-1 hover:shadow-lg">
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
                <CardContent className="mt-auto border-t border-border/70 px-6 py-4 text-sm font-medium text-muted-foreground">
                  {DOC_CATEGORY_LABELS[item.category as keyof typeof DOC_CATEGORY_LABELS]} 문서 보기
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </section>

      <SectionHeader
        eyebrow="최근 업데이트"
        title="최근 업데이트"
        description="문서와 학습 허브가 어떻게 발전하고 있는지 빠르게 확인할 수 있습니다."
      />
      <section className="mx-auto w-full max-w-7xl px-6 pb-24">
        <div className="rounded-[1.75rem] border border-border/70 bg-card/80 p-6">
          <div className="space-y-4">
            {CHANGELOG_ENTRIES.slice(0, 3).map((entry) => (
              <div
                key={entry.date}
                className="border-b border-border/70 pb-4 last:border-b-0 last:pb-0"
              >
                <div className="flex flex-wrap items-center gap-3">
                  <Badge variant="secondary">{entry.date}</Badge>
                  <p className="font-semibold">{entry.title}</p>
                </div>
                <p className="mt-2 text-sm leading-7 text-muted-foreground">
                  {entry.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

function SectionHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <section className="mx-auto w-full max-w-7xl px-6 pb-6">
      <div className="space-y-4">
        <p className="text-sm font-medium uppercase tracking-[0.22em] text-muted-foreground">
          {eyebrow}
        </p>
        <h2 className="text-3xl font-semibold tracking-tight">{title}</h2>
        <p className="max-w-3xl text-base leading-8 text-muted-foreground">
          {description}
        </p>
      </div>
    </section>
  );
}

function CardGrid({ children }: { children: React.ReactNode }) {
  return (
    <section className="mx-auto grid w-full max-w-7xl gap-5 px-6 pb-12 lg:grid-cols-3">
      {children}
    </section>
  );
}

function LearningPromiseCard({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <Card className="flex h-full flex-col rounded-[1.75rem] border border-border/70 bg-card/80">
      <CardHeader className="space-y-3">
        <CardTitle className="text-xl">{title}</CardTitle>
      </CardHeader>
      <CardContent className="mt-auto">
        <p className="text-sm leading-7 text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
}
