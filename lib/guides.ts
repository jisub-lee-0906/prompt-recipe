import type { PlaybookRole } from "@/lib/playbooks";

export type FeatureGuideLevel = "입문" | "중급";

export type FeatureGuide = {
  slug: string;
  title: string;
  summary: string;
  level: FeatureGuideLevel;
  goal: string;
  audience: PlaybookRole[];
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
    summary:
      "입력 폼, 검증, 성공/실패 흐름, 가입 후 이동까지 회원가입 기능을 한 번에 정리하는 가이드입니다.",
    level: "입문",
    goal: "회원가입 기능을 화면, 상태, API까지 끊기지 않게 요청한다.",
    audience: ["기획자", "디자이너", "주니어 개발자"],
    stages: [
      "필수 입력 필드와 검증 규칙 정의",
      "제출 중, 성공, 실패 상태 정의",
      "가입 완료 후 다음 단계 안내 정의",
    ],
    docs: ["form", "form-validation", "success-criteria", "api", "loading-state"],
    playbooks: ["planner-signup-page", "junior-form-submit-flow"],
    prompts: [
      {
        title: "빠른 요청",
        body: "회원가입 기능을 만들어줘. 이메일, 비밀번호, 비밀번호 확인 필드가 필요하고, 잘못된 입력은 필드 아래에서 안내해줘. 제출 중에는 버튼 로딩 상태가 보이고, 성공하면 다음 단계로 이동하게 해줘.",
      },
      {
        title: "고급 요청",
        body: "회원가입 기능 전체를 Next.js App Router 기준으로 설계하고 구현해줘. 입력 필드는 이메일, 비밀번호, 비밀번호 확인이 필요하고 각 필드에 실시간 검증 메시지를 보여줘. 제출 버튼은 요청 중 비활성화하고 로딩 상태를 표시해줘. 성공 시 환영 메시지와 다음 단계 안내를 보여주고, 실패 시 인라인 에러를 보여줘. 모바일과 접근성도 고려해줘.",
      },
    ],
    checklist: [
      "입력 필드와 검증 규칙이 빠짐없이 정리돼 있는가",
      "성공과 실패 이후 사용자 흐름이 포함돼 있는가",
      "로딩 상태와 버튼 조건이 정의돼 있는가",
    ],
  },
  {
    slug: "auth-feature",
    title: "로그인·권한 기능 가이드",
    summary:
      "로그인 화면, 보호된 페이지, 세션 만료, 권한 부족 상태를 하나의 기능 묶음으로 설명합니다.",
    level: "중급",
    goal: "인증과 권한을 성공 흐름뿐 아니라 예외 상태까지 포함해 요청한다.",
    audience: ["기획자", "주니어 개발자"],
    stages: [
      "로그인 성공 흐름 정의",
      "비로그인 접근과 세션 만료 처리 정의",
      "권한 부족 상태와 역할별 화면 차이 정의",
    ],
    docs: ["auth-flow", "session", "token", "rbac", "permission-policy"],
    playbooks: ["auth-flow-playbook", "junior-auth-guard"],
    prompts: [
      {
        title: "빠른 요청",
        body: "로그인 기능과 보호된 페이지 흐름을 만들어줘. 비로그인 사용자는 로그인 페이지로 보내고, 권한이 없으면 접근 불가 화면을 보여줘.",
      },
      {
        title: "고급 요청",
        body: "로그인과 권한 기능 전체를 설계하고 구현해줘. 이메일/비밀번호 로그인 화면이 필요하고, 보호된 페이지는 비로그인 사용자를 로그인 화면으로 리다이렉트해줘. 세션이 만료되면 재로그인을 안내하고, 권한이 부족한 경우에는 접근 불가 화면을 보여줘. 역할별 메뉴 노출 차이와 세션 만료 후 복귀 흐름도 포함해줘.",
      },
    ],
    checklist: [
      "비로그인, 만료, 권한 부족 상태가 모두 포함돼 있는가",
      "역할별 화면 차이를 설명했는가",
      "보호된 페이지 접근 규칙이 명확한가",
    ],
  },
  {
    slug: "search-feature-guide",
    title: "검색 기능 가이드",
    summary:
      "검색창 UI, 검색 API, 검색 인덱스, 결과 상태를 한 기능으로 보는 교과서형 가이드입니다.",
    level: "중급",
    goal: "검색 기능을 입력창이 아니라 전체 사용자 경험으로 요청한다.",
    audience: ["기획자", "디자이너", "주니어 개발자"],
    stages: [
      "검색 입력과 디바운스 정의",
      "검색 결과와 빈 상태 정의",
      "검색 API와 인덱스 구조 정의",
    ],
    docs: ["search-bar", "search-api", "search-index", "debounce", "empty-state"],
    playbooks: ["search-feature-playbook", "junior-list-performance"],
    prompts: [
      {
        title: "빠른 요청",
        body: "검색 기능을 만들어줘. 검색 입력창과 결과 목록이 필요하고, 결과가 없을 때는 안내 문구를 보여줘.",
      },
      {
        title: "고급 요청",
        body: "검색 기능 전체를 구현해줘. 입력값에는 디바운스를 적용하고, 검색 API를 호출해 결과를 리스트로 보여줘. 검색 중에는 로딩 상태를, 결과가 없으면 empty state를 보여줘. 검색 인덱스 구조와 하이라이트 표시, 모바일 검색 경험까지 포함해줘.",
      },
    ],
    checklist: [
      "검색 입력, 결과, 빈 상태가 한 흐름으로 묶여 있는가",
      "API 또는 인덱스 구조를 함께 요청했는가",
      "검색 중 상태와 모바일 사용성을 설명했는가",
    ],
  },
  {
    slug: "admin-dashboard-feature",
    title: "관리자 대시보드 기능 가이드",
    summary:
      "관리자용 KPI, 필터, 테이블, 정렬, 상태 표현을 운영 도구 관점에서 정리한 가이드입니다.",
    level: "중급",
    goal: "운영자가 매일 쓰는 관리자 대시보드를 기능 단위로 요청한다.",
    audience: ["기획자", "디자이너"],
    stages: [
      "핵심 KPI와 우선순위 정의",
      "필터, 검색, 정렬 흐름 정의",
      "운영 상태와 액션 구조 정의",
    ],
    docs: ["data-table", "filter-bar", "sorting-ui", "pagination", "microcopy"],
    playbooks: ["designer-dashboard-polish", "admin-dashboard-playbook", "planner-dashboard-prd"],
    prompts: [
      {
        title: "빠른 요청",
        body: "관리자 대시보드를 만들어줘. 핵심 지표 카드와 목록 테이블, 필터 기능이 필요해.",
      },
      {
        title: "고급 요청",
        body: "운영팀이 매일 사용하는 관리자 대시보드를 설계하고 구현해줘. 상단에는 KPI 카드, 중간에는 필터 바와 검색 입력, 하단에는 정렬 가능한 데이터 테이블을 배치해줘. 빈 상태, 로딩 상태, 오류 상태를 분리하고, 행 단위 액션과 모바일 카드형 전환도 포함해줘.",
      },
    ],
    checklist: [
      "운영 목적과 우선 KPI가 정의돼 있는가",
      "검색, 필터, 정렬, 페이지네이션이 함께 들어갔는가",
      "운영 상태와 행 단위 액션을 설명했는가",
    ],
  },
  {
    slug: "checkout-feature",
    title: "결제 전환 기능 가이드",
    summary:
      "상품 확인, 결제 수단 선택, 실패 복구, 완료 화면까지 포함한 결제 흐름 가이드입니다.",
    level: "중급",
    goal: "결제 기능을 전환율과 실패 복구까지 포함해 요청한다.",
    audience: ["기획자", "디자이너"],
    stages: [
      "구매 결정과 CTA 정의",
      "결제 요청과 실패 복구 정의",
      "결제 완료 후 안내와 후속 행동 정의",
    ],
    docs: ["call-to-action", "failure-scenario", "fallback", "microcopy", "success-criteria"],
    playbooks: ["planner-checkout-flow"],
    prompts: [
      {
        title: "빠른 요청",
        body: "결제 기능을 만들어줘. 상품 정보 확인, 결제 버튼, 실패 시 재시도 흐름이 필요해.",
      },
      {
        title: "고급 요청",
        body: "결제 전환 기능 전체를 구현해줘. 상품 정보 확인, 결제 수단 선택, 결제 요청, 로딩 상태, 실패 시 재시도와 고객센터 안내, 성공 시 완료 화면까지 한 흐름으로 만들어줘. 전환율을 해치지 않도록 CTA 우선순위와 보조 문구도 함께 설계해줘.",
      },
    ],
    checklist: [
      "성공뿐 아니라 실패와 취소 흐름이 포함돼 있는가",
      "결제 완료 후 안내 화면까지 정의돼 있는가",
      "CTA와 복구 경로 문구를 함께 요청했는가",
    ],
  },
  {
    slug: "list-performance-feature",
    title: "긴 목록 성능 기능 가이드",
    summary:
      "긴 목록에서 무한 스크롤, 캐시, 디바운스, 스켈레톤을 어떻게 함께 시킬지 정리한 가이드입니다.",
    level: "중급",
    goal: "목록 성능을 단순 속도 이슈가 아니라 UX와 데이터 흐름 문제로 요청한다.",
    audience: ["주니어 개발자", "디자이너"],
    stages: [
      "초기 로딩과 스켈레톤 정의",
      "스크롤 기반 추가 로딩 정의",
      "검색·캐시·끝 상태 정의",
    ],
    docs: ["infinite-scroll-ui", "infinite-scroll-logic", "frontend-cache", "debounce", "skeleton"],
    playbooks: ["junior-list-performance"],
    prompts: [
      {
        title: "빠른 요청",
        body: "긴 목록 페이지를 부드럽게 동작하게 만들어줘. 스크롤로 더 불러오고 검색도 가능했으면 좋겠어.",
      },
      {
        title: "고급 요청",
        body: "데이터가 많은 목록 화면을 최적화해줘. 초기에는 스켈레톤을 보여주고, 스크롤 하단에 도달하면 추가 데이터를 가져오게 해줘. 검색 입력에는 디바운스를 적용하고, 이미 불러온 데이터는 캐시를 활용해 재요청을 줄여줘. 더 이상 데이터가 없을 때의 끝 상태도 명확히 보여줘.",
      },
    ],
    checklist: [
      "초기 로딩과 추가 로딩이 구분돼 있는가",
      "검색 입력 최적화가 포함돼 있는가",
      "캐시와 끝 상태 처리 방식이 정의돼 있는가",
    ],
  },
  {
    slug: "profile-settings-feature",
    title: "프로필 설정 기능 가이드",
    summary:
      "사용자 프로필 수정, 저장 상태, 성공 피드백, 검증 메시지를 한 흐름으로 정리한 가이드입니다.",
    level: "입문",
    goal: "설정 화면을 단순 폼이 아니라 저장 경험 전체로 요청한다.",
    audience: ["기획자", "주니어 개발자"],
    stages: [
      "수정 가능한 필드와 검증 규칙 정의",
      "저장 중 상태와 성공 피드백 정의",
      "저장 실패와 되돌리기 경험 정의",
    ],
    docs: ["form", "controlled-component", "toast", "success-criteria", "auth-flow"],
    playbooks: ["junior-form-submit-flow", "auth-flow-playbook"],
    prompts: [
      {
        title: "빠른 요청",
        body: "프로필 설정 화면을 만들어줘. 이름, 이메일 같은 정보를 수정하고 저장할 수 있게 해줘.",
      },
      {
        title: "고급 요청",
        body: "프로필 설정 기능을 만들어줘. 이름, 이메일, 알림 설정 같은 필드를 수정할 수 있고, 저장 중에는 버튼 로딩 상태가 보이게 해줘. 저장 성공 시 토스트를 보여주고, 실패 시 인라인 에러나 상단 에러 메시지를 보여줘. 현재 로그인한 사용자 정보와 연결되는 흐름도 함께 정리해줘.",
      },
    ],
    checklist: [
      "수정 가능한 필드와 검증 규칙이 정리돼 있는가",
      "저장 중 상태와 성공 피드백을 포함했는가",
      "실패 시 메시지와 복구 행동을 요청했는가",
    ],
  },
  {
    slug: "file-upload-feature",
    title: "파일 업로드 기능 가이드",
    summary:
      "이미지나 문서를 업로드하는 화면에서 선택, 업로드 중 상태, 실패 복구까지 포함한 가이드입니다.",
    level: "중급",
    goal: "파일 업로드를 버튼 하나가 아니라 상태가 있는 기능으로 요청한다.",
    audience: ["디자이너", "주니어 개발자"],
    stages: [
      "업로드 대상과 제한 조건 정의",
      "업로드 진행 상태와 미리보기 정의",
      "실패와 재시도 흐름 정의",
    ],
    docs: ["file-upload", "form", "loading-state", "error-state", "api"],
    playbooks: ["junior-form-submit-flow", "designer-state-system"],
    prompts: [
      {
        title: "빠른 요청",
        body: "이미지 업로드 기능을 만들어줘. 업로드 중 상태와 실패 시 재시도도 있으면 좋겠어.",
      },
      {
        title: "고급 요청",
        body: "이미지 업로드 기능을 구현해줘. 파일 선택 또는 드래그 앤 드롭이 가능해야 하고, 업로드 중에는 진행 상태를 보여줘. 업로드가 완료되면 미리보기를 보여주고, 실패하면 에러 메시지와 재시도 버튼을 보여줘. 허용 확장자와 최대 용량, 서버 업로드 API 흐름도 함께 정리해줘.",
      },
    ],
    checklist: [
      "허용 파일 형식과 제한 용량이 정의돼 있는가",
      "업로드 중 상태와 완료 후 미리보기를 포함했는가",
      "실패와 재시도 흐름을 요청했는가",
    ],
  },
  {
    slug: "onboarding-feature-guide",
    title: "온보딩 기능 가이드",
    summary:
      "첫 방문 사용자를 위한 안내, 초기 설정, 다음 행동 CTA를 한 흐름으로 보는 온보딩 가이드입니다.",
    level: "입문",
    goal: "온보딩을 여러 화면의 튜토리얼이 아니라 사용자 적응 흐름으로 요청한다.",
    audience: ["기획자", "디자이너"],
    stages: [
      "첫 진입 메시지와 핵심 가치 정의",
      "초기 설정 또는 첫 행동 유도 정의",
      "다음 단계 안내와 이탈 방지 정의",
    ],
    docs: ["onboarding", "user-flow", "call-to-action", "microcopy", "analytics-event"],
    playbooks: ["planner-signup-page", "designer-landing-page-hero"],
    prompts: [
      {
        title: "빠른 요청",
        body: "신규 사용자를 위한 온보딩 흐름을 만들어줘. 첫 화면에서 서비스가 뭔지 이해하고 바로 시작할 수 있으면 좋겠어.",
      },
      {
        title: "고급 요청",
        body: "신규 사용자를 위한 온보딩 기능을 설계해줘. 첫 방문 시 핵심 가치와 첫 행동을 명확히 보여주고, 필요한 초기 설정이 있으면 단계별로 안내해줘. 각 단계에는 다음 행동 CTA가 있어야 하고, 이탈을 줄일 수 있도록 짧은 마이크로카피와 진행 상태 표시를 넣어줘. 어떤 지점을 이벤트로 추적할지도 함께 제안해줘.",
      },
    ],
    checklist: [
      "첫 행동이 무엇인지 분명한가",
      "각 단계의 CTA와 안내 문구가 있는가",
      "완료율을 볼 수 있는 이벤트 추적을 포함했는가",
    ],
  },
  {
    slug: "notification-feature-guide",
    title: "알림 기능 가이드",
    summary:
      "토스트, 인앱 알림, 서버 이벤트, 재시도 메시지까지 알림 경험 전체를 묶은 가이드입니다.",
    level: "중급",
    goal: "알림을 단순 토스트가 아니라 상태 전달 시스템으로 요청한다.",
    audience: ["디자이너", "주니어 개발자"],
    stages: [
      "어떤 이벤트에 알림이 필요한지 정의",
      "즉시 피드백과 누적 알림 구조 정의",
      "실패 알림과 재시도 메시지 정의",
    ],
    docs: ["toast", "webhook", "retry", "microcopy", "api-error-response"],
    playbooks: ["designer-state-system", "junior-api-integration"],
    prompts: [
      {
        title: "빠른 요청",
        body: "사용자 행동 후 피드백을 보여주는 알림 기능을 만들어줘. 성공과 실패를 잘 구분해줘.",
      },
      {
        title: "고급 요청",
        body: "알림 기능을 설계해줘. 저장 성공처럼 즉시 사라지는 피드백은 토스트로 보여주고, 놓치면 안 되는 이벤트는 인앱 알림 목록에 쌓이게 해줘. 실패 상황은 재시도 CTA가 있는 메시지로 보여주고, 서버 이벤트가 들어오면 웹훅이나 이벤트 기반으로 업데이트할 수 있게 구조를 설명해줘.",
      },
    ],
    checklist: [
      "즉시 피드백과 누적 알림이 구분돼 있는가",
      "실패 알림에 재시도 행동이 포함돼 있는가",
      "알림 문구 톤과 우선순위를 요청했는가",
    ],
  },
  {
    slug: "approval-feature-guide",
    title: "승인·반려 기능 가이드",
    summary:
      "신청 내역 검토, 상세 확인, 승인/반려 처리, 결과 반영까지 묶어 보는 운영 기능 가이드입니다.",
    level: "중급",
    goal: "운영 승인 기능을 목록과 버튼이 아니라 작업 흐름으로 요청한다.",
    audience: ["기획자", "주니어 개발자"],
    stages: [
      "승인 대상 목록과 상세 보기 정의",
      "승인/반려 처리 조건과 메시지 정의",
      "처리 결과 반영과 재시도 정의",
    ],
    docs: ["data-table", "confirmation-flow", "edge-case", "api-error-response", "pagination-api"],
    playbooks: ["planner-admin-workflow", "admin-dashboard-playbook"],
    prompts: [
      {
        title: "빠른 요청",
        body: "운영자가 신청을 승인하거나 반려할 수 있는 관리자 기능을 만들어줘.",
      },
      {
        title: "고급 요청",
        body: "승인·반려 기능 전체를 구현해줘. 목록 테이블에서 신청 건을 보고, 상세 정보를 확인한 뒤 승인 또는 반려를 선택할 수 있게 해줘. 반려 시에는 사유 입력이 필요하고, 처리 중에는 로딩 상태를 보여줘. 처리 성공 후에는 목록이 갱신되고, 실패하면 재시도할 수 있게 해줘. 여러 페이지에 걸친 데이터도 다룰 수 있게 페이지네이션 구조를 포함해줘.",
      },
    ],
    checklist: [
      "목록과 상세 간 전환 흐름이 정의돼 있는가",
      "승인과 반려의 분기 조건이 포함돼 있는가",
      "처리 결과 갱신과 실패 재시도를 요청했는가",
    ],
  },
  {
    slug: "analytics-feature-guide",
    title: "분석·지표 기능 가이드",
    summary:
      "KPI 카드, 필터, 기간 비교, 이벤트 추적까지 데이터 기반 화면을 만드는 가이드입니다.",
    level: "중급",
    goal: "지표 화면을 예쁜 대시보드가 아니라 의사결정 도구로 요청한다.",
    audience: ["기획자", "디자이너"],
    stages: [
      "핵심 KPI와 기간 기준 정의",
      "필터와 비교 기준 정의",
      "이벤트 추적과 해석 포인트 정의",
    ],
    docs: ["kpi", "analytics-event", "data-table", "filter-bar", "design-system"],
    playbooks: ["planner-dashboard-prd", "designer-dashboard-polish"],
    prompts: [
      {
        title: "빠른 요청",
        body: "서비스 핵심 지표를 보는 분석 화면을 만들어줘. KPI 카드와 필터가 필요해.",
      },
      {
        title: "고급 요청",
        body: "분석·지표 화면을 설계하고 구현해줘. 상단에는 핵심 KPI 카드, 하단에는 기간 필터와 세부 이벤트 목록을 배치해줘. 현재 기간과 이전 기간을 비교할 수 있게 하고, 어떤 이벤트가 어떤 지표에 연결되는지도 설명해줘. 단순히 숫자를 나열하기보다 해석 포인트가 드러나는 구조로 만들어줘.",
      },
    ],
    checklist: [
      "핵심 KPI와 기간 기준이 명확한가",
      "필터와 비교 기준을 포함했는가",
      "이벤트와 지표의 관계를 설명했는가",
    ],
  },
];

export function getFeatureGuides() {
  return FEATURE_GUIDES;
}

export function getFeatureGuideBySlug(slug: string) {
  return FEATURE_GUIDES.find((guide) => guide.slug === slug) ?? null;
}
