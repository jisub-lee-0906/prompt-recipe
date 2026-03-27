import type { DocCategory } from "@/lib/docs-config";

export const SITE_NAME = "AI 프롬프팅 가이드";
export const SITE_DESCRIPTION =
  "웹 개발과 UI/UX 용어를 빠르게 익히고, AI IDE에 더 정확하게 요청하고, 결과를 검토하고, 다시 수정 지시할 수 있도록 돕는 정적 문서형 교과서입니다.";
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://prompting-docs.example.com";
export const SITE_UPDATED_AT = "2026-03-27";
export const FEEDBACK_URL =
  "mailto:jisub0906@gmail.com?subject=AI%20%ED%94%84%EB%A1%AC%ED%94%84%ED%8C%85%20%EA%B0%80%EC%9D%B4%EB%93%9C%20%ED%94%BC%EB%93%9C%EB%B0%B1";
export const REQUEST_TERM_URL =
  "mailto:jisub0906@gmail.com?subject=%EB%88%84%EB%9D%BD%EB%90%9C%20%EC%9A%A9%EC%96%B4%20%EC%9A%94%EC%B2%AD";

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

export const CHANGELOG_ENTRIES = [
  {
    date: "2026-03-26",
    title: "AI IDE 실전 운영 가이드 추가",
    description:
      "코드베이스 읽기, 작업 분해, 검증 루프, 수정 요청, 리뷰, 실패 통제를 다루는 운영 가이드를 추가했습니다.",
  },
  {
    date: "2026-03-25",
    title: "프로젝트 사례집 1차 추가",
    description:
      "회원가입, 로그인·권한, 검색, 관리자 승인, 결제, 파일 업로드를 완성형 기능 요청으로 보는 사례집을 추가했습니다.",
  },
  {
    date: "2026-03-25",
    title: "비교 허브와 추천 탐색 흐름 강화",
    description:
      "비교 허브와 추천 탐색 흐름을 보강해 문서 중심 탐색에서 실전 자료로 더 자연스럽게 이어지도록 다듬었습니다.",
  },
  {
    date: "2026-03-25",
    title: "실습 훈련과 상황 허브 추가",
    description:
      "나쁜 요청을 고치는 실습과 실제 기능 상황별 추천 허브를 추가해 교과서 구조를 확장했습니다.",
  },
] as const;
