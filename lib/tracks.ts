import type { DocRoleTarget } from "@/lib/mdx";

export type LearningTrack = {
  role: DocRoleTarget;
  summary: string;
  docs: string[];
  playbooks: string[];
  guides: string[];
};

export const LEARNING_TRACKS: LearningTrack[] = [
  {
    role: "기획자",
    summary:
      "요구사항, 사용자 흐름, 성공 기준을 AI IDE가 바로 구현할 수 있는 언어로 바꾸는 데 초점을 둔 학습 순서입니다.",
    docs: ["user-flow", "information-architecture", "success-criteria", "acceptance-criteria"],
    playbooks: [
      "planner-signup-page",
      "planner-dashboard-prd",
      "planner-admin-workflow",
      "planner-checkout-flow",
    ],
    guides: [
      "signup-feature",
      "auth-feature",
      "checkout-feature",
      "analytics-feature-guide",
    ],
  },
  {
    role: "디자이너",
    summary:
      "화면 패턴, 상태 표현, 정보 위계, 마이크로카피를 더 구체적인 구현 요청으로 바꾸는 데 초점을 둔 학습 순서입니다.",
    docs: ["modal", "empty-state", "microcopy", "responsive-design"],
    playbooks: [
      "designer-dashboard-polish",
      "designer-state-system",
      "designer-landing-page-hero",
      "designer-admin-ia",
    ],
    guides: [
      "admin-dashboard-feature",
      "onboarding-feature-guide",
      "notification-feature-guide",
      "file-upload-feature",
    ],
  },
  {
    role: "주니어 개발자",
    summary:
      "컴포넌트, 상태, 데이터, 인증, 성능을 AI IDE와 안정적으로 협업하는 구현 흐름으로 익히는 학습 순서입니다.",
    docs: ["component", "state-management", "routing", "data-fetching"],
    playbooks: [
      "junior-api-integration",
      "junior-form-submit-flow",
      "junior-auth-guard",
      "junior-list-performance",
    ],
    guides: [
      "signup-feature",
      "search-feature-guide",
      "list-performance-feature",
      "approval-feature-guide",
    ],
  },
];

export function getLearningTracks() {
  return LEARNING_TRACKS;
}
