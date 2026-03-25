import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookCopy, Sparkles } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getCasebooks } from "@/lib/casebooks";

export const metadata: Metadata = {
  title: "프로젝트 사례집",
  description:
    "회원가입, 로그인, 검색, 결제처럼 실제 기능을 AI IDE에 끝까지 시키는 방법을 정리한 완성형 사례집입니다.",
};

export default function CasebooksPage() {
  const casebooks = getCasebooks();
  const starterByRole = [
    ["기획자", casebooks.find((item) => item.slug === "signup-project")],
    ["디자이너", casebooks.find((item) => item.slug === "file-upload-project")],
    ["주니어 개발자", casebooks.find((item) => item.slug === "auth-project")],
  ] as const;

  return (
    <main className="mx-auto w-full max-w-6xl px-6 py-12">
      <section className="rounded-[2rem] border border-border/70 bg-card/70 px-6 py-8 shadow-sm backdrop-blur sm:px-10 sm:py-10">
        <div className="space-y-4">
          <Badge variant="secondary" className="w-fit">
            프로젝트 사례집
          </Badge>
          <div className="space-y-3">
            <h1 className="flex items-center gap-3 text-3xl font-semibold tracking-tight sm:text-4xl">
              <BookCopy className="size-7 text-primary" />
              AI IDE 완성형 실전 사례집
            </h1>
            <p className="max-w-3xl text-base leading-8 text-muted-foreground">
              문서와 가이드에서 배운 내용을 실제 기능 단위로 연결해, 화면·상태·API·프롬프트를 한 번에 요청하는 방법을 익히는 섹션입니다.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link href="/tracks">
              <Button>학습 트랙과 함께 보기</Button>
            </Link>
            <Link href="/workouts">
              <Button variant="outline">실습으로 이어가기</Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="mt-8 grid gap-5 lg:grid-cols-3">
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
              <CardContent className="space-y-3">
                <p className="text-sm text-muted-foreground">
                  대표 결과물: {casebook.deliverables[0]}
                </p>
                <div className="inline-flex items-center gap-2 text-sm font-medium text-primary">
                  사례집 보기
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
            역할별 추천 시작 사례
          </h2>
        </div>
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          {starterByRole.map(([role, casebook]) =>
            casebook ? (
              <Link
                key={role}
                href={`/casebooks/${casebook.slug}`}
                className="rounded-2xl border border-border/70 bg-card/80 p-5 transition-colors hover:bg-muted/60"
              >
                <Badge variant="secondary">{role}</Badge>
                <p className="mt-3 font-semibold">{casebook.title}</p>
                <p className="mt-2 text-sm leading-7 text-muted-foreground">
                  {casebook.goal}
                </p>
              </Link>
            ) : null,
          )}
        </div>
      </section>

      <section className="mt-8 rounded-[1.75rem] border border-border/70 bg-background/70 px-6 py-6">
        <h2 className="text-xl font-semibold tracking-tight">사례집 읽는 법</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          <InfoBlock
            title="상황부터 읽기"
            description="왜 이 기능을 만드는지 먼저 읽어야 필요한 화면과 상태를 놓치지 않습니다."
          />
          <InfoBlock
            title="빠른 프롬프트와 고급 프롬프트 비교"
            description="짧은 요청과 긴 요청의 차이를 직접 비교하면 누락되는 조건을 빠르게 익힐 수 있습니다."
          />
          <InfoBlock
            title="실습으로 이어가기"
            description="사례집을 읽은 뒤 실습까지 이어가면 같은 기능을 더 정확한 문장으로 요청할 수 있습니다."
          />
        </div>
      </section>

      <section className="mt-8 rounded-[1.75rem] border border-dashed border-border/70 bg-background/60 px-6 py-6">
        <h2 className="text-xl font-semibold tracking-tight">사례집을 읽을 때의 기준</h2>
        <p className="mt-3 max-w-4xl text-sm leading-7 text-muted-foreground">
          사례집은 예쁜 화면 예시가 아니라, 실제 기능을 처음부터 끝까지 어떻게
          시킬지 배우는 섹션입니다. 따라서 화면보다 먼저 `상황`, `완성할 것`,
          `수용 기준`을 읽고, 마지막에 프롬프트를 보는 순서가 가장 좋습니다.
        </p>
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
