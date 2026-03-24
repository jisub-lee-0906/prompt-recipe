import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpenText, Sparkles } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  getPlaybooks,
  getPlaybooksByRole,
  type PlaybookRole,
} from "@/lib/playbooks";

export const metadata: Metadata = {
  title: "플레이북",
  description:
    "기획자, 디자이너, 주니어 개발자가 AI IDE에 기능을 실제로 시킬 때 참고할 수 있는 실전 시나리오 모음입니다.",
};

const ROLE_ORDER: PlaybookRole[] = ["기획자", "디자이너", "주니어 개발자"];

const ROLE_DESCRIPTIONS: Record<PlaybookRole, string> = {
  기획자:
    "요구사항과 사용자 흐름을 구현 언어로 번역하는 패턴을 먼저 익히는 트랙입니다.",
  디자이너:
    "화면 구조, 상태 표현, 카피와 시각 위계를 AI IDE에 구체적으로 전달하는 트랙입니다.",
  "주니어 개발자":
    "데이터, 상태, API, 보호 로직처럼 구현 흐름을 안정적으로 요청하는 트랙입니다.",
};

export default function PlaybooksPage() {
  const playbooks = getPlaybooks();
  const roleSections = ROLE_ORDER.map((role) => ({
    role,
    description: ROLE_DESCRIPTIONS[role],
    items: getPlaybooksByRole(role),
  }));

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
              용어를 아는 것에서 끝나지 않고, 실제 기능을 어떤 순서와 표현으로
              시킬지까지 다루는 실전형 교과서 섹션입니다. 빠른 프롬프트,
              개선된 요청, 체크리스트를 한 흐름으로 볼 수 있습니다.
            </p>
          </div>
        </div>
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
            <p className="font-medium">1. 지금 상황과 가장 비슷한 항목 찾기</p>
            <p className="mt-2 text-sm leading-7 text-muted-foreground">
              역할과 기능을 기준으로 가장 가까운 시나리오를 먼저 고릅니다.
            </p>
          </div>
          <div>
            <p className="font-medium">2. 빠른 프롬프트로 기본 틀 잡기</p>
            <p className="mt-2 text-sm leading-7 text-muted-foreground">
              최소 요청 예시를 보고 빠져 있는 조건을 바로 파악합니다.
            </p>
          </div>
          <div>
            <p className="font-medium">3. 체크리스트로 실전 요청 완성하기</p>
            <p className="mt-2 text-sm leading-7 text-muted-foreground">
              마지막에 체크리스트를 보며 누락 조건을 보강합니다.
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

      <section className="mt-8 space-y-6">
        <div className="space-y-2">
          <h2 className="text-2xl font-semibold tracking-tight">
            역할별 시작 트랙
          </h2>
          <p className="max-w-3xl text-sm leading-7 text-muted-foreground">
            같은 역할 안에서도 입문에서 중급으로 넘어가는 순서를 따라 읽을 수
            있게 정리했습니다.
          </p>
        </div>

        <div className="grid gap-5 lg:grid-cols-3">
          {roleSections.map((section) => (
            <Card
              key={section.role}
              className="rounded-[1.75rem] border border-border/70 bg-card/80"
            >
              <CardHeader className="space-y-3">
                <div className="flex items-center justify-between gap-3">
                  <CardTitle className="text-xl">{section.role}</CardTitle>
                  <Badge variant="secondary">{section.items.length}개</Badge>
                </div>
                <p className="text-sm leading-7 text-muted-foreground">
                  {section.description}
                </p>
              </CardHeader>
              <CardContent className="space-y-3">
                {section.items.map((playbook, index) => (
                  <Link
                    key={playbook.slug}
                    href={`/playbooks/${playbook.slug}`}
                    className="block rounded-2xl border border-border/70 bg-background/70 px-4 py-4 transition-colors hover:bg-muted/60"
                  >
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">
                        {String(index + 1).padStart(2, "0")}
                      </Badge>
                      <Badge variant="outline">{playbook.level}</Badge>
                    </div>
                    <p className="mt-3 font-semibold">{playbook.title}</p>
                    <p className="mt-2 text-sm leading-6 text-muted-foreground">
                      {playbook.summary}
                    </p>
                  </Link>
                ))}
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </main>
  );
}
