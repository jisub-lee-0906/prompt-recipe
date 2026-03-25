import Link from "next/link";
import {
  ArrowRight,
  Blocks,
  BookCopy,
  BookOpenText,
  BrushCleaning,
  Compass,
  DatabaseZap,
  Dumbbell,
  Layers3,
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
import { getAllDocsMeta, getDocsBySlugs } from "@/lib/mdx";
import { getPlaybooks } from "@/lib/playbooks";
import {
  CATEGORY_META,
  CHANGELOG_ENTRIES,
  ROLE_PATHS,
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
  const firstDoc = docs[0];
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
  const rolePaths = ROLE_PATHS.map((pathItem) => ({
    ...pathItem,
    docs: getDocsBySlugs([...pathItem.slugs]),
  }));

  return (
    <main className="bg-[radial-gradient(circle_at_top,rgba(34,197,94,0.08),transparent_30%),linear-gradient(to_bottom,transparent,rgba(15,23,42,0.03))]">
      <section className="mx-auto flex min-h-[calc(100vh-var(--header-height))] w-full max-w-7xl items-center px-6 py-16">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
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
                  기획자, 디자이너, 주니어 개발자가 웹 개발과 UI/UX 언어를 빠르게
                  익히고 AI IDE에 더 정확한 요청을 전달하도록 돕는 정적 문서형
                  교과서입니다.
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
              <Link href="/tracks">
                <Button variant="outline" size="lg">
                  학습 트랙
                </Button>
              </Link>
              <Link href="/casebooks">
                <Button variant="outline" size="lg">
                  사례집
                </Button>
              </Link>
            </div>
          </div>

          <div className="grid gap-4">
            {rolePaths.map((pathItem) => (
              <Card
                key={pathItem.role}
                className="rounded-[1.75rem] border border-border/70 bg-card/80"
              >
                <CardHeader className="space-y-3">
                  <div className="flex items-center justify-between gap-3">
                    <CardTitle className="flex items-center gap-2 text-xl">
                      <Sparkles className="size-4 text-primary" />
                      {pathItem.role}
                    </CardTitle>
                    <Badge variant="secondary">{pathItem.docs.length}개</Badge>
                  </div>
                  <p className="text-sm leading-7 text-muted-foreground">
                    {pathItem.description}
                  </p>
                </CardHeader>
                <CardContent className="flex flex-wrap gap-2">
                  {pathItem.docs.slice(0, 2).map((doc) => (
                    <Link
                      key={doc.slug}
                      href={doc.href}
                      className="rounded-full border border-border/70 px-3 py-1 text-sm transition-colors hover:bg-muted/60"
                    >
                      {doc.title}
                    </Link>
                  ))}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <SectionHeader
        eyebrow="Project Casebooks"
        title="프로젝트 사례집"
        description="회원가입, 로그인, 검색, 결제처럼 실제 기능을 AI IDE에 끝까지 시키는 완성형 사례를 먼저 보여줍니다."
      />
      <CardGrid>
        {casebooks.map((casebook) => (
          <Link key={casebook.slug} href={`/casebooks/${casebook.slug}`}>
            <Card className="rounded-[1.75rem] border border-border/70 bg-card/80 transition-transform duration-200 hover:-translate-y-1 hover:shadow-lg">
              <CardHeader className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">{casebook.level}</Badge>
                  {casebook.roles.slice(0, 2).map((role) => (
                    <Badge key={role} variant="outline">
                      {role}
                    </Badge>
                  ))}
                </div>
                <CardTitle className="text-xl">{casebook.title}</CardTitle>
                <p className="text-sm leading-7 text-muted-foreground">
                  {casebook.summary}
                </p>
              </CardHeader>
              <CardContent className="inline-flex items-center gap-2 text-sm font-medium text-primary">
                <BookCopy className="size-4" />
                사례집 보기
              </CardContent>
            </Card>
          </Link>
        ))}
      </CardGrid>

      <SectionHeader
        eyebrow="Feature Guides"
        title="기능 가이드"
        description="로그인, 검색, 업로드처럼 화면·상태·API를 묶어서 읽는 기능 단위 가이드입니다."
      />
      <CardGrid>
        {guides.map((guide) => (
          <Link key={guide.slug} href={`/guides/${guide.slug}`}>
            <Card className="rounded-[1.75rem] border border-border/70 bg-card/80 transition-transform duration-200 hover:-translate-y-1 hover:shadow-lg">
              <CardHeader className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">{guide.level}</Badge>
                  {guide.audience.slice(0, 2).map((role) => (
                    <Badge key={role} variant="outline">
                      {role}
                    </Badge>
                  ))}
                </div>
                <CardTitle className="text-xl">{guide.title}</CardTitle>
                <p className="text-sm leading-7 text-muted-foreground">
                  {guide.summary}
                </p>
              </CardHeader>
              <CardContent className="inline-flex items-center gap-2 text-sm font-medium text-primary">
                <Layers3 className="size-4" />
                기능 가이드 보기
              </CardContent>
            </Card>
          </Link>
        ))}
      </CardGrid>

      <SectionHeader
        eyebrow="Playbooks"
        title="실전 플레이북"
        description="같은 기능도 역할에 따라 어떻게 표현해야 하는지 보여주는 역할별 플레이북입니다."
      />
      <CardGrid>
        {playbooks.map((playbook) => (
          <Link key={playbook.slug} href={`/playbooks/${playbook.slug}`}>
            <Card className="rounded-[1.75rem] border border-border/70 bg-card/80 transition-transform duration-200 hover:-translate-y-1 hover:shadow-lg">
              <CardHeader className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">{playbook.role}</Badge>
                  <Badge variant="outline">{playbook.level}</Badge>
                </div>
                <CardTitle className="text-xl">{playbook.title}</CardTitle>
                <p className="text-sm leading-7 text-muted-foreground">
                  {playbook.summary}
                </p>
              </CardHeader>
              <CardContent className="inline-flex items-center gap-2 text-sm font-medium text-primary">
                <BookOpenText className="size-4" />
                플레이북 보기
              </CardContent>
            </Card>
          </Link>
        ))}
      </CardGrid>

      <SectionHeader
        eyebrow="Workouts"
        title="실습 훈련"
        description="나쁜 요청을 좋은 요청으로 고치는 훈련을 통해 직접 표현을 다듬는 단계입니다."
      />
      <CardGrid>
        {workouts.map((workout) => (
          <Link key={workout.slug} href={`/workouts/${workout.slug}`}>
            <Card className="rounded-[1.75rem] border border-border/70 bg-card/80 transition-transform duration-200 hover:-translate-y-1 hover:shadow-lg">
              <CardHeader className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">{workout.role}</Badge>
                  <Badge variant="outline">{workout.level}</Badge>
                </div>
                <CardTitle className="text-xl">{workout.title}</CardTitle>
                <p className="text-sm leading-7 text-muted-foreground">
                  {workout.problem}
                </p>
              </CardHeader>
              <CardContent className="inline-flex items-center gap-2 text-sm font-medium text-primary">
                <Dumbbell className="size-4" />
                실습 열기
              </CardContent>
            </Card>
          </Link>
        ))}
      </CardGrid>

      <SectionHeader
        eyebrow="Compare Hub"
        title="비교 허브와 상황 허브"
        description="헷갈리는 개념은 비교로 풀고, 실제 기능 상황은 추천 경로로 바로 들어갈 수 있게 구성했습니다."
      />
      <section className="mx-auto grid w-full max-w-7xl gap-5 px-6 pb-12 lg:grid-cols-2">
        <Card className="rounded-[1.75rem] border border-border/70 bg-card/80">
          <CardHeader className="space-y-3">
            <div className="flex items-center gap-2">
              <SplitSquareVertical className="size-5 text-primary" />
              <CardTitle className="text-2xl">비교 허브</CardTitle>
            </div>
            <p className="text-sm leading-7 text-muted-foreground">
              비슷한 개념을 나란히 놓고 차이를 빠르게 판단하는 섹션입니다.
            </p>
          </CardHeader>
          <CardContent className="space-y-3">
            {compareItems.map((item) => (
              <Link
                key={item.slug}
                href={`/compare#${item.slug}`}
                className="block rounded-2xl border border-border/70 bg-background/70 px-4 py-4 transition-colors hover:bg-muted/60"
              >
                <p className="font-semibold">{item.title}</p>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  {item.summary}
                </p>
              </Link>
            ))}
          </CardContent>
        </Card>

        <Card className="rounded-[1.75rem] border border-border/70 bg-card/80">
          <CardHeader className="space-y-3">
            <div className="flex items-center gap-2">
              <Compass className="size-5 text-primary" />
              <CardTitle className="text-2xl">상황 허브</CardTitle>
            </div>
            <p className="text-sm leading-7 text-muted-foreground">
              회원가입, 검색, 결제처럼 실제 상황별로 무엇부터 읽을지 안내합니다.
            </p>
          </CardHeader>
          <CardContent className="space-y-3">
            {scenarioItems.map((item) => (
              <Link
                key={item.slug}
                href={`/scenarios#${item.slug}`}
                className="block rounded-2xl border border-border/70 bg-background/70 px-4 py-4 transition-colors hover:bg-muted/60"
              >
                <p className="font-semibold">{item.title}</p>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  {item.summary}
                </p>
              </Link>
            ))}
          </CardContent>
        </Card>
      </section>

      <SectionHeader
        eyebrow="Docs"
        title="카테고리별 문서 진입"
        description="UI/UX, 프론트엔드, 백엔드 핵심 개념을 카테고리별로 탐색할 수 있습니다."
      />
      <section className="mx-auto grid w-full max-w-7xl gap-5 px-6 pb-12 lg:grid-cols-3">
        {categoryCards.map((item) => {
          const Icon = CATEGORY_ICONS[item.category as keyof typeof CATEGORY_ICONS];

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
                  {DOC_CATEGORY_LABELS[item.category as keyof typeof DOC_CATEGORY_LABELS]} 문서 보기
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </section>

      <SectionHeader
        eyebrow="Updates"
        title="최근 업데이트"
        description="문서와 학습 허브가 어떻게 발전하고 있는지 빠르게 확인할 수 있습니다."
      />
      <section className="mx-auto grid w-full max-w-7xl gap-5 px-6 pb-24 lg:grid-cols-3">
        {CHANGELOG_ENTRIES.slice(0, 3).map((entry) => (
          <Card
            key={entry.date}
            className="rounded-[1.75rem] border border-border/70 bg-card/80"
          >
            <CardHeader className="space-y-2">
              <Badge variant="secondary">{entry.date}</Badge>
              <CardTitle className="text-xl">{entry.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm leading-7 text-muted-foreground">
                {entry.description}
              </p>
            </CardContent>
          </Card>
        ))}
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
