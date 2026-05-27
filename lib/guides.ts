export type FeatureGuideLevel = "입문" | "중급";

export type FeatureGuide = {
  slug: string;
  title: string;
  summary: string;
  level: FeatureGuideLevel;
  goal: string;
  stages: string[];
  docs: string[];
  playbooks: string[];
  prompts: {
    title: string;
    body: string;
  }[];
  checklist: string[];
};

export const FEATURE_GUIDES: FeatureGuide[] = [
  {
    slug: "signup-feature",
    title: "회원가입 기능 가이드",
    summary: "입력, 검증, 제출 상태, 성공과 실패 흐름을 한 번에 정리하는 가이드입니다.",
    level: "입문",
    goal: "회원가입을 화면, 상태, API까지 포함한 기능 단위로 요청합니다.",
    stages: [
      "가입 흐름에 꼭 필요한 입력 필드와 가입 직후 다음 행동까지 함께 정의합니다.",
      "필드별 검증 규칙과 에러 메시지를 단순 경고가 아니라 다음 행동을 안내하는 문장으로 정리합니다.",
      "제출 중, 성공, 실패 상태를 각각 분리하고 완료 뒤 어디로 이동할지까지 설계합니다.",
    ],
    docs: ["form", "form-validation", "success-criteria", "api", "loading-state"],
    playbooks: ["planner-signup-page", "junior-form-submit-flow"],
    prompts: [
      {
        title: "빠른 요청",
        body: "회원가입 기능을 만들어줘. 이메일, 비밀번호, 비밀번호 확인 필드가 필요하고, 검증과 제출 상태도 포함해줘.",
      },
      {
        title: "고급 요청",
        body: "회원가입 기능 전체를 구현해줘. 필드별 검증 메시지, 제출 버튼 로딩 상태, 성공 후 안내와 실패 시 재시도 흐름을 포함하고 모바일과 접근성도 함께 고려해줘.",
      },
    ],
    checklist: [
      "필수 필드와 검증 규칙이 있는가",
      "제출 상태와 실패 피드백이 있는가",
      "가입 성공 뒤 다음 행동이 정의되어 있는가",
    ],
  },
  {
    slug: "auth-feature",
    title: "로그인·권한 기능 가이드",
    summary: "로그인, 보호된 페이지, 세션 만료, 권한 부족 상태를 함께 보는 가이드입니다.",
    level: "중급",
    goal: "인증 기능을 성공 흐름만이 아니라 예외 상태까지 포함한 요청으로 바꿉니다.",
    stages: ["로그인 성공 흐름 정의", "비로그인과 만료 상태 정의", "권한 부족과 권한별 노출 규칙 정의"],
    docs: ["auth-flow", "session", "token", "rbac", "permission-policy"],
    playbooks: ["auth-flow-playbook", "junior-auth-guard"],
    prompts: [
      {
        title: "빠른 요청",
        body: "로그인 기능과 보호된 페이지 흐름을 만들어줘. 비로그인 사용자는 로그인 페이지로 보내고, 권한이 없으면 접근 불가 화면을 보여줘.",
      },
      {
        title: "고급 요청",
        body: "로그인, 보호된 페이지, 세션 만료, 권한 부족 상태를 모두 포함한 인증 흐름을 구현해줘. 권한별 메뉴 노출 차이와 재로그인 흐름도 정리해줘.",
      },
    ],
    checklist: [
      "비로그인, 만료, 권한 부족 상태가 분리되어 있는가",
      "보호된 페이지 규칙이 있는가",
      "권한별 차이가 포함되어 있는가",
    ],
  },
  {
    slug: "search-feature-guide",
    title: "검색 기능 가이드",
    summary: "검색 입력 UI, 검색 API, 결과 상태, 정렬과 인덱스를 함께 보는 가이드입니다.",
    level: "중급",
    goal: "검색을 입력창 하나가 아니라 경험 전체로 요청합니다.",
    stages: [
      "검색 입력 방식과 결과 카드에서 먼저 보여줘야 할 정보를 함께 설계합니다.",
      "검색 API, 정렬, 필터 기준을 정해 사용자가 원하는 결과를 좁혀 갈 수 있게 합니다.",
      "디바운스, 느린 응답 대응, 모바일 배치까지 포함해 실제 사용 경험을 완성합니다.",
    ],
    docs: ["search-bar", "search-api", "search-index", "debounce", "empty-state"],
    playbooks: ["search-feature-playbook", "junior-list-performance"],
    prompts: [
      {
        title: "빠른 요청",
        body: "검색 기능을 만들어줘. 입력창과 결과 목록이 필요하고, 결과가 없으면 안내 문구를 보여줘.",
      },
      {
        title: "고급 요청",
        body: "디바운스가 적용된 검색 입력, 로딩 상태, 결과 없음 상태, 검색 API와 정렬 기준까지 포함한 검색 기능 전체를 구현해줘.",
      },
    ],
    checklist: [
      "입력과 결과 상태가 함께 있는가",
      "정렬과 인덱스 기준이 정의되어 있는가",
      "모바일 검색 경험이 포함되는가",
    ],
  },
  {
    slug: "admin-dashboard-feature",
    title: "관리자 대시보드 기능 가이드",
    summary: "KPI, 필터, 목록, 운영 상태를 함께 보는 관리자 대시보드 가이드입니다.",
    level: "중급",
    goal: "운영 화면을 카드 모음이 아닌 목적 중심 구조로 요청합니다.",
    stages: ["핵심 KPI 정의", "필터와 목록 구조 정리", "운영 상태 화면 설계"],
    docs: ["data-table", "filter-bar", "sorting-ui", "pagination", "microcopy"],
    playbooks: ["designer-dashboard-polish", "admin-dashboard-playbook", "planner-dashboard-prd"],
    prompts: [
      {
        title: "빠른 요청",
        body: "관리자 대시보드를 만들어줘. 핵심 지표, 필터, 목록이 함께 보이면 좋겠어.",
      },
      {
        title: "고급 요청",
        body: "운영자가 매일 보는 대시보드를 설계해줘. KPI 카드, 필터, 목록, 로딩·빈 상태·에러 상태를 포함하고 모바일에서도 자연스럽게 보이게 해줘.",
      },
    ],
    checklist: [
      "핵심 지표와 목록 우선순위가 보이는가",
      "필터와 정렬이 포함되는가",
      "상태 화면이 함께 정의되는가",
    ],
  },
  {
    slug: "checkout-feature",
    title: "결제 전환 기능 가이드",
    summary: "상품 확인, 결제 수단 선택, 실패 복구, 완료 화면까지 포함한 가이드입니다.",
    level: "중급",
    goal: "결제 기능을 전환 흐름과 실패 복구까지 포함한 요청으로 바꿉니다.",
    stages: ["결제 진입 구조 정리", "결제 제출과 실패 복구 설계", "완료 뒤 행동 정의"],
    docs: ["call-to-action", "failure-scenario", "fallback", "microcopy", "success-criteria"],
    playbooks: ["planner-checkout-flow"],
    prompts: [
      {
        title: "빠른 요청",
        body: "결제 기능을 만들어줘. 상품 확인, 결제 버튼, 실패 시 다시 시도하는 흐름이 필요해.",
      },
      {
        title: "고급 요청",
        body: "결제 수단 선택, 로딩, 실패 복구, 완료 화면과 다음 행동 안내까지 포함한 결제 전환 기능을 설계해줘.",
      },
    ],
    checklist: [
      "전환 흐름과 실패 복구가 정의되었는가",
      "완료 화면과 다음 행동이 있는가",
      "CTA 우선순위가 포함되는가",
    ],
  },
  {
    slug: "list-performance-feature",
    title: "긴 목록 성능 가이드",
    summary: "무한 스크롤, 캐시, 디바운스, 스켈레톤을 함께 보는 긴 목록 성능 가이드입니다.",
    level: "중급",
    goal: "긴 목록을 속도 문제뿐 아니라 UX 문제까지 포함해 요청합니다.",
    stages: ["초기 로딩 설계", "추가 로딩과 검색 최적화", "캐시와 빈 상태 정의"],
    docs: ["infinite-scroll-ui", "infinite-scroll-logic", "frontend-cache", "debounce", "skeleton"],
    playbooks: ["junior-list-performance"],
    prompts: [
      {
        title: "빠른 요청",
        body: "긴 목록 페이지를 부드럽게 동작하게 만들어줘. 스크롤하면 더 불러오고 검색도 빨리 반응했으면 좋겠어.",
      },
      {
        title: "고급 요청",
        body: "초기 로딩은 스켈레톤, 하단 도달 시 추가 로딩, 검색 입력 디바운스, 캐시 활용, 결과 없음 상태까지 포함한 긴 목록 경험을 설계해줘.",
      },
    ],
    checklist: [
      "초기 로딩과 추가 로딩이 분리되었는가",
      "검색 디바운스가 포함되는가",
      "캐시와 결과 없음 상태가 있는가",
    ],
  },
  {
    slug: "profile-settings-feature",
    title: "프로필 설정 기능 가이드",
    summary: "개인 정보 수정과 저장 상태, 성공·실패 피드백을 함께 보는 가이드입니다.",
    level: "입문",
    goal: "설정 화면을 단순 폼이 아니라 저장 경험 전체로 요청합니다.",
    stages: ["수정 가능한 필드 정의", "저장 상태와 피드백 설계", "실패 복구 흐름 정리"],
    docs: ["form", "controlled-component", "toast", "success-criteria", "auth-flow"],
    playbooks: ["junior-form-submit-flow", "auth-flow-playbook"],
    prompts: [
      {
        title: "빠른 요청",
        body: "프로필 설정 화면을 만들어줘. 이름과 이메일을 수정하고 저장할 수 있으면 좋겠어.",
      },
      {
        title: "고급 요청",
        body: "프로필 설정 기능을 구현해줘. 저장 중 로딩 상태, 성공 토스트, 실패 인라인 에러, 현재 사용자 정보 로딩까지 포함해줘.",
      },
    ],
    checklist: [
      "수정 가능한 필드가 정의되는가",
      "저장 상태와 성공 피드백이 있는가",
      "실패 시 복구 흐름이 있는가",
    ],
  },
  {
    slug: "file-upload-feature",
    title: "파일 업로드 기능 가이드",
    summary: "파일 선택, 진행 상태, 미리보기, 실패 재시도를 함께 보는 가이드입니다.",
    level: "중급",
    goal: "업로드 기능을 상태가 있는 완성형 기능으로 요청합니다.",
    stages: ["업로드 입력 방식 정리", "진행 상태와 미리보기 설계", "실패 복구와 제한 조건 정의"],
    docs: ["file-upload", "form", "loading-state", "error-state", "api"],
    playbooks: ["junior-form-submit-flow", "designer-state-system"],
    prompts: [
      {
        title: "빠른 요청",
        body: "이미지 업로드 기능을 만들어줘. 업로드 중 상태와 실패 재시도도 있으면 좋겠어.",
      },
      {
        title: "고급 요청",
        body: "파일 선택 또는 드래그 앤 드롭, 업로드 진행 상태, 완료 뒤 미리보기, 실패 시 재시도와 확장자·용량 제한까지 포함한 업로드 기능을 설계해줘.",
      },
    ],
    checklist: [
      "파일 제한 조건이 정의되는가",
      "진행 상태와 미리보기가 있는가",
      "실패 재시도가 포함되는가",
    ],
  },
  {
    slug: "onboarding-feature-guide",
    title: "온보딩 기능 가이드",
    summary: "첫 방문 사용자의 적응 흐름과 다음 행동 유도를 함께 보는 가이드입니다.",
    level: "입문",
    goal: "온보딩을 단순 안내 화면이 아니라 적응 흐름으로 요청합니다.",
    stages: ["첫 진입 메시지 정의", "초기 행동 유도", "이탈 방지와 다음 단계 안내"],
    docs: ["onboarding", "user-flow", "call-to-action", "microcopy", "analytics-event"],
    playbooks: ["planner-signup-page", "designer-landing-page-hero"],
    prompts: [
      {
        title: "빠른 요청",
        body: "첫 방문 사용자를 위한 온보딩 흐름을 만들어줘. 서비스 가치를 빠르게 이해하게 하고 싶어.",
      },
      {
        title: "고급 요청",
        body: "첫 방문 사용자가 서비스 가치와 첫 행동을 빠르게 이해할 수 있는 온보딩 흐름을 설계해줘. 단계별 CTA와 이탈 방지 문구, 추적 이벤트도 포함해줘.",
      },
    ],
    checklist: [
      "첫 행동이 명확한가",
      "단계별 CTA가 있는가",
      "측정 이벤트가 포함되는가",
    ],
  },
  {
    slug: "notification-feature-guide",
    title: "알림 기능 가이드",
    summary: "토스트, 인박스형 알림, 실패 메시지를 함께 보는 알림 기능 가이드입니다.",
    level: "중급",
    goal: "알림을 메시지 하나가 아니라 피드백 시스템으로 요청합니다.",
    stages: ["이벤트와 알림 종류 정의", "즉시 피드백과 누적 알림 분리", "실패 알림과 재시도 설계"],
    docs: ["toast", "webhook", "retry", "microcopy", "api-error-response"],
    playbooks: ["designer-state-system", "junior-api-integration"],
    prompts: [
      {
        title: "빠른 요청",
        body: "사용자 행동 뒤 피드백을 보여주는 알림 기능을 만들어줘. 성공과 실패를 구분해줘.",
      },
      {
        title: "고급 요청",
        body: "즉시 사라지는 토스트와 누적되는 인박스 알림을 나눠 설계해줘. 실패 알림은 재시도 CTA를 포함하고, 서버 이벤트와 연결되는 구조도 함께 정리해줘.",
      },
    ],
    checklist: [
      "즉시 알림과 누적 알림이 구분되는가",
      "실패 알림에 재시도 행동이 있는가",
      "알림 문구 규칙이 정의되는가",
    ],
  },
  {
    slug: "approval-feature-guide",
    title: "승인·반려 기능 가이드",
    summary: "운영 승인 흐름을 목록, 상세, 처리 결과까지 포함해 보는 가이드입니다.",
    level: "중급",
    goal: "승인 기능을 운영 작업 흐름으로 요청합니다.",
    stages: ["승인 대상 목록 정의", "승인·반려 처리 규칙 설계", "결과 갱신과 실패 복구 정리"],
    docs: ["data-table", "confirmation-flow", "edge-case", "api-error-response", "pagination-api"],
    playbooks: ["planner-admin-workflow", "admin-dashboard-playbook"],
    prompts: [
      {
        title: "빠른 요청",
        body: "관리자가 요청을 승인하거나 반려할 수 있는 기능을 만들어줘.",
      },
      {
        title: "고급 요청",
        body: "목록 테이블, 상세 확인, 승인·반려 처리, 반려 사유 입력, 결과 갱신, 실패 재시도까지 포함한 승인 기능을 설계해줘.",
      },
    ],
    checklist: [
      "목록과 상세 흐름이 있는가",
      "승인·반려 분기가 있는가",
      "결과 갱신과 실패 복구가 있는가",
    ],
  },
  {
    slug: "analytics-feature-guide",
    title: "분석·지표 기능 가이드",
    summary: "KPI 카드, 기간 필터, 비교 기준과 이벤트 해석을 함께 보는 가이드입니다.",
    level: "중급",
    goal: "지표 화면을 숫자 나열이 아니라 해석 가능한 운영 도구로 요청합니다.",
    stages: ["핵심 KPI 정의", "기간과 필터 기준 정리", "이벤트 해석과 비교 흐름 설계"],
    docs: ["kpi", "analytics-event", "data-table", "filter-bar", "design-system"],
    playbooks: ["planner-dashboard-prd", "designer-dashboard-polish"],
    prompts: [
      {
        title: "빠른 요청",
        body: "서비스 핵심 지표를 보는 분석 화면을 만들어줘. KPI 카드와 필터가 있으면 좋겠어.",
      },
      {
        title: "고급 요청",
        body: "KPI 카드, 기간 필터, 비교 기준, 관련 이벤트 목록까지 포함한 분석 대시보드를 설계해줘. 숫자뿐 아니라 해석 포인트가 보이게 구조화해줘.",
      },
    ],
    checklist: [
      "핵심 KPI와 기간 기준이 정의되는가",
      "비교 기준이 있는가",
      "이벤트와 지표 관계가 설명되는가",
    ],
  },
];

export function getFeatureGuides() {
  return FEATURE_GUIDES;
}

export function getFeatureGuideBySlug(slug: string) {
  return FEATURE_GUIDES.find((guide) => guide.slug === slug) ?? null;
}
