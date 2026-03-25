import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { notFound } from "next/navigation";

import { Callout } from "@/components/mdx/Callout";
import { PromptCard } from "@/components/mdx/PromptCard";
import { PromptCodeBlock } from "@/components/mdx/PromptCodeBlock";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getCasebookBySlug } from "@/lib/casebooks";
import { getFeatureGuideBySlug } from "@/lib/guides";
import { getDocsBySlugs } from "@/lib/mdx";
import { getPlaybookBySlug } from "@/lib/playbooks";
import { getRelatedWorkouts, getWorkoutBySlug, getWorkouts } from "@/lib/workouts";

type WorkoutPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateStaticParams() {
  return getWorkouts().map((workout) => ({
    slug: workout.slug,
  }));
}

export async function generateMetadata({
  params,
}: WorkoutPageProps): Promise<Metadata> {
  const { slug } = await params;
  const workout = getWorkoutBySlug(slug);

  if (!workout) {
    return {
      title: "실습을 찾을 수 없습니다",
    };
  }

  return {
    title: workout.title,
    description: workout.problem,
    alternates: {
      canonical: `/workouts/${workout.slug}`,
    },
  };
}

export default async function WorkoutPage({ params }: WorkoutPageProps) {
  const { slug } = await params;
  const workout = getWorkoutBySlug(slug);

  if (!workout) {
    notFound();
  }

  const docs = getDocsBySlugs(workout.docs);
  const playbooks = workout.playbooks
    .map((playbookSlug) => getPlaybookBySlug(playbookSlug))
    .filter((item) => item !== null);
  const guides = workout.guides
    .map((guideSlug) => getFeatureGuideBySlug(guideSlug))
    .filter((item) => item !== null);
  const casebooks = workout.casebooks
    .map((casebookSlug) => getCasebookBySlug(casebookSlug))
    .filter((item) => item !== null);
  const nextWorkouts = getRelatedWorkouts(workout.slug);

  return (
    <main className="mx-auto w-full max-w-5xl px-6 py-12">
      <article className="rounded-[2rem] border border-border/70 bg-card/70 px-6 py-8 shadow-sm backdrop-blur sm:px-10 sm:py-10">
        <header className="space-y-5 border-b border-border/70 pb-8">
          <div className="flex flex-wrap gap-2">
            <Badge variant="secondary">{workout.role}</Badge>
            <Badge variant="outline">{workout.level}</Badge>
            <Badge variant="outline">실습 훈련</Badge>
          </div>
          <div className="space-y-3">
            <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              {workout.title}
            </h1>
            <p className="max-w-3xl text-base leading-8 text-muted-foreground">
              {workout.problem}
            </p>
          </div>
        </header>

        <section className="mt-10 space-y-8">
          <div className="space-y-3">
            <h2 className="text-2xl font-semibold tracking-tight">문제 상황</h2>
            <p className="text-base leading-8 text-muted-foreground">
              {workout.problem}
            </p>
          </div>

          <PromptCard
            badPrompt={workout.badPrompt}
            goodPrompt={workout.goodPrompt}
          />

          <Callout type="warning" title="왜 문제가 되는가">
            {workout.targetOutcome}
          </Callout>

          <div className="space-y-4">
            <h2 className="text-2xl font-semibold tracking-tight">좋은 요청</h2>
            <PromptCodeBlock>{workout.goodPrompt}</PromptCodeBlock>
          </div>

          <Callout type="tip" title="점검 체크포인트">
            요청문에 필드, 상태, 예외 상황, 다음 행동이 드러나는지 확인하세요.
          </Callout>

          <div className="space-y-4">
            <h2 className="text-2xl font-semibold tracking-tight">
              점검 체크포인트
            </h2>
            <div className="grid gap-3">
              {workout.checkpoints.map((item) => (
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

          <RelatedSection title="관련 문서">
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

          <RelatedSection title="관련 사례집">
            {casebooks.map((casebook) => (
              <RelatedCard
                key={casebook.slug}
                href={`/casebooks/${casebook.slug}`}
                title={casebook.title}
                summary={casebook.summary}
                badges={[casebook.level, casebook.roles[0]]}
              />
            ))}
          </RelatedSection>

          <RelatedSection title="다음 실습 추천">
            {nextWorkouts.map((nextWorkout) => (
              <RelatedCard
                key={nextWorkout.slug}
                href={`/workouts/${nextWorkout.slug}`}
                title={nextWorkout.title}
                summary={nextWorkout.problem}
                badges={[nextWorkout.level, nextWorkout.role]}
              />
            ))}
          </RelatedSection>
        </section>

        <footer className="mt-12 border-t border-border/70 pt-8">
          <Link
            href="/workouts"
            className="inline-flex items-center gap-2 text-sm font-medium text-primary"
          >
            실습 목록으로 돌아가기
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
