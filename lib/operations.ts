import type { DocRoleTarget } from "@/lib/mdx";

export type OperationLevel = "입문" | "중급";

export type OperationGuide = {
  slug: string;
  title: string;
  summary: string;
  level: OperationLevel;
  roleTargets: DocRoleTarget[];
  situation: string;
  goal: string;
  stages: string[];
  prompts: {
    title: string;
    body: string;
  }[];
  checklist: string[];
  failureSignals: string[];
  docs: string[];
  playbooks: string[];
  guides: string[];
  casebooks: string[];
  workouts: string[];
};

const OPERATION_GUIDES: OperationGuide[] = [
  {
    slug: "codebase-reading",
    title: "코드베이스 먼저 읽게 하는 운영 가이드",
    summary:
      "바로 구현부터 시키지 않고, 관련 파일과 기존 패턴을 먼저 읽게 해 AI IDE의 오판을 줄이는 가이드입니다.",
    level: "입문",
    roleTargets: ["기획자", "디자이너", "주니어 개발자"],
    situation:
      "새 기능이나 수정 작업을 요청해야 하지만 현재 코드 구조, 공통 컴포넌트, 기존 패턴을 아직 모르는 상태입니다.",
    goal:
      "AI IDE가 추측으로 새 구조를 만들지 않고, 현재 코드베이스의 실제 패턴을 먼저 요약하게 만듭니다.",
    stages: [
      "수정할 기능과 가장 가까운 화면, 컴포넌트, 데이터 로직 파일을 먼저 찾게 합니다.",
      "발견한 파일에서 공통 패턴, 재사용 중인 UI, 상태 관리 방식, API 호출 위치를 요약하게 합니다.",
      "수정 전에 바꾸면 안 되는 파일과 유지해야 하는 규칙을 분명히 적습니다.",
    ],
    prompts: [
      {
        title: "빠른 요청",
        body: "바로 수정하지 말고 이 기능과 관련된 파일부터 찾아줘. 현재 구조와 재사용 중인 패턴을 먼저 요약해줘.",
      },
      {
        title: "고급 요청",
        body: "아직 코드는 수정하지 말고, 이 기능과 가장 가까운 페이지, 컴포넌트, 상태 관리, API 호출 파일을 먼저 찾아줘. 각 파일이 어떤 역할인지 정리하고, 새 코드를 만들기보다 반드시 재사용해야 할 기존 패턴이 무엇인지 먼저 설명해줘.",
      },
    ],
    checklist: [
      "관련 파일 목록이 먼저 정리되었는가",
      "현재 패턴과 재사용 후보가 요약되었는가",
      "수정 금지 범위와 유지 규칙이 분명한가",
    ],
    failureSignals: [
      "AI가 기존 파일을 읽지 않고 새 구조나 새 컴포넌트를 임의로 만들기 시작한다.",
      "이미 있는 상태 관리 방식이나 디자인 시스템을 무시하고 별도 패턴을 제안한다.",
    ],
    docs: ["component", "layout", "routing", "state-management"],
    playbooks: ["designer-admin-ia", "junior-api-integration"],
    guides: ["admin-dashboard-feature", "profile-settings-feature"],
    casebooks: ["settings-permission-project", "analytics-dashboard-project"],
    workouts: ["codebase-reading-request", "api-integration-request", "form-submit-finish"],
  },
  {
    slug: "task-decomposition",
    title: "작업을 단계별로 쪼개는 운영 가이드",
    summary:
      "큰 요구를 한 번에 던지지 않고 분석, 구현, 검증으로 나눠 AI IDE를 더 안정적으로 운영하는 가이드입니다.",
    level: "입문",
    roleTargets: ["기획자", "디자이너", "주니어 개발자"],
    situation:
      "로그인, 검색, 관리자 화면처럼 요구 범위가 넓어서 한 번에 지시하면 누락과 과한 변경이 동시에 생기는 상황입니다.",
    goal:
      "큰 작업을 조사, 설계, 구현, 검증 단계로 분해해 결과 품질과 제어력을 함께 높입니다.",
    stages: [
      "먼저 조사 단계에서 현재 구조와 제약 조건을 읽게 합니다.",
      "다음으로 구현 범위를 화면, 상태, API, 테스트 단위로 분리합니다.",
      "마지막으로 단계별 완료 기준과 검증 항목을 같이 적어 한 번에 너무 많은 변경이 생기지 않게 합니다.",
    ],
    prompts: [
      {
        title: "빠른 요청",
        body: "이 작업을 바로 구현하지 말고 조사, 구현, 검증 단계로 나눠서 계획부터 제안해줘.",
      },
      {
        title: "고급 요청",
        body: "이 요구사항을 한 번에 처리하지 말고 1) 관련 코드 조사 2) 구현 범위 분해 3) 실제 수정 4) 테스트와 검증 순서로 나눠줘. 각 단계의 산출물과 멈춰서 확인해야 할 조건도 같이 적어줘.",
      },
    ],
    checklist: [
      "조사와 구현이 분리되었는가",
      "단계별 완료 기준이 있는가",
      "한 단계에서 바꿀 파일 범위가 과도하지 않은가",
    ],
    failureSignals: [
      "한 번의 요청에 화면, API, 상태, 테스트, 리팩터링이 전부 섞여 있다.",
      "AI가 중간 확인 없이 많은 파일을 동시에 바꾸려 한다.",
    ],
    docs: ["user-flow", "success-criteria", "acceptance-criteria", "component"],
    playbooks: ["planner-admin-workflow", "junior-form-submit-flow"],
    guides: ["approval-feature-guide", "signup-feature"],
    casebooks: ["approval-project", "signup-project"],
    workouts: ["signup-request-fix", "approval-flow-clarify", "codebase-reading-request"],
  },
  {
    slug: "verification-loop",
    title: "구현 뒤 검증 루프를 돌리는 운영 가이드",
    summary:
      "동작 확인에서 멈추지 않고 상태, 테스트, 반응형, 접근성까지 검증하게 만드는 가이드입니다.",
    level: "중급",
    roleTargets: ["기획자", "디자이너", "주니어 개발자"],
    situation:
      "겉으로는 구현이 끝난 것처럼 보이지만, 실제로는 빈 상태, 오류 상태, 모바일, 접근성, 회귀 위험이 남아 있는 상황입니다.",
    goal:
      "AI IDE가 코드 작성 이후 스스로 검증 항목을 점검하고, 남은 리스크를 명시하게 만듭니다.",
    stages: [
      "완료 기준과 실패 기준을 다시 읽고 어떤 상태를 직접 확인해야 하는지 나눕니다.",
      "정상 흐름 외에 로딩, 오류, 빈 상태, 권한 부족, 모바일, 접근성 점검을 별도로 지시합니다.",
      "실행한 테스트와 아직 하지 못한 확인 사항을 분리해서 보고하게 합니다.",
    ],
    prompts: [
      {
        title: "빠른 요청",
        body: "구현이 끝났다면 테스트와 함께 남은 리스크도 정리해줘. 정상 상태만 보지 말고 오류, 빈 상태, 모바일도 점검해줘.",
      },
      {
        title: "고급 요청",
        body: "수정이 끝났다면 구현 요약만 하지 말고 검증 루프까지 수행해줘. 실행한 테스트, 직접 확인한 상태, 아직 남은 리스크를 나눠서 정리하고, 로딩/오류/빈 상태/모바일/접근성 중 빠진 것이 없는지 점검해줘.",
      },
    ],
    checklist: [
      "정상 상태 외의 검증 항목이 따로 정리되었는가",
      "실행한 테스트와 미실행 항목이 구분되었는가",
      "남은 리스크가 구체적으로 적혀 있는가",
    ],
    failureSignals: [
      "완료 보고가 구현 요약만 있고 검증 결과가 없다.",
      "테스트를 안 돌렸는데도 안전하다고 단정한다.",
    ],
    docs: ["success-criteria", "acceptance-criteria", "loading-state", "error-state"],
    playbooks: ["planner-checkout-flow", "junior-auth-guard"],
    guides: ["checkout-feature", "auth-feature"],
    casebooks: ["checkout-project", "auth-project"],
    workouts: ["verification-loop-request", "success-criteria-writing", "auth-edge-state"],
  },
  {
    slug: "revision-requests",
    title: "1차 결과를 다시 고치게 하는 운영 가이드",
    summary:
      "AI가 70점짜리 결과를 냈을 때 누락, 과한 변경, 잘못된 가정을 짚어 2차 수정 요청으로 끌어올리는 가이드입니다.",
    level: "중급",
    roleTargets: ["기획자", "디자이너", "주니어 개발자"],
    situation:
      "초안은 나왔지만 상태가 빠져 있거나, 디자인 시스템을 깨거나, 기존 패턴과 어긋나는 등 재지시가 필요한 상황입니다.",
    goal:
      "막연한 '다시 해줘' 대신, 무엇이 빠졌고 무엇을 유지해야 하는지 분명한 수정 요청을 만들게 합니다.",
    stages: [
      "먼저 잘된 점과 유지해야 할 부분을 짧게 고정합니다.",
      "그 다음 누락된 상태, 깨진 패턴, 과도한 변경처럼 수정해야 할 항목을 분리합니다.",
      "마지막으로 파일 범위와 수정 후 다시 확인할 검증 기준을 함께 적습니다.",
    ],
    prompts: [
      {
        title: "빠른 요청",
        body: "방향은 맞는데 오류 상태와 모바일 조건이 빠졌어. 기존 구조는 유지하고 그 부분만 보강해줘.",
      },
      {
        title: "고급 요청",
        body: "지금 결과에서 유지해야 할 것은 현재 컴포넌트 구조와 디자인 시스템이야. 다만 빈 상태와 오류 상태가 빠졌고 모바일 CTA 우선순위도 깨져 있어. 기존 패턴은 유지한 채 관련 파일만 수정해서 그 두 부분을 보강해줘. 수정 후 어떤 상태를 확인했는지도 같이 알려줘.",
      },
    ],
    checklist: [
      "유지할 것과 바꿀 것이 분리되었는가",
      "누락된 조건이 구체적으로 적혀 있는가",
      "수정 범위와 재검증 기준이 함께 있는가",
    ],
    failureSignals: [
      "다시 해줘, 더 예쁘게 해줘처럼 문제 원인이 보이지 않는 요청만 남는다.",
      "수정 요청을 하면서 기존에 맞는 부분까지 다시 갈아엎게 만든다.",
    ],
    docs: ["empty-state", "error-state", "responsive-design", "design-system"],
    playbooks: ["designer-dashboard-polish", "junior-list-performance"],
    guides: ["admin-dashboard-feature", "list-performance-feature"],
    casebooks: ["analytics-dashboard-project", "list-performance-project"],
    workouts: ["scope-control-request", "state-system-request", "search-performance-request"],
  },
  {
    slug: "reviewing-ai-output",
    title: "AI 결과물을 리뷰하는 운영 가이드",
    summary:
      "구현물을 그대로 믿지 않고 요구사항 누락, 회귀 위험, 테스트 공백을 중심으로 검토하는 가이드입니다.",
    level: "중급",
    roleTargets: ["기획자", "디자이너", "주니어 개발자"],
    situation:
      "코드는 얼핏 그럴듯하지만 정말 요구사항을 충족하는지, 기존 동작을 깨지 않았는지 사람의 판단이 필요한 상황입니다.",
    goal:
      "AI IDE 산출물을 결과물 요약이 아니라 코드 리뷰 관점으로 읽게 만듭니다.",
    stages: [
      "요구사항과 실제 변경 범위를 먼저 대조합니다.",
      "그다음 회귀 가능성이 큰 상태, 권한, 데이터 계약, 반응형, 접근성 지점을 점검합니다.",
      "마지막으로 테스트 공백과 추가 확인이 필요한 부분을 남은 리스크로 정리합니다.",
    ],
    prompts: [
      {
        title: "빠른 요청",
        body: "이 변경을 코드 리뷰 관점으로 다시 봐줘. 요구사항 누락, 회귀 위험, 테스트 공백이 있으면 먼저 알려줘.",
      },
      {
        title: "고급 요청",
        body: "이 작업 결과를 구현 요약이 아니라 코드 리뷰 관점으로 검토해줘. 특히 요구사항 누락, 과도한 변경, 기존 패턴 위반, 숨은 회귀 위험, 테스트 부족 여부를 우선순위 순서대로 정리해줘. 괜찮다면 남은 리스크만 간단히 남겨줘.",
      },
    ],
    checklist: [
      "요구사항 누락 여부를 먼저 확인했는가",
      "회귀 위험과 테스트 공백을 따로 봤는가",
      "좋은 점보다 문제점을 먼저 식별했는가",
    ],
    failureSignals: [
      "겉으로 보기 좋다는 이유로 로직 누락이나 테스트 공백을 지나친다.",
      "변경 범위가 요구사항보다 훨씬 큰데도 통제 없이 받아들인다.",
    ],
    docs: ["acceptance-criteria", "edge-case", "rollback", "analytics-event"],
    playbooks: ["planner-dashboard-prd", "junior-auth-guard"],
    guides: ["analytics-feature-guide", "approval-feature-guide"],
    casebooks: ["analytics-dashboard-project", "approval-project"],
    workouts: ["review-findings-request", "api-requirements-spec", "auth-edge-state"],
  },
  {
    slug: "failure-control",
    title: "AI가 빗나갔을 때 통제하는 운영 가이드",
    summary:
      "범위를 벗어나거나, 파일을 과하게 수정하거나, 확신 없는 추측을 할 때 작업을 다시 좁히는 가이드입니다.",
    level: "중급",
    roleTargets: ["기획자", "디자이너", "주니어 개발자"],
    situation:
      "AI IDE가 요구하지 않은 리팩터링을 하거나, 기존 패턴을 깨거나, 모르는 부분을 추측으로 채워 넣는 상황입니다.",
    goal:
      "작업 범위, 수정 금지 조건, 가정 확인 절차를 분명히 해서 AI IDE를 다시 통제 가능한 상태로 되돌립니다.",
    stages: [
      "문제가 된 행동을 추상적으로 말하지 말고, 어떤 범위를 넘었는지 먼저 짚습니다.",
      "이후에는 수정 가능한 파일, 건드리면 안 되는 영역, 확신 없을 때 멈춰야 하는 조건을 다시 지정합니다.",
      "마지막으로 재시도 전에 계획 또는 영향 범위 요약을 먼저 받습니다.",
    ],
    prompts: [
      {
        title: "빠른 요청",
        body: "범위를 너무 넓게 바꿨어. 지금은 이 파일만 수정하고 다른 구조 변경은 하지 마. 먼저 영향 범위부터 다시 정리해줘.",
      },
      {
        title: "고급 요청",
        body: "지금 변경은 요구 범위를 넘었어. 이 작업에서는 관련 화면 파일과 연결된 상태 로직만 수정하고, 공통 디자인 시스템과 라우팅 구조는 건드리지 마. 확신 없는 부분은 추측해서 구현하지 말고 먼저 가정 목록을 적어줘. 바로 수정하지 말고 영향 범위와 수정 계획부터 다시 보여줘.",
      },
    ],
    checklist: [
      "수정 가능한 범위와 금지 범위가 분리되었는가",
      "확신 없을 때 멈추는 조건이 있는가",
      "재시도 전에 영향 범위 확인을 받는가",
    ],
    failureSignals: [
      "요구하지 않은 리팩터링이나 구조 변경이 반복된다.",
      "모르는 API나 데이터 계약을 추측으로 채워 넣는다.",
    ],
    docs: ["feature-flag", "rollback", "permission-policy", "api"],
    playbooks: ["planner-admin-workflow", "junior-api-integration"],
    guides: ["approval-feature-guide", "file-upload-feature"],
    casebooks: ["settings-permission-project", "file-upload-project"],
    workouts: ["scope-control-request", "upload-experience-upgrade", "api-integration-request"],
  },
];

export function getOperationGuides() {
  return OPERATION_GUIDES;
}

export function getOperationGuideBySlug(slug: string) {
  return OPERATION_GUIDES.find((guide) => guide.slug === slug) ?? null;
}

export function getRelatedOperationGuides(slug: string, limit = 3) {
  const current = getOperationGuideBySlug(slug);

  if (!current) {
    return [];
  }

  const related = OPERATION_GUIDES.filter(
    (guide) =>
      guide.slug !== slug &&
      guide.roleTargets.some((role) => current.roleTargets.includes(role)),
  );

  return related.slice(0, limit);
}
