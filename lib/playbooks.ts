export type PlaybookRole = "기획자" | "디자이너" | "주니어 개발자";
export type PlaybookLevel = "입문" | "중급";

export type Playbook = {
  slug: string;
  title: string;
  summary: string;
  role: PlaybookRole;
  level: PlaybookLevel;
  outcome: string;
  situation: string;
  docs: string[];
  quickPrompt: string;
  detailedPrompt: string;
  commonMistake: string;
  improvedRequest: string;
  checklist: string[];
};

export const PLAYBOOKS: Playbook[] = [
  {
    slug: "planner-signup-page",
    title: "기획자가 회원가입 페이지를 AI IDE에 시키는 법",
    summary: "회원가입 페이지를 화면이 아니라 기능 단위 요구사항으로 바꾸는 플레이북입니다.",
    role: "기획자",
    level: "입문",
    outcome: "회원가입 요구사항을 검증과 상태까지 포함한 구현 요청으로 바꿉니다.",
    situation:
      "회원가입 페이지가 필요한데, 화면만 설명하면 검증과 성공·실패 흐름, 가입 직후 다음 행동이 모두 빠지는 상황입니다. 이 플레이북은 화면 설명을 기능 설명으로 바꾸는 데 초점을 둡니다.",
    docs: ["user-flow", "form", "form-validation", "success-criteria", "api"],
    quickPrompt:
      "회원가입 페이지를 만들어줘. 이메일, 비밀번호, 비밀번호 확인 필드가 필요하고, 잘못 입력하면 바로 안내해줘.",
    detailedPrompt:
      "회원가입 페이지를 Next.js App Router 기준으로 구현해줘. 이메일, 비밀번호, 비밀번호 확인 필드가 필요하고, 각 필드 아래에 검증 메시지를 보여줘. 제출 버튼은 요청 중 비활성화되고 로딩 상태를 가져야 해. 성공하면 다음 단계 안내를, 실패하면 재시도 가능한 에러 피드백을 보여줘.",
    commonMistake: "회원가입 화면 하나 만들어줘라고만 말해 검증과 상태 흐름이 빠지는 경우입니다.",
    improvedRequest:
      "입력 필드, 검증 규칙, 제출 상태, 성공과 실패 피드백까지 하나의 기능으로 묶어 요청합니다.",
    checklist: [
      "필수 필드와 검증 규칙이 포함되어 있는가",
      "제출 중 상태와 성공·실패 흐름이 들어 있는가",
      "가입 직후 로그인, 온보딩, 이메일 인증처럼 다음 단계 안내가 포함되어 있는가",
    ],
  },
  {
    slug: "planner-dashboard-prd",
    title: "기획자가 대시보드 PRD를 AI IDE에 전달하는 법",
    summary: "대시보드 화면을 KPI와 운영 목적 중심으로 설명하는 플레이북입니다.",
    role: "기획자",
    level: "중급",
    outcome: "대시보드 요구사항을 카드 나열이 아니라 운영 목적 중심으로 바꿉니다.",
    situation: "대시보드가 필요한데 어떤 지표를 먼저 보여줘야 하는지와 화면 구조가 모호한 상황입니다.",
    docs: ["information-architecture", "user-flow", "data-table", "filter-bar", "success-criteria"],
    quickPrompt: "관리자 대시보드를 만들어줘. 핵심 지표와 목록이 함께 보였으면 좋겠어.",
    detailedPrompt:
      "관리자가 매일 보는 대시보드를 설계해줘. 상단에는 핵심 KPI 카드, 중간에는 필터 바, 하단에는 최근 활동 목록을 배치해줘. 운영자가 어떤 정보를 먼저 확인하고 다음에 어떤 행동을 해야 하는지 흐름이 보이도록 해줘.",
    commonMistake: "대시보드 만들어줘라고만 해서 카드 몇 개만 있는 화면이 되는 경우입니다.",
    improvedRequest:
      "운영 목적, 핵심 지표, 필터와 목록 관계를 함께 설명해 구조 중심으로 요청합니다.",
    checklist: [
      "대시보드 사용 목적이 명확한가",
      "핵심 지표와 상세 목록 우선순위가 보이는가",
      "필터와 다음 행동이 연결되어 있는가",
    ],
  },
  {
    slug: "planner-admin-workflow",
    title: "기획자가 관리자 승인 워크플로를 AI IDE에 시키는 법",
    summary: "승인·반려 흐름을 목록과 상세, 처리 결과까지 연결해 설명하는 플레이북입니다.",
    role: "기획자",
    level: "중급",
    outcome: "운영 승인 흐름을 단계별 처리 경험까지 포함한 요청으로 바꿉니다.",
    situation: "관리자가 요청 목록을 보고 승인하거나 반려해야 하는데, 처리 흐름을 어떻게 나눠 설명할지 모호한 상황입니다.",
    docs: ["user-flow", "confirmation-flow", "data-table", "edge-case", "acceptance-criteria"],
    quickPrompt: "관리자 승인 기능을 만들어줘. 요청 목록을 보고 승인이나 반려를 할 수 있으면 좋겠어.",
    detailedPrompt:
      "승인 대기 목록, 상세 확인, 승인·반려 처리, 결과 반영 흐름을 포함한 관리자 기능을 설계해줘. 반려 시에는 사유 입력이 필요하고, 처리 중 로딩과 성공·실패 피드백도 보여줘.",
    commonMistake: "승인 페이지 하나만 요청해서 목록과 상세 연결, 반려 사유, 결과 갱신이 빠지는 경우입니다.",
    improvedRequest:
      "목록, 상세, 처리, 결과 갱신을 하나의 운영 흐름으로 묶어서 요청합니다.",
    checklist: [
      "목록과 상세 흐름이 연결되어 있는가",
      "승인과 반려 분기가 명확한가",
      "처리 결과 갱신과 실패 재시도가 포함되어 있는가",
    ],
  },
  {
    slug: "planner-checkout-flow",
    title: "기획자가 결제 전환 흐름을 AI IDE에 시키는 법",
    summary: "결제 화면을 전환 흐름과 실패 복구까지 포함한 기능으로 설명하는 플레이북입니다.",
    role: "기획자",
    level: "중급",
    outcome: "결제 기능을 화면 단위가 아니라 전환 경험 중심 요구사항으로 바꿉니다.",
    situation: "결제 기능을 만들어야 하는데 결제 성공만이 아니라 실패, 재시도, 완료 후 행동까지 포함해야 하는 상황입니다.",
    docs: ["user-flow", "call-to-action", "failure-scenario", "fallback", "success-criteria"],
    quickPrompt: "결제 기능을 만들어줘. 상품 정보, 결제 버튼, 실패 시 다시 시도하는 흐름이 필요해.",
    detailedPrompt:
      "상품 확인, 결제 수단 선택, 결제 요청, 로딩 상태, 실패 복구, 완료 화면까지 하나의 결제 전환 흐름으로 설계해줘. CTA 우선순위와 안내 문구도 함께 정리해줘.",
    commonMistake: "결제 화면을 예쁘게 만들어줘라고만 해서 실패 복구와 완료 뒤 흐름이 비는 경우입니다.",
    improvedRequest:
      "전환 흐름, 실패 복구, 완료 뒤 다음 행동까지 포함해 결제 기능 전체를 요청합니다.",
    checklist: [
      "상품 확인과 결제 제출 흐름이 있는가",
      "실패 시 재시도와 대체 경로가 있는가",
      "완료 뒤 행동 안내가 있는가",
    ],
  },
  {
    slug: "designer-dashboard-polish",
    title: "디자이너가 대시보드 화면 개선을 AI IDE에 시키는 법",
    summary: "복잡한 대시보드 화면을 읽기 쉬운 정보 구조로 바꾸는 플레이북입니다.",
    role: "디자이너",
    level: "중급",
    outcome: "시각 개선 요청을 구조와 상태 중심 요청으로 바꿉니다.",
    situation: "기능은 동작하지만 정보 밀도가 높아 읽기 어렵고, 중요 지표가 잘 드러나지 않는 대시보드가 있는 상황입니다.",
    docs: ["card-layout", "data-table", "filter-bar", "empty-state", "microcopy"],
    quickPrompt: "관리자 대시보드를 더 읽기 쉽게 정리해줘. 카드와 목록의 우선순위가 잘 보였으면 좋겠어.",
    detailedPrompt:
      "관리자 대시보드를 정보 우선순위가 잘 보이도록 개선해줘. 상단에는 핵심 KPI 카드, 중간에는 필터, 하단에는 목록을 배치하고, 빈 상태와 로딩 상태도 함께 설계해줘. 마이크로카피와 간격, 강조 규칙을 정리해줘.",
    commonMistake: "더 예쁘게 만들어줘라고만 해서 정보 구조가 그대로 남는 경우입니다.",
    improvedRequest:
      "정보 우선순위, 상태 표현, 마이크로카피와 구조를 함께 설명해 요청합니다.",
    checklist: [
      "핵심 지표와 세부 목록 우선순위가 보이는가",
      "빈 상태와 로딩 상태가 함께 설계되었는가",
      "마이크로카피와 시각 강조 규칙이 포함되었는가",
    ],
  },
  {
    slug: "designer-state-system",
    title: "디자이너가 상태 시스템을 AI IDE에 시키는 법",
    summary: "정상 화면만이 아니라 빈 상태, 로딩, 에러 상태를 함께 요청하는 플레이북입니다.",
    role: "디자이너",
    level: "입문",
    outcome: "상태별 UI를 하나의 시스템으로 묶어 요청합니다.",
    situation: "메인 화면은 있는데 빈 상태나 로딩, 에러 대응이 빠져 있어 제품 경험이 약한 상황입니다.",
    docs: ["empty-state", "loading-state", "error-state", "microcopy", "skeleton"],
    quickPrompt: "이 화면의 빈 상태, 로딩 상태, 에러 상태도 함께 설계해줘.",
    detailedPrompt:
      "이 기능의 정상 상태뿐 아니라 empty state, skeleton 기반 로딩 상태, 에러 상태를 각각 다른 목적과 문구로 설계해줘. 각 상태에서 사용자가 다음에 무엇을 해야 하는지 CTA도 포함해줘.",
    commonMistake: "정상 화면만 요청해서 상태별 경험이 누락되는 경우입니다.",
    improvedRequest:
      "빈 상태, 로딩 상태, 에러 상태를 각각 다른 목적의 UI로 구분해서 요청합니다.",
    checklist: [
      "세 가지 상태가 모두 분리되어 있는가",
      "각 상태에 맞는 문구와 CTA가 있는가",
      "시각적 일관성이 유지되는가",
    ],
  },
  {
    slug: "designer-landing-page-hero",
    title: "디자이너가 랜딩 히어로 섹션을 AI IDE에 시키는 법",
    summary: "첫 화면의 메시지와 CTA를 중심으로 히어로 섹션을 설계하는 플레이북입니다.",
    role: "디자이너",
    level: "입문",
    outcome: "히어로 섹션을 시각 장식이 아니라 메시지와 전환 중심으로 요청합니다.",
    situation: "랜딩 페이지 첫 화면이 필요한데 브랜드 메시지와 CTA를 어떻게 잡아야 할지 모호한 상황입니다.",
    docs: ["hero-section", "call-to-action", "microcopy", "responsive-design", "design-token"],
    quickPrompt: "랜딩 페이지 첫 화면을 만들어줘. 메시지와 CTA가 한눈에 들어오면 좋겠어.",
    detailedPrompt:
      "브랜드 메시지, 핵심 가치, 메인 CTA와 보조 CTA가 명확하게 보이는 히어로 섹션을 설계해줘. 모바일에서도 우선순위가 유지되도록 구조와 문구를 잡아줘.",
    commonMistake: "화려하게 만들어줘라고만 해서 메시지 전달이 약해지는 경우입니다.",
    improvedRequest:
      "핵심 메시지, CTA 우선순위, 모바일 구조까지 함께 설명해 요청합니다.",
    checklist: [
      "핵심 메시지가 한 문장으로 드러나는가",
      "메인 CTA와 보조 CTA가 구분되는가",
      "모바일에서도 구조가 유지되는가",
    ],
  },
  {
    slug: "designer-admin-ia",
    title: "디자이너가 관리자 정보 구조를 AI IDE에 시키는 법",
    summary: "관리자 화면의 정보 구조와 탐색 흐름을 정리하는 플레이북입니다.",
    role: "디자이너",
    level: "중급",
    outcome: "관리자 화면을 정보 구조 중심으로 재설계하는 요청으로 바꿉니다.",
    situation: "관리자 화면의 메뉴와 섹션이 많아 어디서 무엇을 해야 하는지 헷갈리는 상황입니다.",
    docs: ["information-architecture", "layout", "breadcrumb", "data-table", "responsive-layout"],
    quickPrompt: "관리자 화면의 정보 구조를 더 명확하게 정리해줘.",
    detailedPrompt:
      "관리자 화면의 정보 구조를 재정리해줘. 사이드 내비게이션, 상단 제목, 브레드크럼, 요약 카드, 상세 목록이 어떤 계층으로 보이는지 다시 설계하고, 공통 레이아웃 규칙도 함께 제안해줘.",
    commonMistake: "정리해줘라고만 해서 색이나 여백만 바뀌고 구조는 그대로 남는 경우입니다.",
    improvedRequest:
      "내비게이션 계층, 섹션 우선순위, 브레드크럼과 상세 영역의 관계를 함께 설명해 요청합니다.",
    checklist: [
      "현재 위치와 이동 경로가 명확한가",
      "요약과 상세 섹션 관계가 드러나는가",
      "공통 레이아웃 규칙이 있는가",
    ],
  },
  {
    slug: "junior-api-integration",
    title: "주니어 개발자가 API 연동 화면을 AI IDE에 시키는 법",
    summary: "API 요청, 로딩, 에러, 빈 상태를 포함한 기본 연동 화면 요청 플레이북입니다.",
    role: "주니어 개발자",
    level: "입문",
    outcome:
      "데이터 표시 화면을 성공 화면 하나가 아니라 로딩, 오류, 빈 상태까지 포함한 구현 요청으로 바꿉니다.",
    situation:
      "API는 준비되어 있는데 화면에서 로딩, 오류, 빈 데이터, 느린 응답 같은 상태를 어떻게 설명해야 할지 막막한 상황입니다. 이 플레이북은 API 연동 요청이 왜 자주 성공 화면만 남기는지까지 같이 짚습니다.",
    docs: ["data-fetching", "api", "endpoint", "request-response-schema", "loading-state"],
    quickPrompt: "사용자 목록을 API로 불러와 보여주는 페이지를 만들어줘.",
    detailedPrompt:
      "Next.js App Router 기준으로 `/api/users`를 호출해 사용자 목록을 보여주는 페이지를 구현해줘. 로딩 상태, 에러 상태, 데이터 없음 상태를 각각 분리해 보여주고, 응답 구조와 필드를 함께 정리해줘.",
    commonMistake: "API 연결해줘라고만 해서 성공 상태만 구현되는 경우입니다.",
    improvedRequest:
      "엔드포인트, 로딩, 에러, 데이터 없음 상태를 함께 묶어서 요청합니다.",
    checklist: [
      "엔드포인트와 응답 필드가 명확한가",
      "로딩과 에러 상태가 포함되었는가",
      "데이터가 없을 때 처리도 정의되었는가",
      "응답이 느릴 때의 체감 품질까지 요청에 들어 있는가",
    ],
  },
  {
    slug: "junior-form-submit-flow",
    title: "주니어 개발자가 폼 제출 흐름을 AI IDE에 시키는 법",
    summary: "폼 입력과 검증, 제출, 성공과 실패 피드백을 완성형 흐름으로 요청하는 플레이북입니다.",
    role: "주니어 개발자",
    level: "입문",
    outcome: "폼 기능을 입력창이 아닌 제출 흐름 전체로 요청합니다.",
    situation: "폼 UI는 만들 수 있는데 제출과 검증, 피드백을 어떤 구조로 설명할지 애매한 상황입니다.",
    docs: ["form", "form-validation", "controlled-component", "toast", "api-error-response"],
    quickPrompt: "문의하기 폼을 만들어줘. 제출되면 성공 메시지가 보이면 좋겠어.",
    detailedPrompt:
      "문의하기 폼을 구현해줘. 이름, 이메일, 문의 내용 필드가 필요하고 검증 메시지를 보여줘. 제출 버튼은 요청 중 로딩 상태를 표시하고, 성공하면 토스트와 초기화를, 실패하면 인라인 에러와 재시도를 제공해줘.",
    commonMistake: "폼 만들어줘라고 해서 입력 필드만 생기고 제출 상태가 빠지는 경우입니다.",
    improvedRequest:
      "필드, 검증, 제출 상태, 성공·실패 피드백을 함께 요청합니다.",
    checklist: [
      "입력 필드와 검증 규칙이 정의되었는가",
      "제출 상태가 포함되었는가",
      "성공·실패 피드백이 포함되었는가",
    ],
  },
  {
    slug: "junior-auth-guard",
    title: "주니어 개발자가 보호된 페이지를 AI IDE에 시키는 법",
    summary: "로그인 보호, 권한 확인, 리다이렉트와 접근 불가 처리를 포함한 플레이북입니다.",
    role: "주니어 개발자",
    level: "중급",
    outcome: "보호된 페이지를 인증과 권한 흐름까지 포함해 요청합니다.",
    situation: "로그인 사용자가 아니면 볼 수 없는 페이지를 만들어야 하고, 권한 부족 처리도 필요한 상황입니다.",
    docs: ["auth-flow", "session", "token", "rbac", "permission-policy"],
    quickPrompt: "로그인한 사용자만 볼 수 있는 페이지를 만들어줘.",
    detailedPrompt:
      "로그인한 사용자만 접근 가능한 페이지를 구현해줘. 비로그인 사용자는 로그인 페이지로 리다이렉트하고, 권한이 부족하면 접근 불가 화면을 보여줘. 세션 만료와 역할별 메뉴 노출 차이도 함께 정리해줘.",
    commonMistake: "로그인한 사용자만 볼 수 있게 해줘라고 해서 권한 부족 상태가 빠지는 경우입니다.",
    improvedRequest:
      "비로그인, 권한 부족, 세션 만료 상태를 모두 구분해서 요청합니다.",
    checklist: [
      "비로그인 리다이렉트가 있는가",
      "권한 부족 UI가 있는가",
      "세션 만료 처리와 메뉴 차이가 포함되는가",
    ],
  },
  {
    slug: "junior-list-performance",
    title: "주니어 개발자가 긴 목록 성능을 AI IDE에 시키는 법",
    summary: "무한 스크롤, 디바운스, 캐시, 스켈레톤을 묶어 긴 목록 성능을 개선하는 플레이북입니다.",
    role: "주니어 개발자",
    level: "중급",
    outcome: "긴 목록 화면을 성능과 UX 관점에서 요청하는 방법을 익힙니다.",
    situation: "데이터가 많은 목록 화면이 느려지고, 검색과 추가 로딩 경험이 거칠어진 상황입니다.",
    docs: ["infinite-scroll-ui", "infinite-scroll-logic", "frontend-cache", "debounce", "skeleton"],
    quickPrompt: "긴 목록 페이지를 부드럽게 동작하게 만들어줘. 스크롤하면 더 불러오고 검색도 빠르게 반응했으면 좋겠어.",
    detailedPrompt:
      "긴 목록 페이지를 최적화해줘. 초기에는 스켈레톤을 보여주고, 하단 도달 시 추가 데이터를 불러와. 검색 입력에는 디바운스를 적용하고, 이미 불러온 데이터는 캐시해 재요청을 줄여줘. 결과 없음 상태와 모바일 경험도 함께 고려해줘.",
    commonMistake: "빠르게 만들어줘라고만 해서 무엇을 최적화할지 빠지는 경우입니다.",
    improvedRequest:
      "스크롤, 검색, 캐시, 로딩 상태를 함께 지정해 긴 목록 경험 전체를 요청합니다.",
    checklist: [
      "초기 로딩과 추가 로딩이 분리되었는가",
      "검색 디바운스가 포함되었는가",
      "캐시와 결과 없음 상태가 정의되었는가",
    ],
  },
  {
    slug: "search-feature-playbook",
    title: "검색 기능 전체를 AI IDE에 단계적으로 시키는 법",
    summary: "검색 입력 UI, API, 결과 상태와 정렬 기준을 한 번에 묶는 플레이북입니다.",
    role: "주니어 개발자",
    level: "중급",
    outcome: "검색 기능을 UI와 데이터 구조를 함께 고려한 요청으로 바꿉니다.",
    situation: "검색창은 필요하지만 실제 검색 결과 상태와 API 구조까지 함께 정리해야 하는 상황입니다.",
    docs: ["search-bar", "search-api", "search-index", "debounce", "empty-state"],
    quickPrompt: "검색 기능을 만들어줘. 검색창과 결과 목록이 필요해.",
    detailedPrompt:
      "검색 기능 전체를 구현해줘. 디바운스가 적용된 입력창과 결과 목록이 필요하고, 결과 없음과 로딩 상태를 보여줘. 검색 API와 검색 인덱스 구조, 정렬 기준도 함께 정리해줘.",
    commonMistake: "검색창 하나만 요청해서 실제 검색 경험이 빠지는 경우입니다.",
    improvedRequest:
      "입력 UI, API, 결과 상태, 인덱스와 정렬 규칙을 하나의 기능으로 묶어 요청합니다.",
    checklist: [
      "입력과 결과 상태가 함께 정의되었는가",
      "검색 API 구조가 포함되었는가",
      "정렬과 인덱스 기준이 포함되었는가",
    ],
  },
  {
    slug: "auth-flow-playbook",
    title: "로그인과 권한 흐름을 AI IDE에 시키는 법",
    summary: "로그인 성공 이후 예외 상태까지 포함한 인증 흐름 플레이북입니다.",
    role: "기획자",
    level: "중급",
    outcome: "인증 기능을 예외 상태까지 포함한 제품 요구사항으로 바꿉니다.",
    situation: "로그인 기능이 필요한데 비로그인, 만료, 권한 부족까지 함께 설명해야 하는 상황입니다.",
    docs: ["auth-flow", "session", "token", "rbac", "permission-policy"],
    quickPrompt: "로그인 흐름과 보호된 페이지 접근 기능을 만들어줘.",
    detailedPrompt:
      "로그인 화면, 보호된 페이지 접근, 세션 만료, 권한 부족 상태를 포함한 인증 흐름을 설계해줘. 비로그인 리다이렉트와 역할별 화면 차이도 포함해줘.",
    commonMistake: "로그인 화면만 요청해 실제 서비스 흐름이 빠지는 경우입니다.",
    improvedRequest:
      "성공, 비로그인, 만료, 권한 부족 상태를 모두 나눠 요청합니다.",
    checklist: [
      "예외 상태가 분리되어 있는가",
      "보호된 페이지 접근 규칙이 있는가",
      "역할별 차이가 포함되어 있는가",
    ],
  },
  {
    slug: "admin-dashboard-playbook",
    title: "관리자 페이지를 AI IDE에 기능 묶음으로 시키는 법",
    summary: "필터, 정렬, 테이블, 상태 표현을 포함한 관리자 페이지 플레이북입니다.",
    role: "디자이너",
    level: "중급",
    outcome: "관리자 페이지를 운영 흐름 중심 요청으로 바꿉니다.",
    situation: "관리자 목록 화면이 필요한데, 검색과 필터, 정렬, 상태 표현까지 함께 설계해야 하는 상황입니다.",
    docs: ["data-table", "filter-bar", "sorting-ui", "pagination", "pagination-api"],
    quickPrompt: "관리자 목록 페이지를 만들어줘. 검색과 필터, 정렬이 있으면 좋겠어.",
    detailedPrompt:
      "운영자가 자주 쓰는 관리자 목록 페이지를 설계해줘. 검색, 필터, 정렬, 페이지네이션이 가능해야 하고, 로딩·빈 상태·에러 상태도 함께 포함해줘. 모바일에서는 카드형 목록으로 자연스럽게 바뀌게 해줘.",
    commonMistake: "목록 화면 하나만 요청하고 운영에서 필요한 도구를 빼먹는 경우입니다.",
    improvedRequest:
      "검색, 필터, 정렬, 상태 화면을 포함한 운영 도구로 요청합니다.",
    checklist: [
      "검색, 필터, 정렬이 포함되는가",
      "상태 화면이 함께 설계되는가",
      "모바일 대응이 고려되는가",
    ],
  },
];

export function getPlaybooks() {
  return PLAYBOOKS;
}

export function getPlaybookBySlug(slug: string) {
  return PLAYBOOKS.find((playbook) => playbook.slug === slug) ?? null;
}

export function getPlaybooksByRole(role: PlaybookRole) {
  return PLAYBOOKS.filter((playbook) => playbook.role === role);
}

export function getRelatedPlaybooks(slug: string, limit = 3) {
  const current = getPlaybookBySlug(slug);

  if (!current) {
    return [];
  }

  const sameRole = PLAYBOOKS.filter(
    (playbook) => playbook.slug !== slug && playbook.role === current.role,
  );
  const overlappingDocs = PLAYBOOKS.filter(
    (playbook) =>
      playbook.slug !== slug &&
      playbook.docs.some((docSlug) => current.docs.includes(docSlug)),
  );

  const unique = new Map<string, Playbook>();

  for (const playbook of [...sameRole, ...overlappingDocs]) {
    if (!unique.has(playbook.slug)) {
      unique.set(playbook.slug, playbook);
    }
  }

  return [...unique.values()].slice(0, limit);
}
