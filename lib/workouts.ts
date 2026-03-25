export type WorkoutRole = "기획자" | "디자이너" | "주니어 개발자";
export type WorkoutLevel = "입문" | "중급";

export type Workout = {
  slug: string;
  title: string;
  role: WorkoutRole;
  level: WorkoutLevel;
  problem: string;
  badPrompt: string;
  targetOutcome: string;
  goodPrompt: string;
  checkpoints: string[];
  docs: string[];
  playbooks: string[];
  guides: string[];
  casebooks: string[];
  nextWorkouts?: string[];
};

const WORKOUTS: Workout[] = [
  {
    slug: "signup-request-fix",
    title: "회원가입 요구사항 개선 실습",
    role: "기획자",
    level: "입문",
    problem:
      "회원가입 기능을 요청해야 하는데 요구사항이 너무 짧고 모호합니다.",
    badPrompt: "회원가입 페이지 만들어줘.",
    targetOutcome:
      "입력 항목, 검증, 상태, 가입 이후 흐름이 드러나는 요청으로 바꾸는 것이 목표입니다.",
    goodPrompt:
      "회원가입 기능을 만들어줘. 이름, 이메일, 비밀번호, 비밀번호 확인 필드를 포함하고 입력 오류, 제출 중 상태, 가입 성공과 실패 상태를 각각 보여줘. 가입이 완료되면 로그인 또는 다음 단계로 이동할 수 있게 구성해줘.",
    checkpoints: [
      "입력 필드와 검증 조건이 보이는가",
      "성공과 실패 상태가 분리되어 있는가",
      "가입 이후의 다음 행동이 포함되어 있는가",
    ],
    docs: ["form", "form-validation", "acceptance-criteria"],
    playbooks: ["planner-signup-page"],
    guides: ["signup-feature"],
    casebooks: ["signup-project"],
    nextWorkouts: ["success-criteria-writing"],
  },
  {
    slug: "approval-flow-clarify",
    title: "관리자 승인 흐름 명확화 실습",
    role: "기획자",
    level: "중급",
    problem:
      "관리자 승인 기능을 요청했지만 처리 흐름과 반려 조건이 빠져 있습니다.",
    badPrompt: "관리자 페이지에서 승인/반려 하게 해줘.",
    targetOutcome:
      "목록, 상세, 승인, 반려 사유, 처리 후 반영까지 포함하는 요청으로 구체화하는 것이 목표입니다.",
    goodPrompt:
      "관리자 승인 기능을 만들어줘. 승인 대기 목록, 요청 상세, 승인과 반려 액션, 반려 사유 입력, 처리 후 목록 상태 반영까지 포함해줘.",
    checkpoints: [
      "목록과 상세가 분리되어 있는가",
      "반려 사유 입력이 포함되어 있는가",
      "처리 후 상태 반영이 포함되어 있는가",
    ],
    docs: ["confirmation-flow", "edge-case", "success-criteria"],
    playbooks: ["planner-admin-workflow"],
    guides: ["approval-feature-guide"],
    casebooks: ["approval-project"],
    nextWorkouts: ["api-requirements-spec"],
  },
  {
    slug: "success-criteria-writing",
    title: "성공 기준 쓰기 실습",
    role: "기획자",
    level: "입문",
    problem:
      "기능 설명은 있지만 무엇을 성공이라고 볼지 기준이 없습니다.",
    badPrompt: "결제가 잘 되게 만들어줘.",
    targetOutcome:
      "사용자 관찰 기준과 테스트 가능한 문장으로 성공 기준을 쓰는 것이 목표입니다.",
    goodPrompt:
      "결제 기능을 만들어줘. 결제 진행 중에는 중복 제출이 되지 않고, 결제 실패 시 다시 시도하거나 다른 결제 수단을 고를 수 있는 CTA가 보여야 해. 결제 완료 후에는 주문 내역으로 이동하는 버튼을 보여줘.",
    checkpoints: [
      "테스트 가능한 문장인가",
      "실패 기준도 포함하는가",
      "사용자 행동 기준이 보이는가",
    ],
    docs: ["success-criteria", "acceptance-criteria"],
    playbooks: ["planner-checkout-flow"],
    guides: ["checkout-feature"],
    casebooks: ["checkout-project"],
  },
  {
    slug: "api-requirements-spec",
    title: "API 요구사항 구체화 실습",
    role: "기획자",
    level: "중급",
    problem:
      "백엔드가 필요한 기능인데 어떤 요청과 응답이 필요한지 설명이 부족합니다.",
    badPrompt: "검색 API 붙여줘.",
    targetOutcome:
      "입력 파라미터, 응답 구조, 오류 상태까지 포함하는 요청으로 바꾸는 것이 목표입니다.",
    goodPrompt:
      "검색 기능을 위해 검색 API를 연결해줘. 검색어, 정렬, 필터를 파라미터로 보내고 결과 목록, 총 개수, 빈 결과 상태를 처리할 수 있는 응답 구조를 가정해줘. 오류 응답 시에는 사용자에게 친화적인 메시지를 보여줘.",
    checkpoints: [
      "입력 파라미터가 보이는가",
      "응답 구조가 제시되는가",
      "오류 상태가 포함되는가",
    ],
    docs: ["api", "endpoint", "request-response-schema"],
    playbooks: ["planner-dashboard-prd"],
    guides: ["search-feature-guide"],
    casebooks: ["search-project"],
  },
  {
    slug: "state-system-request",
    title: "상태 시스템 요청 고도화 실습",
    role: "디자이너",
    level: "입문",
    problem:
      "디자이너가 상태 표현을 요청했지만 정상 상태만 설명하고 있습니다.",
    badPrompt: "알림 요소들 정리해줘.",
    targetOutcome:
      "기본, 로딩, 성공, 실패, 빈 상태까지 포함하는 상태 시스템 요청으로 바꾸는 것이 목표입니다.",
    goodPrompt:
      "알림 경험을 정리해줘. 읽지 않음 상태, 읽음 상태, 빈 상태, 로딩 상태, 오류 상태를 구분해서 카드와 목록에 일관되게 반영해줘.",
    checkpoints: [
      "여러 상태가 구분되는가",
      "목록과 아이템 단위 모두 고려되는가",
      "일관된 표현을 요구하는가",
    ],
    docs: ["loading-state", "error-state", "empty-state"],
    playbooks: ["designer-state-system"],
    guides: ["notification-feature-guide"],
    casebooks: ["notification-project"],
  },
  {
    slug: "microcopy-improve",
    title: "마이크로카피 개선 실습",
    role: "디자이너",
    level: "입문",
    problem:
      "화면은 보이지만 버튼과 안내 문구가 모호합니다.",
    badPrompt: "문구 좀 예쁘게 바꿔줘.",
    targetOutcome:
      "행동 유도와 상태 안내가 분명한 마이크로카피 요청으로 바꾸는 것이 목표입니다.",
    goodPrompt:
      "알림과 업로드 화면의 마이크로카피를 다듬어줘. 사용자가 현재 상태를 바로 이해할 수 있게 버튼 문구, 빈 상태 문구, 실패 문구를 행동 중심으로 바꿔줘.",
    checkpoints: [
      "어느 화면의 문구인지 보이는가",
      "행동 유도가 분명한가",
      "상태별 문구를 요청하는가",
    ],
    docs: ["microcopy", "call-to-action"],
    playbooks: ["designer-dashboard-polish"],
    guides: ["notification-feature-guide", "file-upload-feature"],
    casebooks: ["notification-project", "file-upload-project"],
  },
  {
    slug: "landing-hero-brief",
    title: "랜딩 히어로 요청 개선 실습",
    role: "디자이너",
    level: "입문",
    problem:
      "랜딩 첫 화면을 요청했지만 메시지 우선순위와 CTA가 빠져 있습니다.",
    badPrompt: "랜딩 페이지 예쁘게 만들어줘.",
    targetOutcome:
      "핵심 메시지, 보조 설명, CTA까지 포함한 구조화된 요청으로 바꾸는 것이 목표입니다.",
    goodPrompt:
      "랜딩 페이지의 히어로 섹션을 만들어줘. 첫 화면에서 서비스 가치가 한 문장으로 보이고, 보조 설명과 주요 CTA, 보조 CTA가 명확히 보이게 해줘. 모바일에서도 메시지 우선순위가 유지되게 해줘.",
    checkpoints: [
      "메시지 우선순위가 보이는가",
      "CTA 종류가 명시되는가",
      "모바일 조건이 포함되는가",
    ],
    docs: ["hero-section", "call-to-action"],
    playbooks: ["designer-landing-page-hero"],
    guides: ["checkout-feature"],
    casebooks: ["checkout-project", "onboarding-project"],
  },
  {
    slug: "upload-experience-upgrade",
    title: "업로드 경험 보강 실습",
    role: "디자이너",
    level: "중급",
    problem:
      "업로드 기능을 요청했지만 실패와 진행 상태가 빠져 있습니다.",
    badPrompt: "파일 업로드 UX 정리해줘.",
    targetOutcome:
      "선택, 진행 중, 완료, 실패까지 포함하는 경험 설계 요청으로 확장하는 것이 목표입니다.",
    goodPrompt:
      "파일 업로드 UX를 정리해줘. 파일 선택 전 안내, 업로드 중 진행률, 업로드 완료 후 미리보기, 실패 시 재시도까지 모두 포함하고 모바일에서도 자연스럽게 보이게 해줘.",
    checkpoints: [
      "업로드 전, 중, 후 상태가 보이는가",
      "실패 재시도가 포함되는가",
      "모바일 조건이 있는가",
    ],
    docs: ["file-upload", "loading-state", "error-state"],
    playbooks: ["designer-state-system"],
    guides: ["file-upload-feature"],
    casebooks: ["file-upload-project"],
  },
  {
    slug: "api-integration-request",
    title: "API 연동 요청 구체화 실습",
    role: "주니어 개발자",
    level: "입문",
    problem:
      "프론트 구현 요청인데 API 응답 처리와 상태가 빠져 있습니다.",
    badPrompt: "API 연결해서 화면에 뿌려줘.",
    targetOutcome:
      "로딩, 오류, 빈 데이터, 성공 상태를 포함하는 구현 요청으로 바꾸는 것이 목표입니다.",
    goodPrompt:
      "목록 화면에 API를 연결해줘. 로딩 상태, 오류 상태, 데이터가 없을 때의 빈 상태, 성공 상태를 구분해서 보여주고 응답이 느릴 때는 스켈레톤 UI를 표시해줘.",
    checkpoints: [
      "여러 상태를 명시하는가",
      "응답 지연 조건이 있는가",
      "화면에 어떻게 반영하는지 말하는가",
    ],
    docs: ["data-fetching", "api-error-response", "skeleton"],
    playbooks: ["junior-api-integration"],
    guides: ["search-feature-guide"],
    casebooks: ["search-project"],
  },
  {
    slug: "auth-edge-state",
    title: "인증 예외 상태 추가 실습",
    role: "주니어 개발자",
    level: "중급",
    problem:
      "로그인 기능은 구현했지만 세션 만료와 권한 부족이 빠져 있습니다.",
    badPrompt: "로그인 막아줘.",
    targetOutcome:
      "비로그인, 세션 만료, 권한 부족을 구분하는 구현 요청으로 바꾸는 것이 목표입니다.",
    goodPrompt:
      "로그인 보호 기능을 구현해줘. 비로그인 접근, 세션 만료, 권한 부족을 각각 다른 화면과 메시지로 처리하고 다시 로그인하거나 이전으로 돌아갈 수 있게 해줘.",
    checkpoints: [
      "세 가지 예외 상태가 분리되는가",
      "각 상태의 다음 행동이 있는가",
      "사용자 메시지가 포함되는가",
    ],
    docs: ["auth-flow", "session", "rbac"],
    playbooks: ["junior-auth-guard"],
    guides: ["auth-feature"],
    casebooks: ["auth-project", "settings-permission-project"],
  },
  {
    slug: "search-performance-request",
    title: "검색 성능 요구 추가 실습",
    role: "주니어 개발자",
    level: "중급",
    problem:
      "검색 기능을 만들었지만 입력 최적화와 성능 조건이 빠져 있습니다.",
    badPrompt: "검색 기능 만들어줘.",
    targetOutcome:
      "디바운스, 캐시, 느린 응답 대응을 포함하는 요청으로 바꾸는 것이 목표입니다.",
    goodPrompt:
      "검색 기능을 만들어줘. 입력이 빠를 때는 디바운스를 적용하고, 최근 결과는 캐시해서 불필요한 재요청을 줄여줘. 응답이 느릴 때는 로딩 상태와 스켈레톤을 보여줘.",
    checkpoints: [
      "디바운스가 포함되는가",
      "캐시 또는 재요청 감소 조건이 있는가",
      "느린 응답 대응이 있는가",
    ],
    docs: ["debounce", "frontend-cache", "search-api"],
    playbooks: ["junior-list-performance"],
    guides: ["search-feature-guide", "list-performance-feature"],
    casebooks: ["search-project", "list-performance-project"],
  },
  {
    slug: "form-submit-finish",
    title: "폼 제출 흐름 완성 실습",
    role: "주니어 개발자",
    level: "입문",
    problem:
      "폼은 보이지만 제출 이후 상태와 완료 흐름이 빠져 있습니다.",
    badPrompt: "폼 제출 기능 넣어줘.",
    targetOutcome:
      "검증, 제출 중, 성공, 실패, 다음 행동까지 포함하는 요청으로 바꾸는 것이 목표입니다.",
    goodPrompt:
      "폼 제출 기능을 만들어줘. 입력 검증, 제출 중 버튼 비활성화, 성공 메시지, 실패 메시지, 제출 완료 후 다음 행동 CTA까지 포함해줘.",
    checkpoints: [
      "검증과 제출 상태가 분리되는가",
      "성공과 실패가 모두 있는가",
      "다음 행동 CTA가 있는가",
    ],
    docs: ["form", "form-validation", "toast"],
    playbooks: ["junior-form-submit-flow"],
    guides: ["signup-feature", "profile-settings-feature"],
    casebooks: ["signup-project", "profile-settings-project", "file-upload-project"],
  },
];

export function getWorkouts() {
  return WORKOUTS;
}

export function getWorkoutBySlug(slug: string) {
  return WORKOUTS.find((workout) => workout.slug === slug) ?? null;
}

export function getRelatedWorkouts(slug: string, limit = 3) {
  const current = getWorkoutBySlug(slug);

  if (!current) {
    return [];
  }

  const explicit = (current.nextWorkouts ?? [])
    .map((nextSlug) => getWorkoutBySlug(nextSlug))
    .filter((item): item is Workout => item !== null);

  const sameRole = WORKOUTS.filter(
    (workout) => workout.role === current.role && workout.slug !== current.slug,
  );

  const unique = new Map<string, Workout>();

  for (const workout of [...explicit, ...sameRole]) {
    if (!unique.has(workout.slug)) {
      unique.set(workout.slug, workout);
    }
  }

  return [...unique.values()].slice(0, limit);
}
