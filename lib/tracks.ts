import type { DocRoleTarget } from "@/lib/mdx";

export type LearningTrack = {
  role: DocRoleTarget;
  summary: string;
  docs: string[];
  playbooks: string[];
  guides: string[];
  casebooks: string[];
  workouts: string[];
};

export const LEARNING_TRACKS: LearningTrack[] = [
  {
    role: "기획자",
    summary:
      "요구사항과 성공 기준을 구현 가능한 문장으로 바꾸고, 기능 흐름을 AI IDE에 끝까지 전달하는 학습 경로입니다.",
    docs: [
      "user-flow",
      "information-architecture",
      "success-criteria",
      "acceptance-criteria",
    ],
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
    casebooks: ["signup-project", "checkout-project", "approval-project"],
    workouts: [
      "signup-request-fix",
      "approval-flow-clarify",
      "success-criteria-writing",
      "api-requirements-spec",
    ],
  },
  {
    role: "디자이너",
    summary:
      "화면 구조, 상태 시스템, 마이크로카피, 탐색 경험을 AI IDE가 구현할 수 있는 요청으로 바꾸는 학습 경로입니다.",
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
    casebooks: [
      "signup-project",
      "file-upload-project",
      "checkout-project",
    ],
    workouts: [
      "state-system-request",
      "microcopy-improve",
      "landing-hero-brief",
      "upload-experience-upgrade",
    ],
  },
  {
    role: "주니어 개발자",
    summary:
      "컴포넌트, 상태, API, 라우팅, 예외 상태를 AI IDE와 안정적으로 구현하는 방법을 익히는 학습 경로입니다.",
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
    casebooks: ["auth-project", "search-project", "file-upload-project"],
    workouts: [
      "api-integration-request",
      "auth-edge-state",
      "search-performance-request",
      "form-submit-finish",
    ],
  },
];

export function getLearningTracks() {
  return LEARNING_TRACKS;
}
