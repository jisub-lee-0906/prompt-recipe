import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Dumbbell, Sparkles } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getWorkouts } from "@/lib/workouts";

export const metadata: Metadata = {
  title: "실습 훈련",
  description:
    "나쁜 요청을 좋은 요청으로 바꾸고 AI IDE에 더 정확하게 지시하는 연습을 할 수 있는 실습 허브입니다.",
};

export default function WorkoutsPage() {
  const workouts = getWorkouts();
  const operationWorkouts = workouts.filter(
    (item) => (item.operations?.length ?? 0) > 0,
  );
  const starterByRole = [
    ["기획자", workouts.find((item) => item.slug === "signup-request-fix")],
    ["디자이너", workouts.find((item) => item.slug === "state-system-request")],
    [
      "주니어 개발자",
      workouts.find((item) => item.slug === "api-integration-request"),
    ],
  ] as const;

  return (
    <main className="mx-auto w-full max-w-6xl px-6 py-12">
      <section className="rounded-[2rem] border border-border/70 bg-card/70 px-6 py-8 shadow-sm backdrop-blur sm:px-10 sm:py-10">
        <div className="space-y-4">
          <Badge variant="secondary" className="w-fit">
            실습 훈련
          </Badge>
          <div className="space-y-3">
            <h1 className="flex items-center gap-3 text-3xl font-semibold tracking-tight sm:text-4xl">
              <Dumbbell className="size-7 text-primary" />
              AI IDE 요청 훈련실
            </h1>
            <p className="max-w-3xl text-base leading-8 text-muted-foreground">
              읽는 것에서 끝내지 않고 직접 요청 문장을 고쳐보는 실습 모음입니다.
              역할별로 자주 하는 실수를 교정하고 더 구체적인 프롬프트를 만드는
              훈련으로 구성했습니다.
            </p>
          </div>
        </div>
      </section>

      <section className="mt-8 grid gap-5 lg:grid-cols-2">
        {workouts.map((workout) => (
          <Link key={workout.slug} href={`/workouts/${workout.slug}`} className="block h-full">
            <Card className="flex h-full flex-col rounded-[1.75rem] border border-border/70 bg-card/80 transition-transform duration-200 hover:-translate-y-1 hover:shadow-lg">
              <CardHeader className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">{workout.role}</Badge>
                  <Badge variant="outline">{workout.level}</Badge>
                  <Badge variant="outline">실습</Badge>
                </div>
                <CardTitle className="text-2xl">{workout.title}</CardTitle>
                <p className="text-sm leading-7 text-muted-foreground">
                  {workout.problem}
                </p>
              </CardHeader>
              <CardContent className="mt-auto inline-flex items-center gap-2 text-sm font-medium text-primary">
                실습 시작하기
                <ArrowRight className="size-4" />
              </CardContent>
            </Card>
          </Link>
        ))}
      </section>

      <section className="mt-8 rounded-[1.75rem] border border-border/70 bg-background/70 px-6 py-6">
        <div className="flex items-center gap-2">
          <Sparkles className="size-5 text-primary" />
          <h2 className="text-xl font-semibold tracking-tight">
            역할별 추천 시작 실습
          </h2>
        </div>
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          {starterByRole.map(([role, workout]) =>
            workout ? (
              <Link
                key={role}
                href={`/workouts/${workout.slug}`}
                className="rounded-2xl border border-border/70 bg-card/80 p-5 transition-colors hover:bg-muted/60"
              >
                <Badge variant="secondary">{role}</Badge>
                <p className="mt-3 font-semibold">{workout.title}</p>
                <p className="mt-2 text-sm leading-7 text-muted-foreground">
                  {workout.targetOutcome}
                </p>
              </Link>
            ) : null,
          )}
        </div>
      </section>

      <section className="mt-8 rounded-[1.75rem] border border-border/70 bg-background/70 px-6 py-6">
        <div className="flex items-center gap-2">
          <Sparkles className="size-5 text-primary" />
          <h2 className="text-xl font-semibold tracking-tight">
            운영 가이드와 함께 보는 실습
          </h2>
        </div>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          {operationWorkouts.map((workout) => (
            <Link
              key={workout.slug}
              href={`/workouts/${workout.slug}`}
              className="rounded-2xl border border-border/70 bg-card/80 p-5 transition-colors hover:bg-muted/60"
            >
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary">{workout.role}</Badge>
                <Badge variant="outline">{workout.level}</Badge>
                <Badge variant="outline">운영형 실습</Badge>
              </div>
              <p className="mt-3 font-semibold">{workout.title}</p>
              <p className="mt-2 text-sm leading-7 text-muted-foreground">
                {workout.targetOutcome}
              </p>
            </Link>
          ))}
        </div>
      </section>

      <section className="mt-8 rounded-[1.75rem] border border-dashed border-border/70 bg-background/60 px-6 py-6">
        <h2 className="text-xl font-semibold tracking-tight">실습 점수 올리는 법</h2>
        <p className="mt-3 max-w-4xl text-sm leading-7 text-muted-foreground">
          좋은 답을 읽기 전에 먼저 내가 직접 요청문을 고쳐 쓰고, 무엇을 추가했는지
          메모하는 방식이 가장 효과적입니다. 필드, 상태, 예외, 다음 행동 네 가지 중
          몇 개를 스스로 찾아냈는지 기준으로 보면 실력이 더 빨리 늘어납니다.
        </p>
      </section>
    </main>
  );
}
