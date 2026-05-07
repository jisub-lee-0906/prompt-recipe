export type ComparisonHubItem = {
  slug: string;
  title: string;
  summary: string;
  whenToUse: string;
  confusedWith: string;
  docs: string[];
};

export type ScenarioHubItem = {
  slug: string;
  title: string;
  summary: string;
  docs: string[];
  guides: string[];
  casebooks: string[];
  workouts: string[];
};

const COMPARISON_HUB_ITEMS: ComparisonHubItem[] = [
  {
    slug: "modal-dialog-drawer",
    title: "Modal vs Dialog vs Drawer",
    summary:
      "겹쳐 뜨는 UI를 어떤 이름으로 요청해야 하는지 구분하는 비교입니다.",
    whenToUse:
      "확인, 입력, 보조 작업처럼 화면 위 레이어가 필요할 때",
    confusedWith:
      "세 용어를 모두 팝업으로 묶어 부르는 경우",
    docs: ["modal", "dialog", "drawer"],
  },
  {
    slug: "toast-inline-feedback-modal",
    title: "Toast vs Inline Feedback vs Modal",
    summary:
      "즉각 피드백, 인라인 오류, 강한 확인 UI를 구분합니다.",
    whenToUse:
      "사용자에게 상태 변화를 알려줘야 할 때",
    confusedWith:
      "모든 피드백을 모달로 처리하는 경우",
    docs: ["toast", "error-state", "modal"],
  },
  {
    slug: "empty-loading-error",
    title: "Empty State vs Loading State vs Error State",
    summary:
      "비어 있음, 기다리는 중, 실패 상태를 분리해서 요청하기 위한 비교입니다.",
    whenToUse:
      "목록과 결과 화면의 상태를 설계할 때",
    confusedWith:
      "데이터가 없음과 오류를 같은 상태로 보는 경우",
    docs: ["empty-state", "loading-state", "error-state"],
  },
  {
    slug: "session-token-rbac",
    title: "Session vs Token vs RBAC",
    summary:
      "인증 상태 유지와 권한 제어를 어떤 층위에서 설명해야 하는지 구분합니다.",
    whenToUse:
      "로그인, 세션 만료, 권한 제어를 설명할 때",
    confusedWith:
      "토큰만 있으면 권한까지 해결된다고 착각하는 경우",
    docs: ["session", "token", "rbac"],
  },
  {
    slug: "api-endpoint-schema",
    title: "API vs Endpoint vs Request/Response Schema",
    summary:
      "백엔드 요구사항을 막연한 API가 아니라 계약 구조로 요청하기 위한 비교입니다.",
    whenToUse:
      "프론트와 백엔드의 계약을 설명할 때",
    confusedWith:
      "API 전체와 단일 엔드포인트를 같은 말로 쓰는 경우",
    docs: ["api", "endpoint", "request-response-schema"],
  },
  {
    slug: "ssr-csr-hydration",
    title: "SSR vs CSR vs Hydration",
    summary:
      "렌더링 전략과 초기 인터랙션 연결 과정을 구분합니다.",
    whenToUse:
      "초기 렌더링과 화면 전환 방식을 설명할 때",
    confusedWith:
      "SSR과 hydration을 같은 개념으로 보는 경우",
    docs: ["ssr", "csr", "hydration"],
  },
  {
    slug: "search-filter-sort",
    title: "Search Bar vs Filter Bar vs Sorting UI",
    summary:
      "검색어 입력, 조건 좁히기, 순서 바꾸기를 각각 구분합니다.",
    whenToUse:
      "탐색형 목록 화면을 설계할 때",
    confusedWith:
      "정렬과 필터를 모두 검색에 포함하는 경우",
    docs: ["search-bar", "filter-bar", "sorting-ui"],
  },
  {
    slug: "component-layout-page",
    title: "Component vs Layout vs Page",
    summary:
      "재사용 단위, 화면 구조, 최종 페이지를 어떤 단어로 구분해야 하는지 정리합니다.",
    whenToUse:
      "프론트 구조를 AI IDE에 설명할 때",
    confusedWith:
      "모든 UI를 컴포넌트 하나로 묶어서 부르는 경우",
    docs: ["component", "layout", "routing"],
  },
  {
    slug: "onboarding-tooltip-empty-state",
    title: "Onboarding vs Tooltip vs Empty State",
    summary:
      "첫 진입 학습, 짧은 보조 설명, 데이터 없음 안내를 구분합니다.",
    whenToUse:
      "사용자 안내 경험을 설계할 때",
    confusedWith:
      "온보딩을 빈 상태나 툴팁으로 대체하려는 경우",
    docs: ["onboarding", "tooltip", "empty-state"],
  },
  {
    slug: "success-acceptance",
    title: "Success Criteria vs Acceptance Criteria",
    summary:
      "기능의 목표와 구현 완료 조건을 구분합니다.",
    whenToUse:
      "기획 문서와 PRD를 AI IDE 요청으로 바꿀 때",
    confusedWith:
      "성공 기준과 테스트 조건을 같은 문장으로 쓰는 경우",
    docs: ["success-criteria", "acceptance-criteria"],
  },
  {
    slug: "fallback-retry-rollback",
    title: "Fallback vs Retry vs Rollback",
    summary:
      "실패 시 대체, 다시 시도, 되돌리기를 구분합니다.",
    whenToUse:
      "실패 복구 전략을 설명할 때",
    confusedWith:
      "모든 실패 복구를 재시도로만 해결하려는 경우",
    docs: ["fallback", "retry", "rollback"],
  },
  {
    slug: "pagination-infinite-scroll",
    title: "Pagination vs Infinite Scroll",
    summary:
      "긴 목록 탐색 방식을 어떤 경험으로 가져갈지 비교합니다.",
    whenToUse:
      "목록 성능과 탐색 경험을 설계할 때",
    confusedWith:
      "모든 목록에 무한 스크롤이 적합하다고 생각하는 경우",
    docs: ["pagination", "infinite-scroll-ui", "infinite-scroll-logic"],
  },
];

const SCENARIO_HUB_ITEMS: ScenarioHubItem[] = [
  {
    slug: "signup-flow",
    title: "회원가입을 만들 때",
    summary:
      "회원가입 화면, 검증, 성공/실패 상태, 가입 이후 흐름까지 한 번에 보는 경로입니다.",
    docs: ["form", "form-validation"],
    guides: ["signup-feature"],
    casebooks: ["signup-project"],
    workouts: ["signup-request-fix"],
  },
  {
    slug: "admin-approval",
    title: "관리자 화면을 만들 때",
    summary:
      "목록, 상세, 승인/반려, 운영 상태 반영까지 함께 보는 경로입니다.",
    docs: ["data-table", "confirmation-flow"],
    guides: ["approval-feature-guide"],
    casebooks: ["approval-project"],
    workouts: ["approval-flow-clarify"],
  },
  {
    slug: "search-feature",
    title: "검색 기능을 만들 때",
    summary:
      "검색 입력, API, 결과 상태, 정렬과 성능까지 모두 보는 경로입니다.",
    docs: ["search-bar", "search-api"],
    guides: ["search-feature-guide"],
    casebooks: ["search-project"],
    workouts: ["search-performance-request"],
  },
  {
    slug: "auth-flow",
    title: "로그인과 권한을 만들 때",
    summary:
      "로그인, 보호된 페이지, 세션 만료, 권한 부족을 함께 보는 경로입니다.",
    docs: ["auth-flow", "session"],
    guides: ["auth-feature"],
    casebooks: ["auth-project"],
    workouts: ["auth-edge-state"],
  },
  {
    slug: "checkout-flow",
    title: "결제를 붙일 때",
    summary:
      "결제 전환, 실패 복구, 완료 후 흐름까지 살펴보는 경로입니다.",
    docs: ["idempotency", "retry"],
    guides: ["checkout-feature"],
    casebooks: ["checkout-project"],
    workouts: ["success-criteria-writing"],
  },
  {
    slug: "upload-flow",
    title: "업로드 기능을 만들 때",
    summary:
      "파일 선택, 업로드 진행, 실패 재시도, 미리보기까지 묶어서 보는 경로입니다.",
    docs: ["file-upload", "error-state"],
    guides: ["file-upload-feature"],
    casebooks: ["file-upload-project"],
    workouts: ["upload-experience-upgrade"],
  },
  {
    slug: "settings-flow",
    title: "설정 화면을 만들 때",
    summary:
      "프로필 설정, 권한 정책, 위험 변경 보호를 함께 보는 경로입니다.",
    docs: ["permission-policy", "controlled-component"],
    guides: ["profile-settings-feature"],
    casebooks: ["settings-permission-project"],
    workouts: ["form-submit-finish"],
  },
];

export function getComparisonHubItems() {
  return COMPARISON_HUB_ITEMS;
}

export function getScenarioHubItems() {
  return SCENARIO_HUB_ITEMS;
}
