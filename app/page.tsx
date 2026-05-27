import Link from "next/link";
import {
  ArrowRight,
  Blocks,
  BrushCleaning,
  DatabaseZap,
  Sparkles,
} from "lucide-react";

import {
  HomeSearchButton,
  SearchGuideButton,
} from "@/components/search/home-search-button";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getCasebooks } from "@/lib/casebooks";
import { DOC_CATEGORY_LABELS } from "@/lib/docs-config";
import { getFeatureGuides } from "@/lib/guides";
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
  const categoryCards = Object.entries(CATEGORY_META).map(([category, meta]) => ({
    category,
    ...meta,
    docs: docs.filter((doc) => doc.category === category).slice(0, 3),
  }));
  const compactSections = [
    {
      title: "사례집",
      description: "문서로 개념을 잡은 뒤 실제 기능 단위 완성 예시를 빠르게 확인합니다.",
      href: "/casebooks",
      label: "사례집 전체 보기",
      items: casebooks.map((casebook) => ({
        href: `/casebooks/${casebook.slug}`,
        title: casebook.title,
        summary: casebook.summary,
      })),
    },
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
    <main className="bg-[radial-gradient(circle_at_top,rgba(34,197,94,0.04),transparent_24%),linear-gradient(to_bottom,transparent,rgba(15,23,42,0.015))]">
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

          <Card className="rounded-[1.5rem] border border-border/80 bg-card/78">
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
              <Link
                href="/docs"
                className="block rounded-[1.25rem] border border-border/80 bg-background/72 px-4 py-4 transition-colors hover:bg-muted/45"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-2">
                    <p className="font-semibold">개념이 막힐 때</p>
                    <p className="text-sm leading-6 text-muted-foreground">
                      문서 허브나 검색에서 모달, 상태 관리, API 같은 개념 문서부터 바로 여세요.
                    </p>
                    <p className="text-xs font-medium text-primary">문서 허브 열기</p>
                  </div>
                  <ArrowRight className="mt-1 size-4 shrink-0 text-primary" />
                </div>
              </Link>
              <SearchGuideButton />
              <Link
                href="/docs"
                className="block rounded-[1.25rem] border border-border/80 bg-background/72 px-4 py-4 transition-colors hover:bg-muted/45"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-2">
                    <p className="font-semibold">구체적인 예시가 필요할 때</p>
                    <p className="text-sm leading-6 text-muted-foreground">
                      문서를 먼저 읽고 난 뒤에만 가이드, 사례집, 실습으로 확장하면 학습 흐름이 덜 흐트러집니다.
                    </p>
                    <p className="text-xs font-medium text-primary">문서부터 읽기</p>
                  </div>
                  <ArrowRight className="mt-1 size-4 shrink-0 text-primary" />
                </div>
              </Link>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="mx-auto grid w-full max-w-7xl gap-5 px-6 pb-12 lg:grid-cols-3">
        <LearningPromiseCard
          title="먼저 문서부터 읽기"
          description="막히는 개념을 검색과 문서 허브에서 바로 찾고, 필요한 만큼만 이어서 읽는 흐름을 기본으로 둡니다."
        />
        <LearningPromiseCard
          title="개념 다음에 확장하기"
          description="처음부터 사례집과 실습으로 넓히기보다 문서로 개념을 잡은 뒤 실전 섹션으로 넘어가면 덜 헷갈립니다."
        />
        <LearningPromiseCard
          title="검색을 같이 쓰기"
          description="문서 제목, 태그, 선행 개념으로 바로 검색하면 홈에서 길을 고르는 시간보다 실제 학습으로 더 빨리 들어갈 수 있습니다."
        />
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
              <Card className="flex h-full flex-col rounded-[1.5rem] border border-border/80 bg-card/78 py-0 transition-colors duration-200 hover:bg-muted/35">
                <CardHeader className="flex min-h-44 flex-1 flex-row items-start justify-between gap-4 px-6 py-6">
                  <div className="space-y-3">
                    <CardTitle className="text-xl">{item.title}</CardTitle>
                    <p className="line-clamp-4 text-sm leading-7 text-muted-foreground">
                      {item.description}
                    </p>
                  </div>
                  <div className="flex size-12 shrink-0 items-center justify-center rounded-[1.25rem] bg-primary/8 text-primary">
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
        eyebrow="보조 탐색"
        title="문서 다음에 확장할 실전 섹션"
        description="개념을 먼저 문서로 잡은 뒤, 더 구체적인 예시나 요청 연습이 필요할 때만 아래 섹션으로 확장하면 됩니다."
      />
      <section className="mx-auto grid w-full max-w-7xl gap-5 px-6 pb-12 xl:grid-cols-2">
        {compactSections.map((section) => (
          <Card
            key={section.title}
            className="flex h-full flex-col rounded-[1.5rem] border border-border/80 bg-card/78"
          >
            <CardHeader className="flex-1 space-y-3">
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
                  className="flex min-h-28 flex-col rounded-[1.25rem] border border-border/80 bg-background/72 px-4 py-4 transition-colors hover:bg-muted/45"
                >
                  <p className="line-clamp-2 font-semibold">{item.title}</p>
                  <p className="mt-2 line-clamp-3 text-sm leading-6 text-muted-foreground">
                    {item.summary}
                  </p>
                </Link>
              ))}
              <Link
                href={section.href}
                className="inline-flex items-center gap-2 border-t border-border/70 pt-1 text-sm font-medium text-primary"
              >
                {section.label}
                <ArrowRight className="size-4" />
              </Link>
            </CardContent>
          </Card>
        ))}
      </section>

      <section className="mx-auto w-full max-w-7xl px-6 pb-12">
        <div className="rounded-[1.5rem] border border-dashed border-border/80 bg-background/55 px-6 py-6">
          <p className="text-sm font-medium text-foreground">막힐 때 쓰는 보조 도구</p>
          <p className="mt-2 max-w-4xl text-sm leading-7 text-muted-foreground">
            용어 차이가 헷갈릴 때는 비교 허브, 실제 기능 상황에서 무엇부터 읽어야
            할지 막막할 때는 상황 허브를 보조 탐색 도구로 쓰면 됩니다.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <Link href="/compare" className="inline-flex items-center gap-2 text-sm font-medium text-primary">
              비교 허브 보기
              <ArrowRight className="size-4" />
            </Link>
            <Link href="/scenarios" className="inline-flex items-center gap-2 text-sm font-medium text-primary">
              상황 허브 보기
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </section>

      <SectionHeader
        eyebrow="최근 업데이트"
        title="최근 업데이트"
        description="문서와 학습 허브가 어떻게 발전하고 있는지 빠르게 확인할 수 있습니다."
      />
      <section className="mx-auto w-full max-w-7xl px-6 pb-24">
        <div className="rounded-[1.5rem] border border-border/80 bg-card/78 p-6">
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

function LearningPromiseCard({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
      <Card className="flex h-full flex-col rounded-[1.5rem] border border-border/80 bg-card/78">
      <CardHeader className="flex-1 space-y-3">
        <CardTitle className="text-xl">{title}</CardTitle>
      </CardHeader>
      <CardContent className="mt-auto border-t border-border/70 pt-4">
        <p className="text-sm leading-7 text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
}
