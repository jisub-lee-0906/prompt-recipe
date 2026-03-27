import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { notFound } from "next/navigation";

import { Callout } from "@/components/mdx/Callout";
import { PromptCard } from "@/components/mdx/PromptCard";
import { PromptCodeBlock } from "@/components/mdx/PromptCodeBlock";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getDocsBySlugs } from "@/lib/mdx";
import {
  getPlaybookBySlug,
  getPlaybooks,
  getRelatedPlaybooks,
} from "@/lib/playbooks";

type PlaybookPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateStaticParams() {
  return getPlaybooks().map((playbook) => ({
    slug: playbook.slug,
  }));
}

export async function generateMetadata({
  params,
}: PlaybookPageProps): Promise<Metadata> {
  const { slug } = await params;
  const playbook = getPlaybookBySlug(slug);

  if (!playbook) {
    return {
      title: "플레이북을 찾을 수 없습니다",
    };
  }

  return {
    title: playbook.title,
    description: playbook.summary,
    alternates: {
      canonical: `/playbooks/${playbook.slug}`,
    },
    openGraph: {
      title: playbook.title,
      description: playbook.summary,
      url: `/playbooks/${playbook.slug}`,
    },
  };
}

export default async function PlaybookPage({ params }: PlaybookPageProps) {
  const { slug } = await params;
  const playbook = getPlaybookBySlug(slug);

  if (!playbook) {
    notFound();
  }

  const relatedDocs = getDocsBySlugs(playbook.docs);
  const relatedPlaybooks = getRelatedPlaybooks(playbook.slug);

  return (
    <main className="mx-auto w-full max-w-5xl px-6 py-12">
      <article className="rounded-[2rem] border border-border/70 bg-card/70 px-6 py-8 shadow-sm backdrop-blur sm:px-10 sm:py-10">
        <header className="space-y-5 border-b border-border/70 pb-8">
          <div className="flex flex-wrap gap-2">
            <Badge variant="secondary">{playbook.level}</Badge>
            <Badge variant="outline">플레이북</Badge>
          </div>
          <div className="space-y-3">
            <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              {playbook.title}
            </h1>
            <p className="max-w-3xl text-base leading-8 text-muted-foreground">
              {playbook.summary}
            </p>
          </div>
        </header>

        <section className="mt-10 space-y-8">
          <div className="space-y-3">
            <h2 className="text-2xl font-semibold tracking-tight">상황</h2>
            <p className="text-base leading-8 text-muted-foreground">
              {playbook.situation}
            </p>
          </div>

          <Callout type="tip" title="이 플레이북의 목표">
            {playbook.outcome}
          </Callout>

          <div className="space-y-4">
            <h2 className="text-2xl font-semibold tracking-tight">빠른 프롬프트</h2>
            <PromptCodeBlock>{playbook.quickPrompt}</PromptCodeBlock>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-semibold tracking-tight">
              더 좋은 요청으로 확장하기
            </h2>
            <PromptCard
              badPrompt={playbook.commonMistake}
              goodPrompt={playbook.improvedRequest}
            />
            <Callout type="warning" title="왜 이전 요청이 약한가">
              화면 이름만 말하면 검증, 상태, 예외 처리, 다음 행동이 빠질 가능성이
              큽니다. 좋은 요청은 화면보다 기능 흐름과 결과 기준을 먼저 설명합니다.
            </Callout>
            <PromptCodeBlock>{playbook.detailedPrompt}</PromptCodeBlock>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-semibold tracking-tight">
              이 표현이 더 좋아지는 이유
            </h2>
            <div className="grid gap-3">
              <CoachingPoint>
                요청 범위를 화면 하나에서 기능 흐름 전체로 넓혀, AI IDE가 무엇을
                빠뜨리면 안 되는지 더 분명하게 이해하게 합니다.
              </CoachingPoint>
              <CoachingPoint>
                성공 상태뿐 아니라 실패와 예외 상태를 함께 넣어야 실제 서비스에
                가까운 결과를 얻을 수 있습니다.
              </CoachingPoint>
              <CoachingPoint>
                결과 화면 이후의 다음 행동까지 지정하면, 구현이 끊기지 않고
                사용자 흐름까지 이어집니다.
              </CoachingPoint>
              {getPlaybookTeachingPoints(playbook.slug).map((point) => (
                <CoachingPoint key={point}>{point}</CoachingPoint>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-semibold tracking-tight">
              자주 빠지는 조건
            </h2>
            <div className="grid gap-3">
              {getPlaybookMissingConditions(playbook.slug).map((item) => (
                <CoachingPoint key={item}>{item}</CoachingPoint>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-semibold tracking-tight">
              같이 보면 좋은 문서
            </h2>
            <div className="grid gap-4 md:grid-cols-2">
              {relatedDocs.map((doc) => (
                <RelatedCard
                  key={doc.slug}
                  href={doc.href}
                  title={doc.title}
                  summary={doc.description}
                  badges={[doc.priority, doc.difficulty]}
                />
              ))}
            </div>
          </div>

          {relatedPlaybooks.length > 0 ? (
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold tracking-tight">
                이어서 보기 좋은 플레이북
              </h2>
              <div className="grid gap-4 md:grid-cols-2">
                {relatedPlaybooks.map((item) => (
                <RelatedCard
                  key={item.slug}
                  href={`/playbooks/${item.slug}`}
                  title={item.title}
                  summary={item.summary}
                    badges={[item.level, "플레이북"]}
                  />
                ))}
              </div>
            </div>
          ) : null}

          <div className="space-y-4">
            <h2 className="text-2xl font-semibold tracking-tight">
              요청 전 체크리스트
            </h2>
            <div className="grid gap-3">
              {playbook.checklist.map((item) => (
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

          <Callout type="info" title="사용 팁">
            플레이북을 그대로 복붙해도 되지만, 프로젝트 맥락과 제약 조건을
            덧붙일수록 결과가 더 좋아집니다.
          </Callout>
        </section>

        <footer className="mt-12 border-t border-border/70 pt-8">
          <Link
            href="/playbooks"
            className="inline-flex items-center gap-2 text-sm font-medium text-primary"
          >
            플레이북 목록으로 돌아가기
            <ArrowRight className="size-4" />
          </Link>
        </footer>
      </article>
    </main>
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

function CoachingPoint({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-border/70 bg-background/70 px-4 py-4 text-sm leading-7 text-muted-foreground">
      {children}
    </div>
  );
}

function getPlaybookTeachingPoints(slug: string) {
  switch (slug) {
    case "planner-signup-page":
      return [
        "회원가입은 입력창 배치보다 가입 후 어디로 보낼지까지 정해야 전환 흐름이 끊기지 않습니다.",
        "검증 규칙을 요청에 적어두면 AI IDE가 필드만 만들고 끝내는 위험을 크게 줄일 수 있습니다.",
      ];
    case "planner-dashboard-prd":
      return [
        "대시보드는 카드 배치보다 운영자가 어떤 질문에 답을 얻어야 하는지가 먼저 정리되어야 합니다.",
        "핵심 KPI와 하단 상세 목록의 관계를 설명하면 AI IDE가 정보 우선순위를 더 안정적으로 잡을 수 있습니다.",
      ];
    case "planner-admin-workflow":
      return [
        "관리자 기능은 버튼보다 검토 흐름이 핵심이라 목록, 상세, 처리 결과를 함께 요청해야 합니다.",
        "반려 사유와 결과 반영 규칙을 먼저 적으면 운영 화면이 훨씬 실무에 가까워집니다.",
      ];
    case "planner-checkout-flow":
      return [
        "결제는 성공 화면보다 실패 복구와 완료 후 행동이 더 중요하므로, 그 둘을 먼저 적는 편이 좋습니다.",
        "전환 CTA와 실패 시 대체 경로를 함께 넣어야 사용자가 막히지 않는 결과가 나옵니다.",
      ];
    case "designer-dashboard-polish":
      return [
        "디자인 개선 요청은 시각 스타일보다 정보 구조와 우선순위를 먼저 말해야 실제 사용성이 좋아집니다.",
        "빈 상태와 로딩 상태를 함께 요청해야 대시보드가 정상 화면만 예쁜 결과로 끝나지 않습니다.",
      ];
    case "designer-state-system":
      return [
        "상태 시스템 요청은 정상 화면의 변형이 아니라 각각 다른 목적의 화면이라는 점을 분리해 말하는 것이 중요합니다.",
        "같은 컴포넌트가 목록과 상세에서 어떻게 다르게 보여야 하는지도 같이 적으면 결과가 좋아집니다.",
      ];
    case "designer-landing-page-hero":
      return [
        "히어로 섹션은 장식보다 메시지 우선순위와 CTA 구분을 먼저 잡아야 전환력이 생깁니다.",
        "모바일 구조를 같이 적으면 데스크톱 기준으로만 과장된 히어로가 나오는 위험을 줄일 수 있습니다.",
      ];
    case "designer-admin-ia":
      return [
        "관리자 화면은 색보다 계층이 중요하므로, 내비게이션과 상세 영역 관계를 먼저 설명해야 합니다.",
        "브레드크럼과 섹션 제목 역할을 나눠 적으면 현재 위치 인지가 쉬운 구조가 나옵니다.",
      ];
    case "junior-api-integration":
      return [
        "API 연동 요청에서는 성공 상태만이 아니라 느린 응답과 데이터 없음 상태를 함께 넣어야 실제 화면 품질이 안정됩니다.",
        "응답 구조를 먼저 말하면 화면 구현과 타입 정의가 동시에 정리되기 쉬워집니다.",
      ];
    case "junior-form-submit-flow":
      return [
        "폼 기능은 입력창보다 제출 이후의 성공과 실패 흐름을 먼저 포함해야 완성형 요청이 됩니다.",
        "검증, 로딩, 완료 후 다음 행동을 함께 적으면 UI와 상태 관리가 분리되지 않습니다.",
      ];
    case "junior-auth-guard":
      return [
        "보호된 페이지 요청은 로그인 성공보다 비로그인, 만료, 권한 부족을 나누는 데서 품질 차이가 납니다.",
        "권한 부족 상태를 별도 화면과 문구로 분리하면 서비스 흐름이 훨씬 명확해집니다.",
      ];
    case "junior-list-performance":
      return [
        "성능 요청은 ‘빠르게’가 아니라 검색, 스크롤, 캐시, 느린 응답을 각각 어떻게 다룰지 적는 것이 중요합니다.",
        "긴 목록은 로딩 전략과 탐색 전략을 함께 요청해야 체감 품질이 좋아집니다.",
      ];
    case "search-feature-playbook":
      return [
        "검색 기능은 입력창 하나보다 결과 상태와 정렬 규칙까지 함께 있어야 실제 기능이 됩니다.",
        "인덱스와 정렬 기준을 요청에 넣으면 검색 경험이 단순 UI 수준에서 멈추지 않습니다.",
      ];
    case "auth-flow-playbook":
      return [
        "인증 요청은 로그인 성공보다 예외 상태를 먼저 분리할수록 실제 서비스에 가까워집니다.",
        "보호된 페이지 이동 흐름까지 포함해야 로그인 화면이 단독 기능처럼 보이지 않습니다.",
      ];
    case "admin-dashboard-playbook":
      return [
        "관리자 목록은 테이블만 만드는 일이 아니라 운영 도구를 설계하는 일이라는 점을 요청에 드러내야 합니다.",
        "검색, 필터, 정렬, 상태 화면을 함께 넣어야 관리자 화면이 실제 업무에 쓸 만한 결과가 됩니다.",
      ];
    default:
      return [
        "좋은 요청은 시각적 결과보다 기능 단위와 상태 변화를 먼저 설명합니다.",
      ];
  }
}

function getPlaybookMissingConditions(slug: string) {
  switch (slug) {
    case "planner-signup-page":
      return [
        "필드 이름만 있고 검증 규칙이 없다면, 구현 결과가 화면 중심으로만 끝날 가능성이 큽니다.",
        "가입 성공 후 다음 행동이 비어 있으면 전환 흐름이 끊긴 페이지가 만들어질 수 있습니다.",
      ];
    case "planner-dashboard-prd":
      return [
        "운영 목적이 빠지면 대시보드가 카드 배열로만 끝날 가능성이 큽니다.",
        "필터와 목록 관계를 적지 않으면 화면은 예뻐도 탐색 흐름은 약할 수 있습니다.",
      ];
    case "planner-admin-workflow":
      return [
        "반려 사유와 처리 결과 반영이 빠지면 승인 기능이 실제 운영에서 바로 막힐 수 있습니다.",
        "상세 확인 단계가 없으면 관리자가 버튼만 누르는 구조로 축소될 수 있습니다.",
      ];
    case "planner-checkout-flow":
      return [
        "실패 복구와 대체 결제 경로가 빠지면 결제 경험이 성공 케이스에만 맞춰질 수 있습니다.",
        "완료 후 이동 경로를 적지 않으면 전환 흐름이 마지막 단계에서 끊깁니다.",
      ];
    case "designer-dashboard-polish":
      return [
        "정보 우선순위 설명이 없으면 개선 결과가 색과 간격 조정에만 머물 수 있습니다.",
        "상태 화면 요청이 빠지면 정상 화면만 정리된 결과가 나올 수 있습니다.",
      ];
    case "designer-state-system":
      return [
        "빈 상태와 에러 상태를 분리하지 않으면 모든 상태가 비슷한 카드로 보일 수 있습니다.",
        "CTA를 적지 않으면 상태 화면이 설명만 하고 행동을 유도하지 못합니다.",
      ];
    case "designer-landing-page-hero":
      return [
        "핵심 메시지와 CTA 구분이 없으면 히어로가 장식 중심 결과로 끝날 수 있습니다.",
        "모바일 조건이 빠지면 첫 화면 메시지 우선순위가 깨질 위험이 큽니다.",
      ];
    case "designer-admin-ia":
      return [
        "내비게이션 계층 설명이 없으면 관리자 화면이 여전히 어디서 무엇을 해야 할지 헷갈릴 수 있습니다.",
        "브레드크럼과 섹션 제목 역할이 빠지면 현재 위치 인지가 약해집니다.",
      ];
    case "junior-api-integration":
      return [
        "엔드포인트만 있고 로딩·오류·빈 상태가 없다면 화면은 동작해도 제품 품질은 낮게 느껴집니다.",
        "느린 응답 조건을 적지 않으면 실제 사용에서 멈춘 화면처럼 보일 수 있습니다.",
      ];
    case "junior-form-submit-flow":
      return [
        "성공 메시지만 있고 실패 복구가 없으면 실제 서비스에서 재시도 경험이 빈약해집니다.",
        "제출 중 버튼 상태를 적지 않으면 중복 제출이 쉽게 생길 수 있습니다.",
      ];
    case "junior-auth-guard":
      return [
        "권한 부족 상태를 빼면 로그인만 확인하는 반쪽짜리 보호 기능이 될 수 있습니다.",
        "세션 만료를 분리하지 않으면 사용자는 왜 다시 로그인해야 하는지 이해하기 어렵습니다.",
      ];
    case "junior-list-performance":
      return [
        "검색 디바운스나 캐시가 빠지면 ‘빠르게’라는 요구가 실제 구현 조건으로 바뀌지 않습니다.",
        "추가 로딩과 초기 로딩을 구분하지 않으면 긴 목록 UX가 쉽게 거칠어집니다.",
      ];
    case "search-feature-playbook":
      return [
        "검색 API와 정렬 규칙이 빠지면 검색창만 있는 기능으로 축소될 수 있습니다.",
        "결과 없음 상태를 적지 않으면 사용자가 다음 행동을 알 수 없는 화면이 됩니다.",
      ];
    case "auth-flow-playbook":
      return [
        "비로그인, 만료, 권한 부족을 나누지 않으면 인증 흐름이 실제 예외를 설명하지 못합니다.",
        "로그인 후 어디로 돌아갈지 없으면 보호된 페이지 경험이 끊깁니다.",
      ];
    case "admin-dashboard-playbook":
      return [
        "운영 도구로서 필요한 검색, 필터, 정렬이 빠지면 목록 화면만 있는 결과가 될 수 있습니다.",
        "모바일 구조를 적지 않으면 관리자 화면이 작은 화면에서 금방 무너질 수 있습니다.",
      ];
    default:
      return [
        "상태와 예외 조건을 적지 않으면 AI IDE가 정상 화면만 구현할 가능성이 높습니다.",
      ];
  }
}
