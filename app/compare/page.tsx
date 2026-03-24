import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, SplitSquareVertical } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getDocsBySlugs } from "@/lib/mdx";

export const metadata: Metadata = {
  title: "비교 허브",
  description:
    "헷갈리기 쉬운 용어를 비교 묶음으로 정리해 어떤 문서부터 읽어야 할지 빠르게 찾을 수 있습니다.",
};

const COMPARISON_GROUPS = [
  {
    title: "겹쳐 뜨는 UI 비교",
    description:
      "모달, 다이얼로그, 드로어처럼 화면 위에 떠오르는 UI를 요청할 때 가장 자주 헷갈리는 묶음입니다.",
    slugs: ["modal", "dialog", "drawer"],
  },
  {
    title: "렌더링 방식 비교",
    description:
      "SSR, CSR, 하이드레이션처럼 초기 화면 생성 방식과 인터랙션 연결 방식을 함께 이해해야 하는 묶음입니다.",
    slugs: ["ssr", "csr", "hydration"],
  },
  {
    title: "상태 흐름 비교",
    description:
      "상태 관리, 제어 컴포넌트, 낙관적 UI처럼 화면 상태를 설계할 때 함께 보는 편이 좋은 묶음입니다.",
    slugs: ["state-management", "controlled-component", "optimistic-ui"],
  },
  {
    title: "API 계약 비교",
    description:
      "API, 엔드포인트, 요청/응답 구조처럼 백엔드 요구사항을 구체적인 계약 언어로 바꿀 때 필요한 묶음입니다.",
    slugs: ["api", "endpoint", "request-response-schema"],
  },
  {
    title: "검색 경험 비교",
    description:
      "검색 바, 검색 API, 검색 인덱스처럼 사용자 경험과 데이터 구조를 같이 봐야 하는 묶음입니다.",
    slugs: ["search-bar", "search-api", "search-index"],
  },
  {
    title: "기획 문서 비교",
    description:
      "사용자 흐름, 정보 구조, 수용 기준처럼 요구사항을 더 명확한 실행 단위로 바꾸는 데 필요한 묶음입니다.",
    slugs: ["user-flow", "information-architecture", "acceptance-criteria"],
  },
] as const;

export default function ComparePage() {
  const groups = COMPARISON_GROUPS.map((group) => ({
    ...group,
    docs: getDocsBySlugs([...group.slugs]),
  }));

  return (
    <main className="mx-auto w-full max-w-6xl px-6 py-12">
      <section className="rounded-[2rem] border border-border/70 bg-card/70 px-6 py-8 shadow-sm backdrop-blur sm:px-10 sm:py-10">
        <div className="space-y-4">
          <Badge variant="secondary" className="w-fit">
            Compare Hub
          </Badge>
          <div className="space-y-3">
            <h1 className="flex items-center gap-3 text-3xl font-semibold tracking-tight sm:text-4xl">
              <SplitSquareVertical className="size-7 text-primary" />
              헷갈리기 쉬운 개념 비교 허브
            </h1>
            <p className="max-w-3xl text-base leading-8 text-muted-foreground">
              비슷해 보이지만 실제로는 다른 개념들을 묶어서 정리했습니다.
              문서를 한 개씩 찾기 전에 비교 축부터 잡으면 AI IDE에 더 정확하게
              요청할 수 있습니다.
            </p>
          </div>
        </div>
      </section>

      <section className="mt-8 grid gap-5 lg:grid-cols-2">
        {groups.map((group) => (
          <Card
            key={group.title}
            className="rounded-[1.75rem] border border-border/70 bg-card/80"
          >
            <CardHeader className="space-y-3">
              <CardTitle className="text-2xl">{group.title}</CardTitle>
              <p className="text-sm leading-7 text-muted-foreground">
                {group.description}
              </p>
            </CardHeader>
            <CardContent className="space-y-3">
              {group.docs.map((doc) => (
                <Link
                  key={doc.slug}
                  href={doc.href}
                  className="block rounded-2xl border border-border/70 bg-background/70 px-4 py-4 transition-colors hover:bg-muted/60"
                >
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge variant="secondary">{doc.priority}</Badge>
                    <Badge variant="outline">{doc.difficulty}</Badge>
                    <span className="text-sm text-muted-foreground">
                      {doc.roleTargets.join(", ")}
                    </span>
                  </div>
                  <p className="mt-3 font-semibold">{doc.title}</p>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">
                    {doc.description}
                  </p>
                </Link>
              ))}
            </CardContent>
          </Card>
        ))}
      </section>

      <section className="mt-8 rounded-[1.75rem] border border-border/70 bg-background/70 px-6 py-6">
        <h2 className="text-xl font-semibold tracking-tight">비교 허브 활용 팁</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          <div>
            <p className="font-medium">1. 먼저 구분 기준 잡기</p>
            <p className="mt-2 text-sm leading-7 text-muted-foreground">
              비슷한 용어를 한 번에 보면 요청 문장에서 빠져 있는 조건이 무엇인지
              더 쉽게 보입니다.
            </p>
          </div>
          <div>
            <p className="font-medium">2. 비교 후 상세 문서로 이동</p>
            <p className="mt-2 text-sm leading-7 text-muted-foreground">
              개념 차이를 이해한 뒤 상세 문서로 들어가면 프롬프트 예시를 더 정확히
              고를 수 있습니다.
            </p>
          </div>
          <div>
            <p className="font-medium">3. 관련 문서까지 이어 읽기</p>
            <p className="mt-2 text-sm leading-7 text-muted-foreground">
              문서 하단 추천 학습과 같이 보면 구현 방식까지 자연스럽게 이어집니다.
            </p>
          </div>
        </div>
        <div className="mt-6">
          <Link
            href="/docs/ui-ux/modal"
            className="inline-flex items-center gap-2 text-sm font-medium text-primary"
          >
            대표 비교 문서부터 시작하기
            <ArrowRight className="size-4" />
          </Link>
        </div>
      </section>
    </main>
  );
}
