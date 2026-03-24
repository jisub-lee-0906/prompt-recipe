import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Layers3, Workflow } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getFeatureGuides } from "@/lib/guides";

export const metadata: Metadata = {
  title: "기능 가이드",
  description:
    "로그인, 검색, 관리자, 결제 같은 기능을 화면, 상태, API, 프롬프트 묶음으로 정리한 실전 가이드입니다.",
};

export default function GuidesPage() {
  const guides = getFeatureGuides();

  return (
    <main className="mx-auto w-full max-w-6xl px-6 py-12">
      <section className="rounded-[2rem] border border-border/70 bg-card/70 px-6 py-8 shadow-sm backdrop-blur sm:px-10 sm:py-10">
        <div className="space-y-4">
          <Badge variant="secondary" className="w-fit">
            Feature Guides
          </Badge>
          <div className="space-y-3">
            <h1 className="flex items-center gap-3 text-3xl font-semibold tracking-tight sm:text-4xl">
              <Layers3 className="size-7 text-primary" />
              기능 단위 AI IDE 가이드
            </h1>
            <p className="max-w-3xl text-base leading-8 text-muted-foreground">
              용어 문서와 플레이북을 넘어, 실제 기능을 여러 문서와 상태 흐름으로
              묶어 보는 교과서형 섹션입니다.
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
          <div>
            <p className="font-medium">1. 기능 목표 확인</p>
            <p className="mt-2 text-sm leading-7 text-muted-foreground">
              이 가이드가 해결하려는 기능 범위를 먼저 확인합니다.
            </p>
          </div>
          <div>
            <p className="font-medium">2. 단계별 흐름 확인</p>
            <p className="mt-2 text-sm leading-7 text-muted-foreground">
              화면, 상태, API가 어떤 단계로 이어지는지 먼저 봅니다.
            </p>
          </div>
          <div>
            <p className="font-medium">3. 프롬프트와 체크리스트 적용</p>
            <p className="mt-2 text-sm leading-7 text-muted-foreground">
              빠른 요청과 고급 요청을 비교하면서 실제 지시문으로 바꿉니다.
            </p>
          </div>
        </div>
      </section>

      <section className="mt-8 grid gap-5 lg:grid-cols-2">
        {guides.map((guide) => (
          <Link key={guide.slug} href={`/guides/${guide.slug}`}>
            <Card className="rounded-[1.75rem] border border-border/70 bg-card/80 transition-transform duration-200 hover:-translate-y-1 hover:shadow-lg">
              <CardHeader className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">{guide.level}</Badge>
                  {guide.audience.map((role) => (
                    <Badge key={role} variant="outline">
                      {role}
                    </Badge>
                  ))}
                </div>
                <CardTitle className="text-2xl">{guide.title}</CardTitle>
                <p className="text-sm leading-7 text-muted-foreground">
                  {guide.summary}
                </p>
              </CardHeader>
              <CardContent className="space-y-4">
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
