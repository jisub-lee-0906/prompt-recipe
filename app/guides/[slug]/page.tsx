import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { notFound } from "next/navigation";

import { Callout } from "@/components/mdx/Callout";
import { PromptCodeBlock } from "@/components/mdx/PromptCodeBlock";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getFeatureGuideBySlug, getFeatureGuides } from "@/lib/guides";
import { getDocsBySlugs } from "@/lib/mdx";
import { getPlaybookBySlug, getPlaybooksByRole } from "@/lib/playbooks";

type GuidePageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateStaticParams() {
  return getFeatureGuides().map((guide) => ({
    slug: guide.slug,
  }));
}

export async function generateMetadata({
  params,
}: GuidePageProps): Promise<Metadata> {
  const { slug } = await params;
  const guide = getFeatureGuideBySlug(slug);

  if (!guide) {
    return {
      title: "기능 가이드를 찾을 수 없습니다",
    };
  }

  return {
    title: guide.title,
    description: guide.summary,
    alternates: {
      canonical: `/guides/${guide.slug}`,
    },
    openGraph: {
      title: guide.title,
      description: guide.summary,
      url: `/guides/${guide.slug}`,
    },
  };
}

export default async function GuidePage({ params }: GuidePageProps) {
  const { slug } = await params;
  const guide = getFeatureGuideBySlug(slug);

  if (!guide) {
    notFound();
  }

  const relatedDocs = getDocsBySlugs(guide.docs);
  const relatedPlaybooks = guide.playbooks
    .map((playbookSlug) => getPlaybookBySlug(playbookSlug))
    .filter((item) => item !== null);
  const primaryAudience = guide.audience[0];
  const nextPlaybooks = primaryAudience
    ? getPlaybooksByRole(primaryAudience).slice(0, 2)
    : [];

  return (
    <main className="mx-auto w-full max-w-5xl px-6 py-12">
      <article className="rounded-[2rem] border border-border/70 bg-card/70 px-6 py-8 shadow-sm backdrop-blur sm:px-10 sm:py-10">
        <header className="space-y-5 border-b border-border/70 pb-8">
          <div className="flex flex-wrap gap-2">
            <Badge variant="secondary">{guide.level}</Badge>
            {guide.audience.map((role) => (
              <Badge key={role} variant="outline">
                {role}
              </Badge>
            ))}
            <Badge variant="outline">기능 가이드</Badge>
          </div>
          <div className="space-y-3">
            <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              {guide.title}
            </h1>
            <p className="max-w-3xl text-base leading-8 text-muted-foreground">
              {guide.summary}
            </p>
          </div>
        </header>

        <section className="mt-10 space-y-8">
          <Callout type="tip" title="이 가이드의 목표">
            {guide.goal}
          </Callout>

          <Callout type="info" title="이 가이드를 읽는 포인트">
            단계별 구현 흐름은 단순 체크리스트가 아니라, 요청을 더 구체적으로
            만들기 위해 어떤 층위를 먼저 정리해야 하는지 보여주는 순서입니다.
            각 단계를 읽을 때 화면, 상태, API 중 무엇을 분명하게 말해야 하는지
            같이 확인하세요.
          </Callout>

          <div className="space-y-4">
            <h2 className="text-2xl font-semibold tracking-tight">
              단계별 구현 흐름
            </h2>
            <div className="grid gap-3">
              {guide.stages.map((stage, index) => (
                <div
                  key={stage}
                  className="rounded-2xl border border-border/70 bg-background/70 px-4 py-4"
                >
                  <div className="flex items-start gap-3">
                    <Badge variant="outline">
                      {String(index + 1).padStart(2, "0")}
                    </Badge>
                    <div>
                      <p className="text-sm leading-7 text-muted-foreground">
                        {stage}
                      </p>
                      <p className="mt-2 text-xs leading-6 text-muted-foreground/90">
                        {getGuideStageHint(index)}
                      </p>
                      <p className="mt-2 text-xs leading-6 text-foreground/80">
                        {getGuideStageQuestion(guide.slug, index)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-semibold tracking-tight">
              바로 써볼 수 있는 프롬프트
            </h2>
            {guide.prompts.map((prompt) => (
              <div key={prompt.title} className="space-y-3">
                <p className="text-sm font-medium">{prompt.title}</p>
                <PromptCodeBlock>{prompt.body}</PromptCodeBlock>
              </div>
            ))}
          </div>

          <RelatedSection title="같이 읽어야 하는 문서">
            {relatedDocs.map((doc) => (
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
            {relatedPlaybooks.map((playbook) => (
              <RelatedCard
                key={playbook.slug}
                href={`/playbooks/${playbook.slug}`}
                title={playbook.title}
                summary={playbook.summary}
                badges={[playbook.role, playbook.level]}
              />
            ))}
          </RelatedSection>

          <div className="space-y-4">
            <h2 className="text-2xl font-semibold tracking-tight">
              최종 체크리스트
            </h2>
            <div className="grid gap-3">
              {guide.checklist.map((item) => (
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

          {nextPlaybooks.length > 0 ? (
            <Callout type="info" title="같은 역할의 다음 플레이북">
              {primaryAudience} 관점에서 이어서 보기 좋은 플레이북으로{" "}
              {nextPlaybooks.map((item) => item.title).join(", ")}을 추천합니다.
            </Callout>
          ) : null}
        </section>

        <footer className="mt-12 border-t border-border/70 pt-8">
          <Link
            href="/guides"
            className="inline-flex items-center gap-2 text-sm font-medium text-primary"
          >
            기능 가이드 목록으로 돌아가기
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

function getGuideStageHint(index: number) {
  switch (index) {
    case 0:
      return "첫 단계에서는 무엇을 만들지보다 무엇을 반드시 포함해야 하는지부터 고정하는 것이 중요합니다.";
    case 1:
      return "두 번째 단계에서는 상태와 예외 처리를 넣어 실제 사용 흐름에 가까운 요청으로 확장하세요.";
    case 2:
      return "마지막 단계에서는 모바일, 접근성, 결과 이후 행동까지 포함해 구현 품질을 끌어올리는 것이 좋습니다.";
    default:
      return "이 단계가 빠지면 요청이 다시 추상적으로 돌아가기 쉽습니다.";
  }
}

function getGuideStageQuestion(slug: string, index: number) {
  if (slug === "signup-feature") {
    switch (index) {
      case 0:
        return "이 단계에서는 어떤 입력이 필수인지뿐 아니라, 가입이 끝난 뒤 사용자가 무엇을 하게 될지도 함께 정리해야 합니다.";
      case 1:
        return "오류 메시지를 단순 경고로 볼지, 다음 입력 행동을 유도하는 문장으로 만들지까지 생각해보는 것이 좋습니다.";
      case 2:
        return "제출 이후 성공과 실패가 각각 어디로 이어지는지까지 써야 진짜 기능 단위 요청이 됩니다.";
      default:
        return "이 단계가 빠지면 회원가입 기능이 폼 화면 수준에 머무를 수 있습니다.";
    }
  }

  if (slug === "search-feature-guide") {
    switch (index) {
      case 0:
        return "검색 입력을 어떻게 시작하게 할지와, 결과 카드에서 무엇을 먼저 보여줄지까지 함께 정리해야 합니다.";
      case 1:
        return "정렬과 필터 기준을 모르면 검색 API가 있어도 사용자는 원하는 결과를 찾기 어렵습니다.";
      case 2:
        return "응답이 느릴 때의 체감 품질과 모바일 배치까지 포함해야 검색 경험이 완성됩니다.";
      default:
        return "이 단계가 비면 검색 기능이 입력창 하나 수준으로 축소되기 쉽습니다.";
    }
  }

  if (slug === "auth-feature") {
    switch (index) {
      case 0:
        return "로그인 성공 화면보다 먼저, 어떤 화면이 보호 대상인지와 역할별 차이를 분명히 적는 것이 중요합니다.";
      case 1:
        return "세션 만료와 비로그인 접근을 같은 상태로 뭉개지 않았는지 점검해보세요.";
      case 2:
        return "권한 부족 상태에서 사용자가 어디로 이동하고 무엇을 이해해야 하는지까지 적어야 합니다.";
      default:
        return "인증은 예외 상태를 얼마나 분리했는지가 실제 품질을 결정합니다.";
    }
  }

  if (slug === "admin-dashboard-feature") {
    switch (index) {
      case 0:
        return "관리자가 첫 10초 안에 무엇을 확인해야 하는지 정하지 않으면 KPI 카드가 의미 없이 늘어날 수 있습니다.";
      case 1:
        return "필터와 목록이 연결되는 이유를 적지 않으면 화면은 있어도 운영 흐름은 약해집니다.";
      case 2:
        return "로딩, 빈 상태, 오류 상태가 각각 다른 운영 판단을 돕는지 확인해보세요.";
      default:
        return "대시보드는 카드 배열이 아니라 운영 목적을 지원하는 화면이어야 합니다.";
    }
  }

  if (slug === "checkout-feature") {
    switch (index) {
      case 0:
        return "결제 진입 구조를 읽을 때 사용자가 마지막 순간에 무엇을 망설일 수 있는지까지 생각하는 것이 좋습니다.";
      case 1:
        return "실패 복구는 단순 에러 문구가 아니라 다시 시도할 수 있는 행동까지 포함해야 합니다.";
      case 2:
        return "완료 뒤 어디로 이동하게 할지 없으면 전환 흐름이 실제 제품 경험으로 이어지지 않습니다.";
      default:
        return "결제 기능은 실패 케이스를 얼마나 구체적으로 다루는지가 핵심입니다.";
    }
  }

  if (slug === "list-performance-feature") {
    switch (index) {
      case 0:
        return "초기 로딩 구조를 정할 때 첫 화면 체감 속도를 어떻게 만들지부터 생각해보세요.";
      case 1:
        return "추가 로딩과 검색 입력 최적화는 별개 문제이므로 요청에서 분리해 설명하는 것이 좋습니다.";
      case 2:
        return "캐시와 빈 상태가 빠지면 성능은 좋아져도 사용 경험은 여전히 거칠 수 있습니다.";
      default:
        return "긴 목록은 속도만이 아니라 탐색 피로도를 함께 다뤄야 합니다.";
    }
  }

  if (slug === "profile-settings-feature") {
    switch (index) {
      case 0:
        return "수정 가능한 정보와 보안 정보가 한 화면에 섞이지 않도록 범위를 먼저 나누는 것이 좋습니다.";
      case 1:
        return "저장 중, 저장 완료, 저장 실패가 각각 사용자에게 어떤 의미인지 생각해보세요.";
      case 2:
        return "실패 복구는 단순 경고가 아니라 사용자가 다시 무엇을 해야 하는지 보여줘야 합니다.";
      default:
        return "설정 화면은 입력보다 저장 경험이 더 중요할 때가 많습니다.";
    }
  }

  if (slug === "file-upload-feature") {
    switch (index) {
      case 0:
        return "파일을 어떻게 고르게 할지뿐 아니라, 어떤 제한이 먼저 보여야 하는지도 같이 정리해야 합니다.";
      case 1:
        return "진행 상태와 미리보기는 같은 화면에서 연결되어 보여야 사용자가 업로드 결과를 이해하기 쉽습니다.";
      case 2:
        return "실패 복구는 다시 시도, 제한 조건 안내, 대체 행동까지 포함할수록 좋아집니다.";
      default:
        return "업로드 기능은 상태 전환을 얼마나 명확히 보여주느냐가 품질 차이를 만듭니다.";
    }
  }

  if (slug === "onboarding-feature-guide") {
    switch (index) {
      case 0:
        return "첫 진입 메시지는 서비스 소개보다 사용자가 얻는 첫 가치를 먼저 보여주는 편이 좋습니다.";
      case 1:
        return "초기 행동 유도는 단계 수를 줄이고 CTA를 분명히 적는 것이 중요합니다.";
      case 2:
        return "이탈 방지와 다시 보기 경로가 없으면 온보딩이 한 번성 팝업처럼 끝날 수 있습니다.";
      default:
        return "온보딩은 안내보다 첫 성공 경험을 만드는 구조여야 합니다.";
    }
  }

  if (slug === "notification-feature-guide") {
    switch (index) {
      case 0:
        return "즉시 사라지는 피드백과 보관되는 알림을 구분해야 실제 알림 시스템이 됩니다.";
      case 1:
        return "실패 알림은 문구만이 아니라 다음 행동 CTA가 있어야 가치가 있습니다.";
      case 2:
        return "알림 규칙을 읽을 때 사용자 입장에서 무엇을 먼저 확인해야 하는지 생각해보세요.";
      default:
        return "알림은 메시지 모음이 아니라 피드백 시스템이라는 관점이 필요합니다.";
    }
  }

  if (slug === "approval-feature-guide") {
    switch (index) {
      case 0:
        return "무엇을 승인하는지와 어떤 정보가 목록에 먼저 보여야 하는지 정하지 않으면 운영 화면이 막연해집니다.";
      case 1:
        return "승인과 반려는 같은 버튼 세트가 아니라 다른 입력 규칙을 가진 흐름인지 확인해보세요.";
      case 2:
        return "처리 결과가 목록과 상세에 어떻게 반영되는지까지 적어야 운영 도구가 완성됩니다.";
      default:
        return "승인 기능은 처리 이후 동기화까지 포함해야 진짜 실무 흐름이 됩니다.";
    }
  }

  if (slug === "analytics-feature-guide") {
    switch (index) {
      case 0:
        return "분석 화면은 먼저 어떤 질문에 답을 주는지 정해야 KPI가 의미를 가집니다.";
      case 1:
        return "기간과 필터 기준이 없으면 지표를 비교해도 해석하기 어려울 수 있습니다.";
      case 2:
        return "이벤트와 지표 관계가 드러나는지까지 읽어야 분석 대시보드를 제대로 이해할 수 있습니다.";
      default:
        return "분석 기능은 숫자보다 해석 가능한 구조가 핵심입니다.";
    }
  }

  return "이 단계에서 빠지기 쉬운 조건과 사용자의 다음 행동까지 같이 점검해보세요.";
}
