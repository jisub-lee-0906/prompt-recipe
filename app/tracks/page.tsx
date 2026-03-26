import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookMarked, Layers3, Sparkles } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { getCasebookBySlug } from "@/lib/casebooks";
import { getFeatureGuideBySlug } from "@/lib/guides";
import { getDocsBySlugs } from "@/lib/mdx";
import { getPlaybookBySlug } from "@/lib/playbooks";
import { getLearningTracks } from "@/lib/tracks";
import { getWorkoutBySlug } from "@/lib/workouts";

export const metadata: Metadata = {
  title: "학습 트랙",
  description:
    "기획자, 디자이너, 주니어 개발자가 문서부터 사례집과 실습까지 어떤 순서로 읽으면 좋은지 정리한 학습 허브입니다.",
};

export default function TracksPage() {
  const tracks = getLearningTracks();
  const trackHints = [
    {
      title: "처음 시작하는 사람",
      description: "1단계만 먼저 열고 대표 문서 2개만 읽어도 충분합니다.",
    },
    {
      title: "이미 용어를 아는 사람",
      description: "2단계 플레이북부터 바로 들어가도 흐름을 따라갈 수 있습니다.",
    },
    {
      title: "실전만 빠르게 보고 싶은 사람",
      description: "4단계 사례집과 5단계 실습부터 보고 필요한 문서만 거슬러 올라가세요.",
    },
  ];

  return (
    <main className="mx-auto w-full max-w-6xl px-6 py-12">
      <section className="rounded-[2rem] border border-border/70 bg-card/70 px-6 py-8 shadow-sm backdrop-blur sm:px-10 sm:py-10">
        <div className="space-y-4">
          <Badge variant="secondary" className="w-fit">
            학습 트랙
          </Badge>
          <div className="space-y-3">
            <h1 className="flex items-center gap-3 text-3xl font-semibold tracking-tight sm:text-4xl">
              <BookMarked className="size-7 text-primary" />
              역할별 학습 트랙 허브
            </h1>
            <p className="max-w-3xl text-base leading-8 text-muted-foreground">
              문서, 플레이북, 기능 가이드, 사례집, 실습을 한 번에 따라가며
              AI IDE와 협업하는 언어를 단계적으로 익히는 경로입니다.
            </p>
          </div>
        </div>
      </section>

      <section className="mt-8">
        <Card className="rounded-[1.5rem] border border-border/70 bg-card/80">
          <CardContent className="grid gap-4 px-6 py-5 md:grid-cols-3">
            {trackHints.map((hint) => (
              <div key={hint.title}>
                <p className="font-medium">{hint.title}</p>
                <p className="mt-2 text-sm leading-7 text-muted-foreground">
                  {hint.description}
                </p>
              </div>
            ))}
          </CardContent>
        </Card>
      </section>

      <section className="mt-8 grid gap-6">
        {tracks.map((track, index) => {
          const docs = getDocsBySlugs(track.docs);
          const playbooks = track.playbooks
            .map((slug) => getPlaybookBySlug(slug))
            .filter((item) => item !== null);
          const guides = track.guides
            .map((slug) => getFeatureGuideBySlug(slug))
            .filter((item) => item !== null);
          const casebooks = track.casebooks
            .map((slug) => getCasebookBySlug(slug))
            .filter((item) => item !== null);
          const workouts = track.workouts
            .map((slug) => getWorkoutBySlug(slug))
            .filter((item) => item !== null);

          return (
            <details
              key={track.role}
              id={getTrackAnchorId(track.role)}
              open={index === 0}
              className="rounded-[2rem] border border-border/70 bg-card/80"
            >
              <summary className="cursor-pointer list-none px-6 py-6 sm:px-8">
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Sparkles className="size-5 text-primary" />
                      <p className="text-2xl font-semibold tracking-tight">
                        {track.role}
                      </p>
                    </div>
                    <p className="max-w-3xl text-sm leading-7 text-muted-foreground">
                      {track.summary}
                    </p>
                  </div>
                  <Badge variant="secondary" className="shrink-0">
                    5단계 트랙
                  </Badge>
                </div>
              </summary>

              <div className="space-y-6 border-t border-border/70 px-6 py-6 sm:px-8">
                <div className="grid gap-4 md:grid-cols-2">
                  <InfoBlock
                    title="이 역할이 먼저 익혀야 하는 것"
                    description={getTrackFocus(track.role)}
                  />
                  <InfoBlock
                    title="이 트랙을 마치면 할 수 있는 것"
                    description={getTrackOutcome(track.role)}
                  />
                </div>

                <div className="space-y-4">
                  <TrackStage
                    label="1단계"
                    title="핵심 용어 문서"
                    description="먼저 용어를 정확히 익혀야 AI IDE가 이해할 수 있는 요청으로 바꿀 수 있습니다."
                    items={docs.map((doc) => ({
                      href: doc.href,
                      title: doc.title,
                      summary: doc.description,
                      badges: [doc.priority, doc.difficulty],
                    }))}
                    defaultOpen
                  />
                  <TrackStage
                    label="2단계"
                    title="실전 플레이북"
                    description="같은 기능이라도 내 역할에 맞게 어떤 문장으로 설명해야 하는지 익히는 단계입니다."
                    items={playbooks.map((item) => ({
                      href: `/playbooks/${item.slug}`,
                      title: item.title,
                      summary: item.summary,
                      badges: [item.role, item.level],
                    }))}
                  />
                  <TrackStage
                    label="3단계"
                    title="기능 단위 가이드"
                    description="화면, 상태, API를 기능 묶음으로 보는 습관을 만드는 단계입니다."
                    items={guides.map((item) => ({
                      href: `/guides/${item.slug}`,
                      title: item.title,
                      summary: item.summary,
                      badges: [item.level, item.audience[0]],
                    }))}
                  />
                  <TrackStage
                    label="4단계"
                    title="프로젝트 사례집"
                    description="실제 제품 기능을 처음부터 끝까지 어떻게 시킬지 보는 완성형 실전 단계입니다."
                    items={casebooks.map((item) => ({
                      href: `/casebooks/${item.slug}`,
                      title: item.title,
                      summary: item.summary,
                      badges: [item.level, item.roles[0]],
                    }))}
                  />
                  <TrackStage
                    label="5단계"
                    title="실습 훈련"
                    description="나쁜 요청을 직접 고쳐 보며, 배운 내용을 내 문장으로 체화하는 단계입니다."
                    items={workouts.map((item) => ({
                      href: `/workouts/${item.slug}`,
                      title: item.title,
                      summary: item.problem,
                      badges: [item.level, item.role],
                    }))}
                  />
                </div>
              </div>
            </details>
          );
        })}
      </section>

      <section className="mt-8 rounded-[1.75rem] border border-border/70 bg-background/70 px-6 py-6">
        <div className="flex items-center gap-2">
          <Layers3 className="size-5 text-primary" />
          <h2 className="text-xl font-semibold tracking-tight">
            학습 트랙 읽는 법
          </h2>
        </div>
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          <InfoBlock
            title="용어부터 사례까지 이어서 보기"
            description="개념을 먼저 익히고, 플레이북과 가이드로 확장한 뒤 사례집과 실습으로 마무리하면 훨씬 빠르게 체화됩니다."
          />
          <InfoBlock
            title="내 역할에 맞는 경로부터 시작하기"
            description="지금 맡은 역할과 가장 가까운 트랙을 먼저 따라가면 필요한 표현을 빠르게 익힐 수 있습니다."
          />
          <InfoBlock
            title="프롬프트를 바로 복사해 실험하기"
            description="각 단계의 프롬프트를 AI IDE에 바로 넣어보면서 결과를 비교하면 학습 속도가 빨라집니다."
          />
        </div>
        <div className="mt-6">
          <Link
            href="/guides"
            className="inline-flex items-center gap-2 text-sm font-medium text-primary"
          >
            기능 가이드 전체 보기
            <ArrowRight className="size-4" />
          </Link>
        </div>
      </section>
    </main>
  );
}

function getTrackAnchorId(role: string) {
  switch (role) {
    case "기획자":
      return "planner-track";
    case "디자이너":
      return "designer-track";
    case "주니어 개발자":
      return "junior-developer-track";
    default:
      return undefined;
  }
}

type TrackColumnProps = {
  label: string;
  title: string;
  description: string;
  items: Array<{
    href: string;
    title: string;
    summary: string;
    badges: string[];
  }>;
};

function TrackStage({
  label,
  title,
  description,
  items,
  defaultOpen = false,
}: TrackColumnProps & { defaultOpen?: boolean }) {
  const completionHint = getTrackCompletionHint(label);
  const practiceHint = getTrackPracticeHint(label);
  const previewItems = items.slice(0, 2);
  const hiddenCount = Math.max(items.length - previewItems.length, 0);

  return (
    <details
      open={defaultOpen}
      className="rounded-[1.5rem] border border-border/70 bg-background/70"
    >
      <summary className="cursor-pointer list-none px-5 py-5">
        <div className="flex flex-wrap items-center gap-3">
          <Badge variant="outline">{label}</Badge>
          <p className="font-medium">{title}</p>
        </div>
        <p className="mt-3 text-sm leading-6 text-muted-foreground">{description}</p>
        <div className="mt-4 space-y-2">
          {previewItems.map((item) => (
            <div
              key={item.href}
              className="rounded-2xl border border-border/70 bg-card/80 px-4 py-3"
            >
              <div className="flex flex-wrap items-center gap-2">
                {item.badges.slice(0, 2).map((badge) => (
                  <Badge key={badge} variant="outline">
                    {badge}
                  </Badge>
                ))}
              </div>
              <p className="mt-2 font-semibold">{item.title}</p>
              <p className="mt-1 text-sm leading-6 text-muted-foreground line-clamp-2">
                {item.summary}
              </p>
            </div>
          ))}
        </div>
        <p className="mt-4 text-sm font-medium text-primary">
          {hiddenCount > 0 ? `${hiddenCount}개 더 보기` : "단계 자세히 보기"}
        </p>
      </summary>
      <div className="space-y-4 border-t border-border/70 px-5 py-5">
        <div className="grid gap-4 rounded-2xl border border-dashed border-border/70 bg-background/60 px-4 py-4 md:grid-cols-2">
          <div>
            <p className="text-xs font-semibold tracking-wide text-foreground/90">
              이 단계 완료 기준
            </p>
            <p className="mt-2 text-xs leading-6 text-muted-foreground">
              {completionHint}
            </p>
          </div>
          <div>
            <p className="text-xs font-semibold tracking-wide text-foreground/90">
              멈춰서 점검할 질문
            </p>
            <p className="mt-2 text-xs leading-6 text-muted-foreground">
              {practiceHint}
            </p>
          </div>
        </div>
        <div className="space-y-2">
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="block rounded-2xl border border-border/70 bg-card/80 px-4 py-3 transition-colors hover:bg-muted/60"
            >
              <div className="flex flex-wrap items-center gap-2">
                {item.badges.slice(0, 2).map((badge) => (
                  <Badge key={badge} variant="outline">
                    {badge}
                  </Badge>
                ))}
              </div>
              <p className="mt-2 font-semibold">{item.title}</p>
              <p className="mt-1 text-sm leading-6 text-muted-foreground line-clamp-2">
                {item.summary}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </details>
  );
}

function getTrackCompletionHint(label: string) {
  switch (label) {
    case "1단계":
      return "핵심 용어를 내 말로 설명하고, 같은 개념과 헷갈리는 용어를 구분할 수 있으면 다음 단계로 넘어가도 됩니다.";
    case "2단계":
      return "내 역할에 맞는 요청 문장을 직접 한 번 써보고, 무엇을 빠뜨리면 결과가 약해지는지 설명할 수 있으면 충분합니다.";
    case "3단계":
      return "화면, 상태, API를 하나의 기능 묶음으로 설명할 수 있고, 단계별 구현 순서를 말할 수 있으면 다음 단계로 넘어갈 수 있습니다.";
    case "4단계":
      return "실제 기능을 처음부터 끝까지 어떤 흐름으로 시킬지 이해하고, 수용 기준까지 함께 요청할 수 있으면 사례 단계가 끝난 것입니다.";
    case "5단계":
      return "나쁜 요청을 스스로 고치고, 누락된 조건을 먼저 찾아내는 습관이 생기면 이 트랙을 실제 업무에 적용할 준비가 된 것입니다.";
    default:
      return "핵심 개념과 실전 요청을 연결할 수 있으면 충분합니다.";
  }
}

function getTrackPracticeHint(label: string) {
  switch (label) {
    case "1단계":
      return "이 용어를 왜 쓰는지, 비슷한 다른 용어 대신 이 표현을 써야 하는 이유를 설명할 수 있는가?";
    case "2단계":
      return "지금 요청은 화면 이름만 말하고 있는가, 아니면 기능 흐름과 결과 기준까지 포함하고 있는가?";
    case "3단계":
      return "구현 단계를 말할 때 상태와 예외 처리를 빠뜨리지 않았는가?";
    case "4단계":
      return "완성 사례를 볼 때 화면만 보고 끝내지 않고, 상태 변화와 API 조건까지 같이 읽고 있는가?";
    case "5단계":
      return "좋은 답을 읽기 전에 먼저 내가 직접 요구사항을 다시 써보고 누락된 조건을 표시해봤는가?";
    default:
      return "지금 단계에서 배운 내용을 내 문장으로 다시 설명할 수 있는가?";
  }
}

function getTrackFocus(role: string) {
  switch (role) {
    case "기획자":
      return "모호한 요구사항을 테스트 가능한 문장으로 바꾸고, 화면이 아니라 기능 흐름 전체를 요청하는 감각을 먼저 익혀야 합니다.";
    case "디자이너":
      return "정상 화면뿐 아니라 상태 시스템, 마이크로카피, 정보 구조까지 함께 설명하는 습관을 만드는 것이 중요합니다.";
    case "주니어 개발자":
      return "컴포넌트 구현보다 먼저 상태, API, 예외 처리까지 포함한 구현 단위를 묶어 설명하는 연습이 필요합니다.";
    default:
      return "역할에 맞는 표현과 학습 흐름을 먼저 익히는 것이 중요합니다.";
  }
}

function getTrackOutcome(role: string) {
  switch (role) {
    case "기획자":
      return "기능 요구사항, 성공 기준, 예외 상태를 빠뜨리지 않고 AI IDE에 전달할 수 있게 됩니다.";
    case "디자이너":
      return "화면 개선 요청을 시각 장식이 아니라 구조, 상태, 행동 유도 중심으로 설명할 수 있게 됩니다.";
    case "주니어 개발자":
      return "API 연동, 인증, 성능, 상태 처리까지 포함한 구현 요청을 더 안정적으로 작성할 수 있게 됩니다.";
    default:
      return "역할에 맞는 실전 요청을 더 정확하게 작성할 수 있게 됩니다.";
  }
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
