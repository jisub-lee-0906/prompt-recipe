import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Layers3, Workflow } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getFeatureGuides } from "@/lib/guides";

export const metadata: Metadata = {
  title: "기능 가이드",
  description:
    "로그인, 검색, 관리자, 업로드처럼 실제 기능을 화면, 상태, API 흐름으로 묶어 정리한 기능 가이드입니다.",
};

export default function GuidesPage() {
  const guides = getFeatureGuides();

  return (
    <main className="mx-auto w-full max-w-6xl px-6 py-12">
      <section className="rounded-[2rem] border border-border/70 bg-card/70 px-6 py-8 shadow-sm backdrop-blur sm:px-10 sm:py-10">
        <div className="space-y-4">
          <Badge variant="secondary" className="w-fit">
            기능 가이드
          </Badge>
          <div className="space-y-3">
            <h1 className="flex items-center gap-3 text-3xl font-semibold tracking-tight sm:text-4xl">
              <Layers3 className="size-7 text-primary" />
              기능 단위 AI IDE 가이드
            </h1>
            <p className="max-w-3xl text-base leading-8 text-muted-foreground">
              용어와 플레이북을 넘어, 실제 기능을 화면·상태·API 흐름으로 묶어서
              요청할 수 있게 정리한 교과서형 섹션입니다.
            </p>
          </div>
        </div>
      </section>

      <section className="mt-8 rounded-[1.75rem] border border-border/70 bg-background/70 px-6 py-6">
        <div className="flex items-center gap-2">
          <Workflow className="size-5 text-primary" />
          <h2 className="text-xl font-semibold tracking-tight">
            기능 가이드 읽는 법
          </h2>
        </div>
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          <GuideTip
            title="기능 목표 확인"
            description="이 가이드가 화면 하나를 다루는지, 상태와 API까지 포함한 기능 묶음을 다루는지 먼저 확인합니다."
          />
          <GuideTip
            title="화면과 상태 흐름 읽기"
            description="화면 구조, 상태 변화, API 연결이 어떤 순서로 이어지는지 읽으면서 어디까지 요청해야 완성형 기능이 되는지 확인합니다."
          />
          <GuideTip
            title="프롬프트로 바로 실험하기"
            description="가이드 안의 프롬프트를 AI IDE에 넣어보고 결과를 비교합니다."
          />
        </div>
      </section>

      <section className="mt-8 rounded-[1.75rem] border border-dashed border-border/70 bg-background/60 px-6 py-6">
        <h2 className="text-xl font-semibold tracking-tight">가이드를 읽을 때 놓치기 쉬운 것</h2>
        <p className="mt-3 max-w-4xl text-sm leading-7 text-muted-foreground">
          기능 가이드는 순서대로 읽는 것이 중요합니다. 뒤 단계의 상태나 모바일 조건만
          먼저 가져오면 요청이 다시 추상적으로 돌아가기 쉽습니다. 항상 “기능 목표 →
          상태 흐름 → 예외 처리 → 결과 이후 행동” 순서로 읽는 습관을 추천합니다.
        </p>
      </section>

      <section className="mt-8 grid gap-5 lg:grid-cols-2">
        {guides.map((guide) => (
          <Link key={guide.slug} href={`/guides/${guide.slug}`} className="block h-full">
            <Card className="flex h-full flex-col rounded-[1.75rem] border border-border/70 bg-card/80 transition-transform duration-200 hover:-translate-y-1 hover:shadow-lg">
              <CardHeader className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">{guide.level}</Badge>
                  <Badge variant="outline">기능 단위</Badge>
                </div>
                <CardTitle className="text-2xl">{guide.title}</CardTitle>
                <p className="text-sm leading-7 text-muted-foreground">
                  {guide.summary}
                </p>
              </CardHeader>
              <CardContent className="mt-auto space-y-4">
                <div>
                  <p className="text-sm font-medium">기능 목표</p>
                  <p className="mt-1 text-sm leading-7 text-muted-foreground">
                    {guide.goal}
                  </p>
                </div>
                <div className="inline-flex items-center gap-2 text-sm font-medium text-primary">
                  가이드 보기
                  <ArrowRight className="size-4" />
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
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
