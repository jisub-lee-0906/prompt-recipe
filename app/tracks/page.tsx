import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookMarked, Layers3, Sparkles } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getFeatureGuideBySlug } from "@/lib/guides";
import { getDocsBySlugs } from "@/lib/mdx";
import { getPlaybookBySlug } from "@/lib/playbooks";
import { getLearningTracks } from "@/lib/tracks";

export const metadata: Metadata = {
  title: "학습 트랙",
  description:
    "기획자, 디자이너, 주니어 개발자가 문서, 플레이북, 기능 가이드를 어떤 순서로 읽으면 좋은지 정리한 학습 허브입니다.",
};

export default function TracksPage() {
  const tracks = getLearningTracks();

  return (
    <main className="mx-auto w-full max-w-6xl px-6 py-12">
      <section className="rounded-[2rem] border border-border/70 bg-card/70 px-6 py-8 shadow-sm backdrop-blur sm:px-10 sm:py-10">
        <div className="space-y-4">
          <Badge variant="secondary" className="w-fit">
            Learning Tracks
          </Badge>
          <div className="space-y-3">
            <h1 className="flex items-center gap-3 text-3xl font-semibold tracking-tight sm:text-4xl">
              <BookMarked className="size-7 text-primary" />
              역할별 학습 트랙 허브
            </h1>
            <p className="max-w-3xl text-base leading-8 text-muted-foreground">
              문서, 플레이북, 기능 가이드를 따로 보지 않고 역할별 순서로 이어서
              학습할 수 있도록 정리한 허브입니다.
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
                    문서 {docs.length} · 플레이북 {playbooks.length} · 가이드 {guides.length}
                  </Badge>
                </div>
                <p className="max-w-3xl text-sm leading-7 text-muted-foreground">
                  {track.summary}
                </p>
              </CardHeader>
              <CardContent className="grid gap-5 lg:grid-cols-3">
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">1단계</Badge>
                    <p className="font-medium">핵심 용어 문서</p>
                  </div>
                  <div className="space-y-3">
                    {docs.map((doc) => (
                      <Link
                        key={doc.slug}
                        href={doc.href}
                        className="block rounded-2xl border border-border/70 bg-background/70 px-4 py-4 transition-colors hover:bg-muted/60"
                      >
                        <div className="flex items-center gap-2">
                          <Badge variant="secondary">{doc.priority}</Badge>
                          <Badge variant="outline">{doc.difficulty}</Badge>
                        </div>
                        <p className="mt-3 font-semibold">{doc.title}</p>
                        <p className="mt-2 text-sm leading-6 text-muted-foreground">
                          {doc.description}
                        </p>
                      </Link>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">2단계</Badge>
                    <p className="font-medium">실전 플레이북</p>
                  </div>
                  <div className="space-y-3">
                    {playbooks.map((playbook) => (
                      <Link
                        key={playbook.slug}
                        href={`/playbooks/${playbook.slug}`}
                        className="block rounded-2xl border border-border/70 bg-background/70 px-4 py-4 transition-colors hover:bg-muted/60"
                      >
                        <div className="flex items-center gap-2">
                          <Badge variant="secondary">{playbook.role}</Badge>
                          <Badge variant="outline">{playbook.level}</Badge>
                        </div>
                        <p className="mt-3 font-semibold">{playbook.title}</p>
                        <p className="mt-2 text-sm leading-6 text-muted-foreground">
                          {playbook.summary}
                        </p>
                      </Link>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">3단계</Badge>
                    <p className="font-medium">기능 단위 가이드</p>
                  </div>
                  <div className="space-y-3">
                    {guides.map((guide) => (
                      <Link
                        key={guide.slug}
                        href={`/guides/${guide.slug}`}
                        className="block rounded-2xl border border-border/70 bg-background/70 px-4 py-4 transition-colors hover:bg-muted/60"
                      >
                        <div className="flex items-center gap-2">
                          <Badge variant="secondary">{guide.level}</Badge>
                          <Badge variant="outline">{guide.audience[0]}</Badge>
                        </div>
                        <p className="mt-3 font-semibold">{guide.title}</p>
                        <p className="mt-2 text-sm leading-6 text-muted-foreground">
                          {guide.summary}
                        </p>
                      </Link>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </section>

      <section className="mt-8 rounded-[1.75rem] border border-border/70 bg-background/70 px-6 py-6">
        <div className="flex items-center gap-2">
          <Layers3 className="size-5 text-primary" />
          <h2 className="text-xl font-semibold tracking-tight">
            학습 트랙 활용 팁
          </h2>
        </div>
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          <div>
            <p className="font-medium">용어 → 플레이북 → 가이드 순서 유지</p>
            <p className="mt-2 text-sm leading-7 text-muted-foreground">
              개념을 먼저 이해한 뒤 실제 요청과 기능 묶음으로 확장하는 흐름이 가장
              안정적입니다.
            </p>
          </div>
          <div>
            <p className="font-medium">같은 역할 트랙 먼저 따라가기</p>
            <p className="mt-2 text-sm leading-7 text-muted-foreground">
              지금 맡은 역할에 맞는 트랙을 먼저 따라가면 필요한 표현을 더 빨리
              익힐 수 있습니다.
            </p>
          </div>
          <div>
            <p className="font-medium">실제 요청에 바로 복붙해서 연습하기</p>
            <p className="mt-2 text-sm leading-7 text-muted-foreground">
              각 단계의 문서와 가이드에서 프롬프트를 바로 복사해 AI IDE와 함께
              다듬어보는 것이 가장 효과적입니다.
            </p>
          </div>
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
