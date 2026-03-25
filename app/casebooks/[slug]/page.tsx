import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { notFound } from "next/navigation";

import { Callout } from "@/components/mdx/Callout";
import { PromptCard } from "@/components/mdx/PromptCard";
import { PromptCodeBlock } from "@/components/mdx/PromptCodeBlock";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  getCasebookBySlug,
  getCasebooks,
  getRelatedCasebooks,
} from "@/lib/casebooks";
import { getFeatureGuideBySlug } from "@/lib/guides";
import { getScenarioHubItems } from "@/lib/hubs";
import { getDocsBySlugs } from "@/lib/mdx";
import { getPlaybookBySlug } from "@/lib/playbooks";
import { getWorkoutBySlug } from "@/lib/workouts";

type CasebookPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateStaticParams() {
  return getCasebooks().map((casebook) => ({
    slug: casebook.slug,
  }));
}

export async function generateMetadata({
  params,
}: CasebookPageProps): Promise<Metadata> {
  const { slug } = await params;
  const casebook = getCasebookBySlug(slug);

  if (!casebook) {
    return {
      title: "사례집을 찾을 수 없습니다",
    };
  }

  return {
    title: casebook.title,
    description: casebook.summary,
    alternates: {
      canonical: `/casebooks/${casebook.slug}`,
    },
  };
}

export default async function CasebookPage({ params }: CasebookPageProps) {
  const { slug } = await params;
  const casebook = getCasebookBySlug(slug);

  if (!casebook) {
    notFound();
  }

  const docs = getDocsBySlugs(casebook.docs);
  const playbooks = casebook.playbooks
    .map((item) => getPlaybookBySlug(item))
    .filter((item) => item !== null);
  const guides = casebook.guides
    .map((item) => getFeatureGuideBySlug(item))
    .filter((item) => item !== null);
  const workouts = (casebook.workouts ?? [])
    .map((item) => getWorkoutBySlug(item))
    .filter((item) => item !== null);
  const scenarios = getScenarioHubItems().filter((item) =>
    (casebook.relatedScenarios ?? []).includes(item.slug),
  );
  const nextCasebooks = getRelatedCasebooks(casebook.slug);

  return (
    <main className="mx-auto w-full max-w-5xl px-6 py-12">
      <article className="rounded-[2rem] border border-border/70 bg-card/70 px-6 py-8 shadow-sm backdrop-blur sm:px-10 sm:py-10">
        <header className="space-y-5 border-b border-border/70 pb-8">
          <div className="flex flex-wrap gap-2">
            <Badge variant="secondary">{casebook.level}</Badge>
            {casebook.roles.map((role) => (
              <Badge key={role} variant="outline">
                {role}
              </Badge>
            ))}
            <Badge variant="outline">프로젝트 사례집</Badge>
          </div>
          <div className="space-y-3">
            <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              {casebook.title}
            </h1>
            <p className="max-w-3xl text-base leading-8 text-muted-foreground">
              {casebook.summary}
            </p>
          </div>
        </header>

        <section className="mt-10 space-y-8">
          <div className="space-y-3">
            <h2 className="text-2xl font-semibold tracking-tight">상황</h2>
            <p className="text-base leading-8 text-muted-foreground">
              {casebook.situation}
            </p>
          </div>

          <Callout type="tip" title="최종 목표">
            {casebook.goal}
          </Callout>

          <div className="space-y-4">
            <h2 className="text-2xl font-semibold tracking-tight">
              이번 사례에서 완성할 것
            </h2>
            <div className="grid gap-3">
              {casebook.deliverables.map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-border/70 bg-background/70 px-4 py-4 text-sm leading-7 text-muted-foreground"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-semibold tracking-tight">
              단계별 구현 흐름
            </h2>
            <div className="grid gap-3">
              {casebook.stages.map((stage, index) => (
                <div
                  key={stage.title}
                  className="rounded-2xl border border-border/70 bg-background/70 px-4 py-4"
                >
                  <div className="flex items-start gap-3">
                    <Badge variant="outline">
                      {String(index + 1).padStart(2, "0")}
                    </Badge>
                    <div>
                      <p className="font-medium">{stage.title}</p>
                      <p className="mt-2 text-sm leading-7 text-muted-foreground">
                        {stage.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <PromptCard
            badPrompt={casebook.commonMistake}
            goodPrompt={casebook.improvedRequest}
          />

          <div className="space-y-4">
            <h2 className="text-2xl font-semibold tracking-tight">
              빠른 프롬프트
            </h2>
            <PromptCodeBlock>{casebook.quickPrompt}</PromptCodeBlock>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-semibold tracking-tight">
              고급 프롬프트
            </h2>
            <PromptCodeBlock>{casebook.detailedPrompt}</PromptCodeBlock>
          </div>

          {casebook.roleNotes?.length ? (
            <Callout type="warning" title="역할별 주의점">
              {casebook.roleNotes.join(" ")}
            </Callout>
          ) : null}

          {casebook.operationsNotes?.length ? (
            <Callout type="info" title="운영 포인트">
              {casebook.operationsNotes.join(" ")}
            </Callout>
          ) : null}

          <RelatedSection title="같이 봐야 하는 문서">
            {docs.map((doc) => (
              <RelatedCard
                key={doc.slug}
                href={doc.href}
                title={doc.title}
                summary={doc.description}
                badges={[doc.priority, doc.difficulty]}
              />
            ))}
          </RelatedSection>

          <RelatedSection title="관련 플레이북">
            {playbooks.map((playbook) => (
              <RelatedCard
                key={playbook.slug}
                href={`/playbooks/${playbook.slug}`}
                title={playbook.title}
                summary={playbook.summary}
                badges={[playbook.role, playbook.level]}
              />
            ))}
          </RelatedSection>

          <RelatedSection title="관련 기능 가이드">
            {guides.map((guide) => (
              <RelatedCard
                key={guide.slug}
                href={`/guides/${guide.slug}`}
                title={guide.title}
                summary={guide.summary}
                badges={[guide.level, guide.audience[0]]}
              />
            ))}
          </RelatedSection>

          {workouts.length > 0 ? (
            <RelatedSection title="실습으로 이어지기">
              {workouts.map((workout) => (
                <RelatedCard
                  key={workout.slug}
                  href={`/workouts/${workout.slug}`}
                  title={workout.title}
                  summary={workout.problem}
                  badges={[workout.level, workout.role]}
                />
              ))}
            </RelatedSection>
          ) : null}

          {scenarios.length > 0 ? (
            <RelatedSection title="관련 상황 허브">
              {scenarios.map((scenario) => (
                <RelatedCard
                  key={scenario.slug}
                  href={`/scenarios#${scenario.slug}`}
                  title={scenario.title}
                  summary={scenario.summary}
                  badges={["상황 허브"]}
                />
              ))}
            </RelatedSection>
          ) : null}

          <div className="space-y-4">
            <h2 className="text-2xl font-semibold tracking-tight">
              수용 기준 체크리스트
            </h2>
            <div className="grid gap-3">
              {casebook.acceptanceChecklist.map((item) => (
                <div
                  key={item}
                  className="flex items-start gap-3 rounded-2xl border border-border/70 bg-background/70 px-4 py-4"
                >
                  <CheckCircle2 className="mt-0.5 size-5 text-primary" />
                  <p className="text-sm leading-7 text-muted-foreground">{item}</p>
                </div>
              ))}
            </div>
          </div>

          {nextCasebooks.length > 0 ? (
            <RelatedSection title="다음 사례 추천">
              {nextCasebooks.map((item) => (
                <RelatedCard
                  key={item.slug}
                  href={`/casebooks/${item.slug}`}
                  title={item.title}
                  summary={item.summary}
                  badges={[item.level, item.roles[0]]}
                />
              ))}
            </RelatedSection>
          ) : null}
        </section>

        <footer className="mt-12 border-t border-border/70 pt-8">
          <Link
            href="/casebooks"
            className="inline-flex items-center gap-2 text-sm font-medium text-primary"
          >
            사례집 목록으로 돌아가기
            <ArrowRight className="size-4" />
          </Link>
        </footer>
      </article>
    </main>
  );
}

function RelatedSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold tracking-tight">{title}</h2>
      <div className="grid gap-4 md:grid-cols-2">{children}</div>
    </div>
  );
}

function RelatedCard({
  href,
  title,
  summary,
  badges,
}: {
  href: string;
  title: string;
  summary: string;
  badges: string[];
}) {
  return (
    <Link href={href}>
      <Card className="rounded-[1.5rem] border border-border/70 bg-background/70 transition-colors hover:bg-muted/60">
        <CardHeader className="space-y-3">
          <div className="flex flex-wrap gap-2">
            {badges.map((badge) => (
              <Badge key={badge} variant="outline">
                {badge}
              </Badge>
            ))}
          </div>
          <CardTitle className="text-xl">{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm leading-7 text-muted-foreground">{summary}</p>
        </CardContent>
      </Card>
    </Link>
  );
}
