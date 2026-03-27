import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpenText, Sparkles } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getPlaybooks } from "@/lib/playbooks";

export const metadata: Metadata = {
  title: "플레이북",
  description:
    "AI IDE에 실제 기능을 어떤 순서와 표현으로 시켜야 하는지 보여주는 실전 플레이북입니다.",
};

export default function PlaybooksPage() {
  const playbooks = getPlaybooks();
  const starterPlaybooks = [
    playbooks.find((item) => item.slug === "planner-signup-page"),
    playbooks.find((item) => item.slug === "designer-state-system"),
    playbooks.find((item) => item.slug === "junior-api-integration"),
  ].filter((item) => item !== undefined);

  return (
    <main className="mx-auto w-full max-w-6xl px-6 py-12">
      <section className="rounded-[2rem] border border-border/70 bg-card/70 px-6 py-8 shadow-sm backdrop-blur sm:px-10 sm:py-10">
        <div className="space-y-4">
          <Badge variant="secondary" className="w-fit">
            플레이북
          </Badge>
          <div className="space-y-3">
            <h1 className="flex items-center gap-3 text-3xl font-semibold tracking-tight sm:text-4xl">
              <BookOpenText className="size-7 text-primary" />
              AI IDE 작업 플레이북
            </h1>
            <p className="max-w-3xl text-base leading-8 text-muted-foreground">
              용어를 아는 단계에서 멈추지 않고, 실제 기능을 어떤 순서와 표현으로
              요청해야 하는지 보여주는 실전 시나리오 모음입니다.
            </p>
          </div>
        </div>
      </section>

      <section className="mt-8 grid gap-5 lg:grid-cols-2">
        {playbooks.map((playbook) => (
          <Link key={playbook.slug} href={`/playbooks/${playbook.slug}`} className="block h-full">
            <Card className="flex h-full flex-col rounded-[1.75rem] border border-border/70 bg-card/80 transition-transform duration-200 hover:-translate-y-1 hover:shadow-lg">
              <CardHeader className="flex-1 space-y-4">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant="secondary">{playbook.level}</Badge>
                  <Badge variant="outline">실전 시나리오</Badge>
                </div>
                <CardTitle className="line-clamp-2 text-2xl">{playbook.title}</CardTitle>
                <p className="line-clamp-4 text-sm leading-7 text-muted-foreground">
                  {playbook.summary}
                </p>
              </CardHeader>
              <CardContent className="mt-auto space-y-4 border-t border-border/70 pt-4">
                <div>
                  <p className="text-sm font-medium">기대 결과</p>
                  <p className="mt-1 line-clamp-3 text-sm leading-7 text-muted-foreground">
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

      <section className="mt-8 grid gap-5 lg:grid-cols-3">
        {starterPlaybooks.map((playbook, index) => (
            <Card
              key={playbook.slug}
              className="flex h-full flex-col rounded-[1.75rem] border border-border/70 bg-card/80"
            >
              <CardHeader className="flex-1 space-y-3">
              <div className="flex items-center justify-between gap-3">
                <CardTitle className="text-xl">추천 시작 {String(index + 1).padStart(2, "0")}</CardTitle>
                <Badge variant="secondary">{playbook.level}</Badge>
              </div>
              <p className="text-sm leading-7 text-muted-foreground">
                {playbook.summary}
              </p>
            </CardHeader>
              <CardContent className="mt-auto space-y-3 border-t border-border/70 pt-4">
                <Link
                  href={`/playbooks/${playbook.slug}`}
                  className="flex min-h-32 flex-col rounded-2xl border border-border/70 bg-background/70 px-4 py-4 transition-colors hover:bg-muted/60"
                >
                <div className="flex items-center gap-2">
                  <Badge variant="outline">대표 예시</Badge>
                  <Badge variant="outline">{playbook.level}</Badge>
                </div>
                  <p className="mt-3 line-clamp-2 font-semibold">{playbook.title}</p>
                  <p className="mt-2 line-clamp-3 text-sm leading-6 text-muted-foreground">
                    {playbook.outcome}
                  </p>
                </Link>
            </CardContent>
          </Card>
        ))}
      </section>

      <section className="mt-8 rounded-[1.75rem] border border-border/70 bg-background/70 px-6 py-6">
        <div className="flex items-center gap-2">
          <Sparkles className="size-5 text-primary" />
          <h2 className="text-xl font-semibold tracking-tight">
            플레이북 읽는 순서
          </h2>
        </div>
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          <GuideTip
            title="가까운 상황부터 고르기"
            description="지금 만들거나 고치고 있는 기능과 가장 가까운 시나리오부터 시작하면 어떤 말을 먼저 붙여야 하는지 빠르게 익힐 수 있습니다."
          />
          <GuideTip
            title="짧은 요청과 긴 요청 비교"
            description="빠른 요청과 고급 요청을 나란히 보면서 상태, 예외 처리, 다음 행동 중 무엇이 추가되면 결과가 좋아지는지 확인하세요."
          />
          <GuideTip
            title="관련 문서와 함께 읽기"
            description="플레이북에서 연결된 문서와 가이드까지 보면 개념과 실전이 더 잘 연결됩니다."
          />
        </div>
      </section>

      <section className="mt-8 rounded-[1.75rem] border border-dashed border-border/70 bg-background/60 px-6 py-6">
        <h2 className="text-xl font-semibold tracking-tight">플레이북으로 연습하는 법</h2>
        <p className="mt-3 max-w-4xl text-sm leading-7 text-muted-foreground">
          먼저 `상황`을 읽고 내가 지금 실제로 무엇을 빠뜨리고 있는지 표시하세요.
          그 다음 `빠른 프롬프트`를 그대로 복사하기보다, 현재 프로젝트 맥락을 한 줄
          더 붙여보는 방식으로 실습하면 훨씬 빠르게 내 문장으로 바뀝니다.
        </p>
      </section>
    </main>
  );
}

function GuideTip({
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
