import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Compass } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getCasebookBySlug } from "@/lib/casebooks";
import { getFeatureGuideBySlug } from "@/lib/guides";
import { getScenarioHubItems } from "@/lib/hubs";
import { getDocsBySlugs } from "@/lib/mdx";
import { getWorkoutBySlug } from "@/lib/workouts";

export const metadata: Metadata = {
  title: "상황 허브",
  description:
    "회원가입, 검색, 관리자 화면처럼 실제 기능 상황별로 무엇부터 읽어야 하는지 안내하는 탐색 허브입니다.",
};

export default function ScenariosPage() {
  const scenarios = getScenarioHubItems();

  return (
    <main className="mx-auto w-full max-w-6xl px-6 py-12">
      <section className="rounded-[2rem] border border-border/70 bg-card/70 px-6 py-8 shadow-sm backdrop-blur sm:px-10 sm:py-10">
        <div className="space-y-4">
          <Badge variant="secondary" className="w-fit">
            상황 허브
          </Badge>
          <div className="space-y-3">
            <h1 className="flex items-center gap-3 text-3xl font-semibold tracking-tight sm:text-4xl">
              <Compass className="size-7 text-primary" />
              이럴 때 무엇부터 읽을까
            </h1>
            <p className="max-w-3xl text-base leading-8 text-muted-foreground">
              회원가입, 검색, 업로드처럼 실제 기능 상황을 기준으로 문서, 가이드,
              사례집, 실습을 한 번에 안내하는 진입 허브입니다.
            </p>
          </div>
        </div>
      </section>

      <section className="mt-8 grid gap-5 lg:grid-cols-2">
        {scenarios.map((scenario) => {
          const docs = getDocsBySlugs(scenario.docs);
          const guides = scenario.guides
            .map((slug) => getFeatureGuideBySlug(slug))
            .filter((item) => item !== null);
          const casebooks = scenario.casebooks
            .map((slug) => getCasebookBySlug(slug))
            .filter((item) => item !== null);
          const workouts = scenario.workouts
            .map((slug) => getWorkoutBySlug(slug))
            .filter((item) => item !== null);

          return (
            <Card
              key={scenario.slug}
              id={scenario.slug}
              className="rounded-[1.75rem] border border-border/70 bg-card/80"
            >
              <CardHeader className="space-y-3">
                <CardTitle className="text-2xl">{scenario.title}</CardTitle>
                <p className="text-sm leading-7 text-muted-foreground">
                  {scenario.summary}
                </p>
              </CardHeader>
              <CardContent className="space-y-4">
                <ScenarioList
                  title="추천 문서"
                  items={docs.map((doc) => ({
                    href: doc.href,
                    title: doc.title,
                  }))}
                />
                <ScenarioList
                  title="추천 가이드"
                  items={guides.map((guide) => ({
                    href: `/guides/${guide.slug}`,
                    title: guide.title,
                  }))}
                />
                <ScenarioList
                  title="추천 사례집"
                  items={casebooks.map((casebook) => ({
                    href: `/casebooks/${casebook.slug}`,
                    title: casebook.title,
                  }))}
                />
                <ScenarioList
                  title="추천 실습"
                  items={workouts.map((workout) => ({
                    href: `/workouts/${workout.slug}`,
                    title: workout.title,
                  }))}
                />
              </CardContent>
            </Card>
          );
        })}
      </section>
    </main>
  );
}

function ScenarioList({
  title,
  items,
}: {
  title: string;
  items: Array<{ href: string; title: string }>;
}) {
  return (
    <div className="space-y-2">
      <p className="text-sm font-medium">{title}</p>
      <div className="space-y-2">
        {items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="flex items-center justify-between rounded-2xl border border-border/70 bg-background/70 px-4 py-3 text-sm transition-colors hover:bg-muted/60"
          >
            <span>{item.title}</span>
            <ArrowRight className="size-4 text-primary" />
          </Link>
        ))}
      </div>
    </div>
  );
}
