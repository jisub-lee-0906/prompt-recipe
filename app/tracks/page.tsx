import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookMarked, Layers3, Sparkles } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getCasebookBySlug } from "@/lib/casebooks";
import { getFeatureGuideBySlug } from "@/lib/guides";
import { getDocsBySlugs } from "@/lib/mdx";
import { getPlaybookBySlug } from "@/lib/playbooks";
import { getLearningTracks } from "@/lib/tracks";
import { getWorkoutBySlug } from "@/lib/workouts";

export const metadata: Metadata = {
  title: "학습 트랙",
  description:
    "기획자, 디자이너, 주니어 개발자가 문서부터 사례집과 실습까지 어떤 순서로 읽으면 좋은지 정리한 학습 허브입니다.",
};

export default function TracksPage() {
  const tracks = getLearningTracks();

  return (
    <main className="mx-auto w-full max-w-6xl px-6 py-12">
      <section className="rounded-[2rem] border border-border/70 bg-card/70 px-6 py-8 shadow-sm backdrop-blur sm:px-10 sm:py-10">
        <div className="space-y-4">
          <Badge variant="secondary" className="w-fit">
            학습 트랙
          </Badge>
          <div className="space-y-3">
            <h1 className="flex items-center gap-3 text-3xl font-semibold tracking-tight sm:text-4xl">
              <BookMarked className="size-7 text-primary" />
              역할별 학습 트랙 허브
            </h1>
            <p className="max-w-3xl text-base leading-8 text-muted-foreground">
              문서, 플레이북, 기능 가이드, 사례집, 실습을 한 번에 따라가며
              AI IDE와 협업하는 언어를 단계적으로 익히는 경로입니다.
            </p>
          </div>
        </div>
      </section>

      <section className="mt-8 grid gap-6">
        {tracks.map((track) => {
          const docs = getDocsBySlugs(track.docs);
          const playbooks = track.playbooks
            .map((slug) => getPlaybookBySlug(slug))
            .filter((item) => item !== null);
          const guides = track.guides
            .map((slug) => getFeatureGuideBySlug(slug))
            .filter((item) => item !== null);
          const casebooks = track.casebooks
            .map((slug) => getCasebookBySlug(slug))
            .filter((item) => item !== null);
          const workouts = track.workouts
            .map((slug) => getWorkoutBySlug(slug))
            .filter((item) => item !== null);

          return (
            <Card
              key={track.role}
              className="rounded-[2rem] border border-border/70 bg-card/80"
            >
              <CardHeader className="space-y-4">
                <div className="flex items-center justify-between gap-4">
                  <CardTitle className="flex items-center gap-2 text-2xl">
                    <Sparkles className="size-5 text-primary" />
                    {track.role}
                  </CardTitle>
                  <Badge variant="secondary">
                    문서 {docs.length} · 플레이북 {playbooks.length} · 가이드{" "}
                    {guides.length} · 사례집 {casebooks.length} · 실습{" "}
                    {workouts.length}
                  </Badge>
                </div>
                <p className="max-w-3xl text-sm leading-7 text-muted-foreground">
                  {track.summary}
                </p>
              </CardHeader>

              <CardContent className="grid gap-5 xl:grid-cols-5">
                <TrackColumn
                  label="1단계"
                  title="핵심 용어 문서"
                  items={docs.map((doc) => ({
                    href: doc.href,
                    title: doc.title,
                    summary: doc.description,
                    badges: [doc.priority, doc.difficulty],
                  }))}
                />
                <TrackColumn
                  label="2단계"
                  title="실전 플레이북"
                  items={playbooks.map((item) => ({
                    href: `/playbooks/${item.slug}`,
                    title: item.title,
                    summary: item.summary,
                    badges: [item.role, item.level],
                  }))}
                />
                <TrackColumn
                  label="3단계"
                  title="기능 단위 가이드"
                  items={guides.map((item) => ({
                    href: `/guides/${item.slug}`,
                    title: item.title,
                    summary: item.summary,
                    badges: [item.level, item.audience[0]],
                  }))}
                />
                <TrackColumn
                  label="4단계"
                  title="프로젝트 사례집"
                  items={casebooks.map((item) => ({
                    href: `/casebooks/${item.slug}`,
                    title: item.title,
                    summary: item.summary,
                    badges: [item.level, item.roles[0]],
                  }))}
                />
                <TrackColumn
                  label="5단계"
                  title="실습 훈련"
                  items={workouts.map((item) => ({
                    href: `/workouts/${item.slug}`,
                    title: item.title,
                    summary: item.problem,
                    badges: [item.level, item.role],
                  }))}
                />
              </CardContent>
            </Card>
          );
        })}
      </section>

      <section className="mt-8 rounded-[1.75rem] border border-border/70 bg-background/70 px-6 py-6">
        <div className="flex items-center gap-2">
          <Layers3 className="size-5 text-primary" />
          <h2 className="text-xl font-semibold tracking-tight">
            학습 트랙 읽는 법
          </h2>
        </div>
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          <InfoBlock
            title="용어부터 사례까지 이어서 보기"
            description="개념을 먼저 익히고, 플레이북과 가이드로 확장한 뒤 사례집과 실습으로 마무리하면 훨씬 빠르게 체화됩니다."
          />
          <InfoBlock
            title="내 역할에 맞는 경로부터 시작하기"
            description="지금 맡은 역할과 가장 가까운 트랙을 먼저 따라가면 필요한 표현을 빠르게 익힐 수 있습니다."
          />
          <InfoBlock
            title="프롬프트를 바로 복사해 실험하기"
            description="각 단계의 프롬프트를 AI IDE에 바로 넣어보면서 결과를 비교하면 학습 속도가 빨라집니다."
          />
        </div>
        <div className="mt-6">
          <Link
            href="/guides"
            className="inline-flex items-center gap-2 text-sm font-medium text-primary"
          >
            기능 가이드 전체 보기
            <ArrowRight className="size-4" />
          </Link>
        </div>
      </section>
    </main>
  );
}

type TrackColumnProps = {
  label: string;
  title: string;
  items: Array<{
    href: string;
    title: string;
    summary: string;
    badges: string[];
  }>;
};

function TrackColumn({ label, title, items }: TrackColumnProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Badge variant="outline">{label}</Badge>
        <p className="font-medium">{title}</p>
      </div>
      <div className="space-y-3">
        {items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="block rounded-2xl border border-border/70 bg-background/70 px-4 py-4 transition-colors hover:bg-muted/60"
          >
            <div className="flex flex-wrap items-center gap-2">
              {item.badges.map((badge) => (
                <Badge key={badge} variant="outline">
                  {badge}
                </Badge>
              ))}
            </div>
            <p className="mt-3 font-semibold">{item.title}</p>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              {item.summary}
            </p>
          </Link>
        ))}
      </div>
    </div>
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
