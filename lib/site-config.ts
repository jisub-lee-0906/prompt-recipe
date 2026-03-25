import type { DocCategory } from "@/lib/docs-config";

export const SITE_NAME = "AI 프롬프팅 가이드";
export const SITE_DESCRIPTION =
  "기획자, 디자이너, 주니어 개발자가 웹 개발과 UI/UX 용어를 빠르게 익히고 AI IDE에 더 정확하게 요청할 수 있도록 돕는 정적 문서형 교과서입니다.";
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://prompting-docs.example.com";
export const SITE_UPDATED_AT = "2026-03-25";
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
      "모달, 토스트, 상태 화면, 마이크로카피처럼 화면 경험을 설명할 때 자주 쓰는 UI/UX 용어를 실무 문맥으로 정리합니다.",
  },
  frontend: {
    title: "프론트엔드",
    description:
      "컴포넌트, 상태, 라우팅, 렌더링, 데이터 흐름처럼 구현 감각을 만드는 프론트엔드 개념을 정리합니다.",
  },
  backend: {
    title: "백엔드",
    description:
      "API, 인증, 권한, 캐시, 운영 흐름처럼 서비스의 동작과 데이터 계약을 설명할 때 필요한 백엔드 용어를 다룹니다.",
  },
};

export const ROLE_PATHS = [
  {
    role: "기획자",
    description:
      "요구사항과 사용자 흐름을 개발 가능한 문장으로 바꾸고 AI IDE와 빠르게 맞추는 시작 경로입니다.",
    slugs: ["user-flow", "information-architecture", "success-criteria", "api"],
  },
  {
    role: "디자이너",
    description:
      "화면 구조, 상태 표현, 마이크로카피를 AI IDE가 구현할 수 있는 요청으로 바꾸고 빠르게 맞추는 경로입니다.",
    slugs: ["modal", "toast", "empty-state", "microcopy"],
  },
  {
    role: "주니어 개발자",
    description:
      "컴포넌트, 상태, 라우팅, 데이터 흐름을 안정적으로 구현하는 언어를 익히고 빠르게 맞추는 경로입니다.",
    slugs: ["component", "state-management", "routing", "data-fetching"],
  },
] as const;

export const CHANGELOG_ENTRIES = [
  {
    date: "2026-03-25",
    title: "프로젝트 사례집 1차 추가",
    description:
      "회원가입, 로그인·권한, 검색, 관리자 승인, 결제, 파일 업로드를 완성형 기능 요청으로 보는 사례집을 추가했습니다.",
  },
  {
    date: "2026-03-25",
    title: "학습 트랙과 비교 허브 강화",
    description:
      "역할별 학습 트랙, 비교 허브, 추천 탐색 흐름을 보강해 입문부터 실전까지 더 자연스럽게 이어지도록 다듬었습니다.",
  },
  {
    date: "2026-03-25",
    title: "실습 훈련과 상황 허브 추가",
    description:
      "나쁜 요청을 고치는 실습과 실제 기능 상황별 추천 허브를 추가해 교과서 구조를 확장했습니다.",
  },
] as const;
