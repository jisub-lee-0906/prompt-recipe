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
import { getOperationGuideBySlug } from "@/lib/operations";
import { getPlaybookBySlug } from "@/lib/playbooks";
import {
  getRelatedWorkouts,
  getWorkoutBySlug,
  getWorkouts,
} from "@/lib/workouts";

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
  const operations = (workout.operations ?? [])
    .map((guideSlug) => getOperationGuideBySlug(guideSlug))
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

          <Callout type="warning" title="왜 이 문제가 생기는가">
            {workout.targetOutcome}
          </Callout>

          <div className="space-y-4">
            <h2 className="text-2xl font-semibold tracking-tight">
              좋은 요청 예시
            </h2>
            <PromptCodeBlock>{workout.goodPrompt}</PromptCodeBlock>
          </div>

          <Callout type="tip" title="실습할 때 확인할 점">
            요청문에 필드, 상태, 예외 상황, 다음 행동이 빠지지 않았는지 먼저
            점검하세요. 좋은 실습은 답을 외우는 것이 아니라 누락을 찾아내는
            감각을 만드는 데 목적이 있습니다.
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

          <div className="space-y-4">
            <h2 className="text-2xl font-semibold tracking-tight">
              숨은 누락 포인트
            </h2>
            <div className="grid gap-3">
              {getWorkoutBlindSpots(workout.slug).map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-dashed border-border/70 bg-background/60 px-4 py-4 text-sm leading-7 text-muted-foreground"
                >
                  {item}
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

          <RelatedSection title="관련 운영 가이드">
            {operations.map((operation) => (
              <RelatedCard
                key={operation.slug}
                href={`/operations/${operation.slug}`}
                title={operation.title}
                summary={operation.summary}
                badges={[operation.level, "운영"]}
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

function getWorkoutBlindSpots(slug: string) {
  switch (slug) {
    case "signup-request-fix":
      return [
        "입력 필드만 늘리는 것으로 끝내지 말고, 성공 뒤 어디로 이동하는지가 포함되어 있는지 확인하세요.",
        "실패 상태를 적더라도 서버 오류와 입력 오류를 같은 문구로 뭉개지 않았는지 점검하세요.",
      ];
    case "success-criteria-writing":
      return [
        "좋은 성공 기준은 ‘잘 된다’가 아니라, 사용자가 무엇을 보고 어떤 행동을 할 수 있는지로 써야 합니다.",
        "실패 복구가 빠진 성공 기준은 실제 서비스 품질을 충분히 설명하지 못합니다.",
      ];
    case "approval-flow-clarify":
      return [
        "승인과 반려를 같은 액션처럼 적으면 반려 사유 입력 규칙이 쉽게 빠집니다.",
        "처리 후 목록 갱신이 없으면 기능은 동작해도 운영 화면이 오래된 상태로 남을 수 있습니다.",
      ];
    case "api-requirements-spec":
      return [
        "검색 API처럼 보이는 기능도 실제로는 정렬, 필터, 오류 응답이 함께 있어야 화면과 연결됩니다.",
        "응답 구조를 적지 않으면 프론트는 성공 상태만 상상해서 구현하기 쉽습니다.",
      ];
    case "state-system-request":
      return [
        "정상 상태 외에 빈 상태, 로딩 상태, 오류 상태를 각각 다른 목적의 화면으로 보고 있는지 확인하세요.",
        "목록 단위와 아이템 단위 상태가 섞여 있지 않은지도 점검해야 합니다.",
      ];
    case "microcopy-improve":
      return [
        "문구 개선은 예쁜 문장 만들기가 아니라 사용자가 지금 무엇을 해야 하는지 분명히 하는 작업입니다.",
        "성공 문구와 실패 문구가 같은 톤으로만 되어 있으면 상태 차이가 잘 드러나지 않을 수 있습니다.",
      ];
    case "landing-hero-brief":
      return [
        "메시지보다 스타일을 먼저 요청하면 히어로가 장식 중심 결과로 끝나기 쉽습니다.",
        "메인 CTA와 보조 CTA를 나누지 않으면 첫 행동 유도가 약해질 수 있습니다.",
      ];
    case "upload-experience-upgrade":
      return [
        "업로드 전 안내와 업로드 후 미리보기를 같은 상태로 다루고 있지 않은지 확인하세요.",
        "실패 재시도를 넣더라도 파일 제한 조건을 같이 설명하지 않으면 사용자가 같은 실수를 반복할 수 있습니다.",
      ];
    case "api-integration-request":
      return [
        "로딩과 오류는 있어도 데이터 없음 상태가 빠지면 실제 화면 품질은 여전히 낮게 느껴집니다.",
        "느린 응답 조건을 넣지 않으면 성공 화면 중심 구현으로 돌아갈 수 있습니다.",
      ];
    case "auth-edge-state":
      return [
        "권한 부족과 세션 만료를 같은 상태처럼 쓰고 있지 않은지 점검하세요.",
        "각 예외 상태에서 사용자가 할 수 있는 다음 행동이 있는지도 반드시 확인해야 합니다.",
      ];
    case "search-performance-request":
      return [
        "디바운스만 넣고 캐시나 느린 응답 안내를 빼면 체감 성능은 여전히 약할 수 있습니다.",
        "검색 결과 없음과 느린 검색 중 상태를 서로 다른 경험으로 다루고 있는지 보세요.",
      ];
    case "form-submit-finish":
      return [
        "제출 성공과 실패를 적더라도 다음 행동 CTA가 없으면 흐름이 중간에서 멈출 수 있습니다.",
        "검증 메시지와 서버 실패 메시지를 같은 위치와 톤으로만 처리하고 있지 않은지 확인하세요.",
      ];
    default:
      return [
        "나쁜 요청을 고칠 때는 화면 요소를 더하는 것보다, 상태와 다음 행동을 먼저 보강하는지 점검하세요.",
      ];
  }
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
