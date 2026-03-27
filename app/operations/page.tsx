import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ClipboardCheck, ShieldCheck } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getOperationGuides } from "@/lib/operations";

export const metadata: Metadata = {
  title: "운영 가이드",
  description:
    "코드베이스 읽기, 작업 분해, 검증, 수정 요청, 리뷰처럼 AI IDE를 실제로 운영하는 방법을 다루는 실전 가이드입니다.",
};

export default function OperationsPage() {
  const guides = getOperationGuides();

  return (
    <main className="mx-auto w-full max-w-6xl px-6 py-12">
      <section className="rounded-[2rem] border border-border/70 bg-card/70 px-6 py-8 shadow-sm backdrop-blur sm:px-10 sm:py-10">
        <div className="space-y-4">
          <Badge variant="secondary" className="w-fit">
            운영 가이드
          </Badge>
          <div className="space-y-3">
            <h1 className="flex items-center gap-3 text-3xl font-semibold tracking-tight sm:text-4xl">
              <ShieldCheck className="size-7 text-primary" />
              AI IDE 실전 운영 가이드
            </h1>
            <p className="max-w-3xl text-base leading-8 text-muted-foreground">
              좋은 첫 요청에서 끝나지 않고, 코드를 먼저 읽게 하고, 작업을 쪼개고,
              결과를 검증하고, 다시 수정시키고, 리뷰하는 방법까지 다루는 운영
              중심 섹션입니다.
            </p>
          </div>
        </div>
      </section>

      <section className="mt-8 rounded-[1.75rem] border border-border/70 bg-background/70 px-6 py-6">
        <div className="flex items-center gap-2">
          <ClipboardCheck className="size-5 text-primary" />
          <h2 className="text-xl font-semibold tracking-tight">
            이 섹션이 메우는 빈칸
          </h2>
        </div>
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          <InfoBlock
            title="무엇부터 읽게 할까"
            description="바로 구현시키기 전에 코드베이스를 어떻게 읽게 해야 하는지 다룹니다."
          />
          <InfoBlock
            title="어떻게 통제할까"
            description="수정 범위를 제한하고, 잘못된 결과를 다시 고치는 지시법을 다룹니다."
          />
          <InfoBlock
            title="어떻게 검증할까"
            description="테스트, 상태 점검, 리뷰를 통해 결과 품질을 확인하는 방법을 다룹니다."
          />
        </div>
      </section>

      <section className="mt-8 grid gap-5 lg:grid-cols-2">
        {guides.map((guide) => (
          <Link key={guide.slug} href={`/operations/${guide.slug}`} className="block h-full">
            <Card className="flex h-full flex-col rounded-[1.75rem] border border-border/70 bg-card/80 transition-transform duration-200 hover:-translate-y-1 hover:shadow-lg">
              <CardHeader className="flex-1 space-y-4">
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">{guide.level}</Badge>
                  <Badge variant="outline">운영 가이드</Badge>
                </div>
                <CardTitle className="line-clamp-2 text-2xl">{guide.title}</CardTitle>
                <p className="line-clamp-4 text-sm leading-7 text-muted-foreground">
                  {guide.summary}
                </p>
              </CardHeader>
              <CardContent className="mt-auto space-y-4 border-t border-border/70 pt-4">
                <div>
                  <p className="text-sm font-medium">운영 목표</p>
                  <p className="mt-1 line-clamp-3 text-sm leading-7 text-muted-foreground">
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

      <section className="mt-8 rounded-[1.75rem] border border-dashed border-border/70 bg-background/60 px-6 py-6">
        <h2 className="text-xl font-semibold tracking-tight">읽는 순서</h2>
        <p className="mt-3 max-w-4xl text-sm leading-7 text-muted-foreground">
          처음에는 `코드베이스 읽기`, `작업 분해`, `검증 루프` 세 가지만 먼저
          읽어도 충분합니다. 실제 작업에서 AI가 빗나가기 시작하면 그때
          `수정 요청`, `리뷰`, `실패 통제` 가이드로 넘어가면 됩니다.
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
