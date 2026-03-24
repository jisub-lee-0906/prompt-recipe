import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpenText, Sparkles } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getPlaybooks } from "@/lib/playbooks";

export const metadata: Metadata = {
  title: "플레이북",
  description:
    "기획자, 디자이너, 주니어 개발자가 AI IDE에 기능을 실제로 시킬 때 참고할 수 있는 실전 시나리오 모음입니다.",
};

export default function PlaybooksPage() {
  const playbooks = getPlaybooks();

  return (
    <main className="mx-auto w-full max-w-6xl px-6 py-12">
      <section className="rounded-[2rem] border border-border/70 bg-card/70 px-6 py-8 shadow-sm backdrop-blur sm:px-10 sm:py-10">
        <div className="space-y-4">
          <Badge variant="secondary" className="w-fit">
            AI IDE Playbooks
          </Badge>
          <div className="space-y-3">
            <h1 className="flex items-center gap-3 text-3xl font-semibold tracking-tight sm:text-4xl">
              <BookOpenText className="size-7 text-primary" />
              역할별 AI IDE 협업 플레이북
            </h1>
            <p className="max-w-3xl text-base leading-8 text-muted-foreground">
              용어 문서를 넘어, 실제 기능을 어떻게 지시할지까지 다루는 실전형
              교과서 섹션입니다. 상황 설명, 빠른 프롬프트, 더 좋은 요청, 체크리스트를
              한 번에 볼 수 있습니다.
            </p>
          </div>
        </div>
      </section>

      <section className="mt-8 grid gap-5 lg:grid-cols-2">
        {playbooks.map((playbook) => (
          <Link key={playbook.slug} href={`/playbooks/${playbook.slug}`}>
            <Card className="rounded-[1.75rem] border border-border/70 bg-card/80 transition-transform duration-200 hover:-translate-y-1 hover:shadow-lg">
              <CardHeader className="space-y-4">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant="secondary">{playbook.role}</Badge>
                  <Badge variant="outline">{playbook.level}</Badge>
                  <Badge variant="outline">실전 시나리오</Badge>
                </div>
                <CardTitle className="text-2xl">{playbook.title}</CardTitle>
                <p className="text-sm leading-7 text-muted-foreground">
                  {playbook.summary}
                </p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm font-medium">기대 결과</p>
                  <p className="mt-1 text-sm leading-7 text-muted-foreground">
                    {playbook.outcome}
                  </p>
                </div>
                <div className="inline-flex items-center gap-2 text-sm font-medium text-primary">
                  자세히 보기
                  <ArrowRight className="size-4" />
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </section>

      <section className="mt-8 rounded-[1.75rem] border border-border/70 bg-background/70 px-6 py-6">
        <div className="flex items-center gap-2">
          <Sparkles className="size-5 text-primary" />
          <h2 className="text-xl font-semibold tracking-tight">
            플레이북을 읽는 순서
          </h2>
        </div>
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          <div>
            <p className="font-medium">1. 상황부터 읽기</p>
            <p className="mt-2 text-sm leading-7 text-muted-foreground">
              지금 내가 겪는 문제와 비슷한 시나리오인지 먼저 확인합니다.
            </p>
          </div>
          <div>
            <p className="font-medium">2. 빠른 프롬프트로 감 잡기</p>
            <p className="mt-2 text-sm leading-7 text-muted-foreground">
              최소 요청을 먼저 보고, 빠진 조건이 무엇인지 파악합니다.
            </p>
          </div>
          <div>
            <p className="font-medium">3. 체크리스트로 요청 완성</p>
            <p className="mt-2 text-sm leading-7 text-muted-foreground">
              마지막으로 체크리스트를 보면서 요청 누락을 줄입니다.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
