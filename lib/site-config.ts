import type { DocCategory } from "@/lib/docs-config";

export const SITE_NAME = "AI 프롬프팅 가이드";
export const SITE_DESCRIPTION =
  "기획자, 디자이너, 주니어 개발자가 웹 개발과 UI/UX 용어를 빠르게 이해하고 AI IDE에 더 정확한 요청을 전달하도록 돕는 정적 문서 사이트입니다.";
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://prompting-docs.example.com";
export const SITE_UPDATED_AT = "2026-03-24";
export const FEEDBACK_URL =
  "mailto:feedback@example.com?subject=AI%20%ED%94%84%EB%A1%AC%ED%94%84%ED%8C%85%20%EA%B0%80%EC%9D%B4%EB%93%9C%20%ED%94%BC%EB%93%9C%EB%B0%B1";
export const REQUEST_TERM_URL =
  "mailto:feedback@example.com?subject=%EB%88%84%EB%9D%BD%EB%90%9C%20%EC%9A%A9%EC%96%B4%20%EC%9A%94%EC%B2%AD";

export const CATEGORY_META: Record<
  DocCategory,
  {
    title: string;
    description: string;
  }
> = {
  "ui-ux": {
    title: "UI/UX",
    description:
      "모달, 토스트, 검색, 피드백 같은 화면 경험 용어를 실제 제품 문맥으로 설명합니다.",
  },
  frontend: {
    title: "프론트엔드",
    description:
      "컴포넌트, 상태, 라우팅, 렌더링 방식처럼 화면 구현에 자주 쓰이는 개념을 정리합니다.",
  },
  backend: {
    title: "백엔드",
    description:
      "API, 인증, 권한, 캐시, 운영 개념처럼 서비스 동작을 설명할 때 필요한 용어를 다룹니다.",
  },
};

export const ROLE_PATHS = [
  {
    role: "기획자",
    description:
      "기능 요구사항과 사용자 흐름을 개발 언어로 바꿔서 AI IDE에 전달하고 싶을 때 추천하는 시작 경로입니다.",
    slugs: ["user-flow", "information-architecture", "success-criteria", "api"],
  },
  {
    role: "디자이너",
    description:
      "화면 패턴과 상태 표현, 문구 설계를 AI IDE와 함께 구체화할 때 추천하는 시작 경로입니다.",
    slugs: ["modal", "toast", "empty-state", "microcopy"],
  },
  {
    role: "주니어 개발자",
    description:
      "컴포넌트 구조와 상태, 라우팅, 데이터 흐름을 빠르게 정리하고 구현 감각을 잡고 싶을 때 좋은 경로입니다.",
    slugs: ["component", "state-management", "routing", "data-fetching"],
  },
] as const;

export const CHANGELOG_ENTRIES = [
  {
    date: "2026-03-24",
    title: "96개 기준 문서 정리 완료",
    summary:
      "UI/UX, 프론트엔드, 백엔드, 기획·협업·품질 축을 포함한 96개 레퍼런스 문서를 기준 문서 수준으로 정리했습니다.",
  },
  {
    date: "2026-03-24",
    title: "학습 경로와 추천 탐색 추가",
    summary:
      "카테고리 랜딩, 역할별 빠른 진입, 선행 개념, 다음 추천 학습을 연결해 입문 흐름을 강화했습니다.",
  },
  {
    date: "2026-03-24",
    title: "검색·SEO·품질 감사 보강",
    summary:
      "문서 검색 랭킹, 사이트 메타데이터, 변경 로그, 정적 감사 스크립트를 정리해 제품 완성도를 끌어올렸습니다.",
  },
] as const;
