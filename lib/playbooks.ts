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
    title: "기획자가 회원가입 페이지를 AI IDE에 시키기",
    summary:
      "회원가입 화면을 단순히 예쁘게 만드는 수준이 아니라, 입력 필드, 검증, 성공/실패 흐름까지 함께 요청하는 방법을 다룹니다.",
    role: "기획자",
    level: "입문",
    outcome: "회원가입 페이지 요구사항을 구현 가능한 요청으로 바꾼다.",
    situation:
      "회원가입 페이지를 만들어야 하는데, 기획 언어를 어떻게 개발 언어로 바꿔야 할지 막막한 상황입니다.",
    docs: ["user-flow", "form", "form-validation", "success-criteria", "api"],
    quickPrompt:
      "이 서비스의 회원가입 페이지를 만들어줘. 이메일, 비밀번호, 비밀번호 확인 필드가 필요하고 잘못된 입력은 즉시 안내해줘.",
    detailedPrompt:
      "Next.js App Router 기준으로 회원가입 페이지를 만들어줘. 이메일, 비밀번호, 비밀번호 확인 필드가 필요하고, 각 필드 아래에 검증 메시지를 보여줘. 제출 버튼은 로딩 상태를 가져야 하고, 성공하면 환영 메시지 또는 다음 단계 안내를 보여줘. 실패하면 에러 메시지를 인라인으로 표시해줘. 모바일과 데스크톱 모두 고려하고, 접근성 속성과 키보드 포커스 흐름도 챙겨줘.",
    commonMistake:
      "회원가입 화면 하나 만들어줘처럼 화면만 요청하면 검증, 에러, 성공 흐름이 빠집니다.",
    improvedRequest:
      "회원가입 페이지의 입력 필드, 검증, 제출 상태, 성공/실패 메시지까지 포함해서 구현해줘라고 요청해야 결과가 안정적입니다.",
    checklist: [
      "필수 필드와 검증 규칙이 요청에 포함돼 있는가",
      "성공/실패 후 사용자 흐름이 정의돼 있는가",
      "로딩 상태와 버튼 비활성 조건을 요청했는가",
      "모바일과 접근성 요구사항을 함께 넣었는가",
    ],
  },
  {
    slug: "planner-dashboard-prd",
    title: "기획자가 대시보드 요구사항을 PRD 수준으로 시키기",
    summary:
      "대시보드 화면을 막연한 요청이 아니라 KPI, 필터, 상태, 운영 목적까지 포함한 제품 요구사항으로 바꾸는 플레이북입니다.",
    role: "기획자",
    level: "중급",
    outcome: "대시보드 요구사항을 화면 구조와 운영 목적이 드러나는 요청으로 정리한다.",
    situation:
      "대시보드가 필요하긴 한데 어떤 카드가 먼저 보여야 하고, 운영자가 무엇을 해야 하는지까지 함께 설명해야 하는 상황입니다.",
    docs: ["information-architecture", "user-flow", "data-table", "filter-bar", "success-criteria"],
    quickPrompt:
      "운영용 대시보드 화면을 만들어줘. 핵심 수치와 목록이 함께 보이면 좋겠어.",
    detailedPrompt:
      "운영팀이 매일 보는 대시보드 화면을 설계하고 구현해줘. 첫 화면에는 핵심 KPI 카드 4개를 보여주고, 그 아래에는 필터 바와 최근 이벤트 목록을 배치해줘. 운영자가 오늘 확인해야 할 항목이 위쪽에 오고, 빈 상태와 오류 상태도 구분해줘. 각 카드와 목록이 어떤 의사결정에 쓰이는지 드러나도록 한국어 라벨과 보조 설명을 넣어줘.",
    commonMistake:
      "대시보드 하나 만들어줘라고 하면 예쁜 카드만 생기고 실제 운영 목적이 빠집니다.",
    improvedRequest:
      "누가 쓰는 화면인지, 어떤 지표를 먼저 봐야 하는지, 무엇을 바로 조작해야 하는지까지 함께 적어야 합니다.",
    checklist: [
      "화면을 쓰는 사용자와 목적이 명시돼 있는가",
      "핵심 KPI와 보조 목록의 우선순위를 적었는가",
      "빈 상태, 오류 상태, 갱신 주기를 요청했는가",
      "운영자가 다음 행동을 할 수 있는 구조를 설명했는가",
    ],
  },
  {
    slug: "planner-admin-workflow",
    title: "기획자가 관리자 승인 워크플로를 AI IDE에 시키기",
    summary:
      "단일 화면이 아니라 승인 대기, 상세 확인, 승인/반려 후 처리까지 이어지는 운영 워크플로를 요청하는 방법입니다.",
    role: "기획자",
    level: "중급",
    outcome: "관리자 작업 흐름을 단계와 상태 기준으로 명확히 지시한다.",
    situation:
      "운영자가 신청 내역을 검토하고 승인이나 반려를 해야 하는데, 목록과 상세와 후속 처리를 한 번에 정의해야 하는 상황입니다.",
    docs: ["user-flow", "confirmation-flow", "data-table", "edge-case", "acceptance-criteria"],
    quickPrompt:
      "관리자 승인 화면을 만들어줘. 신청 목록을 보고 승인하거나 반려할 수 있으면 돼.",
    detailedPrompt:
      "관리자가 신청 내역을 검토하는 승인 워크플로를 만들어줘. 첫 화면은 신청 목록 테이블이고, 행을 클릭하면 상세 패널이 열리게 해줘. 관리자는 승인 또는 반려를 선택할 수 있고, 반려 시에는 사유 입력이 필요해. 처리 중 로딩 상태, 처리 성공 토스트, 실패 시 재시도 흐름까지 포함해줘. 승인 완료 후 목록 상태가 즉시 갱신되도록 해줘.",
    commonMistake:
      "승인 페이지 만들어줘처럼 한 줄로 요청하면 목록만 생기고 실제 운영 흐름이 빠집니다.",
    improvedRequest:
      "승인 대기, 상세 확인, 처리, 결과 반영까지 흐름 전체를 단계별로 요청해야 합니다.",
    checklist: [
      "목록과 상세가 어떻게 연결되는지 설명했는가",
      "승인과 반려의 분기 조건을 적었는가",
      "처리 중과 처리 후 상태를 포함했는가",
      "실패와 재시도 흐름을 요청했는가",
    ],
  },
  {
    slug: "planner-checkout-flow",
    title: "기획자가 결제 전환 흐름을 AI IDE에 시키기",
    summary:
      "결제 페이지 하나가 아니라 상품 확인, 결제 수단 선택, 실패 복구, 완료 화면까지 포함한 전환 흐름 요청 패턴입니다.",
    role: "기획자",
    level: "중급",
    outcome: "결제 흐름을 전환율과 실패 복구를 함께 고려한 요청으로 바꾼다.",
    situation:
      "결제 기능을 만들어야 하는데 성공 흐름뿐 아니라 취소, 실패, 재시도, 완료 이후 안내까지 함께 설계해야 하는 상황입니다.",
    docs: ["user-flow", "call-to-action", "failure-scenario", "fallback", "success-criteria"],
    quickPrompt:
      "결제 페이지를 만들어줘. 상품 정보와 결제 버튼이 보이면 좋겠어.",
    detailedPrompt:
      "결제 전환 흐름 전체를 설계하고 구현해줘. 상품 정보 확인, 결제 수단 선택, 약관 동의, 결제 요청, 결제 성공 화면까지 이어지는 흐름이 필요해. 요청 중에는 로딩 상태가 보이고, 실패하면 재시도와 고객센터 안내를 보여줘. 결제 취소나 뒤로 가기 상황도 고려하고, 전환율을 해치지 않도록 CTA 우선순위를 명확히 해줘.",
    commonMistake:
      "결제 화면 만들어줘만 요청하면 성공 버튼과 폼만 생기고 실패 복구가 비게 됩니다.",
    improvedRequest:
      "전환 흐름, 실패 복구, 완료 후 안내를 포함한 사용자 여정을 전체로 요청해야 합니다.",
    checklist: [
      "성공뿐 아니라 실패와 취소 흐름을 적었는가",
      "CTA의 우선순위와 문구를 포함했는가",
      "결제 후 완료 화면 안내까지 요청했는가",
      "재시도나 고객센터 연결 같은 복구 경로를 넣었는가",
    ],
  },
  {
    slug: "designer-dashboard-polish",
    title: "디자이너가 대시보드 화면 개선을 AI IDE에 시키기",
    summary:
      "카드, 테이블, 필터 바가 많은 대시보드 화면을 더 읽기 쉽게 개선하도록 요청하는 패턴을 정리했습니다.",
    role: "디자이너",
    level: "중급",
    outcome: "시각적 개선 요청을 구조와 상태까지 포함한 지시문으로 바꾼다.",
    situation:
      "대시보드가 동작은 하지만 정보가 복잡하게 보여서 우선순위와 시각적 위계를 다시 잡아야 하는 상황입니다.",
    docs: ["card-layout", "data-table", "filter-bar", "empty-state", "microcopy"],
    quickPrompt:
      "관리자 대시보드 화면을 더 읽기 쉽게 개선해줘. 카드와 테이블이 너무 복잡해 보여.",
    detailedPrompt:
      "관리자 대시보드 화면을 정보 우선순위가 분명하도록 개선해줘. 상단에는 핵심 KPI 카드, 그 아래에는 필터 바와 데이터 테이블을 배치하고, 비어 있는 상태와 로딩 상태도 설계해줘. 테이블 헤더, 버튼 문구, 보조 설명은 한국어 마이크로카피로 정리해줘. 과한 장식보다 읽기 쉬운 간격, 타이포그래피, 상태 표현을 우선해줘.",
    commonMistake:
      "더 세련되게 만들어줘만 요청하면 장식은 늘어나고 정보 구조는 그대로 남습니다.",
    improvedRequest:
      "정보 우선순위, 상태 표현, 마이크로카피, 필터와 테이블 관계까지 설명해서 요청해야 합니다.",
    checklist: [
      "핵심 지표와 보조 정보의 위계를 요청했는가",
      "빈 상태와 로딩 상태를 함께 설명했는가",
      "마이크로카피와 한국어 UI 문구 기준을 포함했는가",
      "테이블과 필터의 관계를 지정했는가",
    ],
  },
  {
    slug: "designer-state-system",
    title: "디자이너가 빈 상태·로딩 상태·에러 상태를 세트로 시키기",
    summary:
      "정상 화면만 예쁘게 다듬는 대신, 상태별 경험 전체를 요청하는 플레이북입니다.",
    role: "디자이너",
    level: "입문",
    outcome: "상태별 UI를 하나의 시스템으로 묶어 요청한다.",
    situation:
      "메인 화면은 괜찮은데, 데이터가 없거나 실패했을 때 사용자 경험이 허전하고 일관성이 없는 상황입니다.",
    docs: ["empty-state", "loading-state", "error-state", "microcopy", "skeleton"],
    quickPrompt:
      "이 화면의 빈 상태와 로딩 상태도 같이 디자인해줘.",
    detailedPrompt:
      "목록 화면의 상태 시스템을 정리해줘. 데이터가 없는 경우에는 empty state를, 불러오는 중에는 skeleton 기반 로딩 상태를, 오류가 발생했을 때는 에러 상태를 각각 분리해서 설계해줘. 세 상태 모두 톤과 메시지가 일관되게 보이도록 해주고, 사용자가 다음 행동을 바로 이해할 수 있게 CTA와 설명 문구를 넣어줘.",
    commonMistake:
      "비어 있을 때도 예쁘게 해줘만 요청하면 상태별 목적이 분리되지 않습니다.",
    improvedRequest:
      "빈 상태, 로딩 상태, 에러 상태를 서로 다른 목적을 가진 세트로 요청해야 합니다.",
    checklist: [
      "세 상태를 각각 다른 목적과 문구로 설명했는가",
      "CTA와 복구 행동이 포함돼 있는가",
      "시각 톤과 메시지 일관성을 요청했는가",
      "로딩 상태는 실제 레이아웃을 반영하도록 요청했는가",
    ],
  },
  {
    slug: "designer-landing-page-hero",
    title: "디자이너가 랜딩 페이지 히어로 섹션을 시키기",
    summary:
      "그럴듯한 첫 화면이 아니라 메시지, CTA, 신뢰 요소가 명확한 히어로 섹션을 요청하는 패턴입니다.",
    role: "디자이너",
    level: "입문",
    outcome: "히어로 섹션을 브랜드 메시지와 전환 목적이 드러나는 요청으로 바꾼다.",
    situation:
      "랜딩 페이지 첫 화면이 밋밋해서 브랜드 인상과 CTA 흐름을 다시 잡아야 하는 상황입니다.",
    docs: ["hero-section", "call-to-action", "microcopy", "responsive-design", "design-token"],
    quickPrompt:
      "서비스 랜딩 페이지의 첫 화면을 더 인상적으로 만들어줘.",
    detailedPrompt:
      "서비스 랜딩 페이지의 히어로 섹션을 다시 구성해줘. 첫 화면에서 서비스의 핵심 가치를 한 문장으로 전달하고, 주 CTA와 보조 CTA를 분명히 나눠줘. 신뢰 요소로 간단한 보조 문구나 수치를 넣고, 모바일에서도 메시지와 버튼 우선순위가 무너지지 않게 해줘. 과한 장식보다 메시지 전달과 전환 유도를 우선해줘.",
    commonMistake:
      "첫 화면을 멋지게 만들어줘만 요청하면 의미 없는 장식만 늘어날 수 있습니다.",
    improvedRequest:
      "핵심 메시지, CTA 우선순위, 신뢰 요소, 모바일 배치를 함께 요청해야 합니다.",
    checklist: [
      "핵심 메시지 한 줄이 정의돼 있는가",
      "주 CTA와 보조 CTA의 역할이 구분돼 있는가",
      "신뢰 요소나 보조 근거를 요청했는가",
      "모바일에서 우선순위가 유지되도록 설명했는가",
    ],
  },
  {
    slug: "designer-admin-ia",
    title: "디자이너가 관리자 화면 정보 구조를 다시 짜기",
    summary:
      "운영 화면의 섹션 구조와 탐색 흐름을 AI IDE에 재설계시키는 플레이북입니다.",
    role: "디자이너",
    level: "중급",
    outcome: "관리자 정보 구조를 위계와 탐색 기준이 보이는 요청으로 만든다.",
    situation:
      "관리자 페이지에 메뉴와 카드와 표가 많아졌는데, 무엇이 우선인지 사용자가 파악하기 어려운 상황입니다.",
    docs: ["information-architecture", "layout", "breadcrumb", "data-table", "responsive-layout"],
    quickPrompt:
      "관리자 화면 정보 구조를 더 명확하게 다시 구성해줘.",
    detailedPrompt:
      "관리자 페이지 정보 구조를 재정리해줘. 좌측 내비게이션, 상단 페이지 제목, 브레드크럼, 핵심 요약 카드, 목록 테이블의 위계를 다시 잡아줘. 운영자가 현재 어디에 있는지 쉽게 이해할 수 있게 하고, 깊이가 깊은 화면에서도 경로가 보이게 해줘. 페이지마다 공통 레이아웃 규칙이 드러나도록 설계해줘.",
    commonMistake:
      "정리된 느낌으로 바꿔줘만 요청하면 실제 구조보다는 스타일만 바뀌게 됩니다.",
    improvedRequest:
      "내비게이션, 페이지 위계, 브레드크럼, 목록과 상세 관계를 구조 기준으로 요청해야 합니다.",
    checklist: [
      "현재 위치 인지 요소를 포함했는가",
      "공통 레이아웃 규칙을 설명했는가",
      "요약 영역과 상세 영역의 위계를 요청했는가",
      "운영자가 길을 잃지 않도록 경로 표시를 포함했는가",
    ],
  },
  {
    slug: "junior-api-integration",
    title: "주니어 개발자가 API 연결 화면을 AI IDE에 시키기",
    summary:
      "목록 조회와 상세 상태 표시를 포함한 기본적인 API 연동 화면을 안정적으로 요청하는 방법입니다.",
    role: "주니어 개발자",
    level: "입문",
    outcome: "데이터 페칭 화면을 상태까지 포함해 구현하도록 요청한다.",
    situation:
      "API는 준비됐는데 화면에서 어떻게 로딩, 에러, 성공 상태를 분리해서 요청해야 할지 헷갈리는 상황입니다.",
    docs: ["data-fetching", "api", "endpoint", "request-response-schema", "loading-state"],
    quickPrompt:
      "사용자 목록을 불러와서 보여주는 페이지를 만들어줘. API 연결도 같이 해줘.",
    detailedPrompt:
      "Next.js App Router 기준으로 사용자 목록 페이지를 만들어줘. `/api/users` 엔드포인트에서 데이터를 가져오고, 로딩 상태에서는 스켈레톤을 보여줘. 요청 실패 시 에러 상태를 카드 형태로 보여주고, 데이터가 없으면 empty state를 표시해줘. 성공하면 이름, 이메일, 역할을 리스트나 테이블로 보여줘. 타입 정의와 요청/응답 구조도 함께 정리해줘.",
    commonMistake:
      "API 연결해줘만 요청하면 성공 상태만 구현되고 로딩/실패 처리가 빠집니다.",
    improvedRequest:
      "엔드포인트, 응답 구조, 로딩, 에러, 빈 상태까지 한 번에 요청해야 실제 화면 품질이 올라갑니다.",
    checklist: [
      "정확한 엔드포인트를 명시했는가",
      "로딩, 실패, 빈 상태를 포함했는가",
      "타입과 응답 구조까지 요청했는가",
      "화면에 어떤 필드를 보여줄지 적었는가",
    ],
  },
  {
    slug: "junior-form-submit-flow",
    title: "주니어 개발자가 폼 제출 흐름을 AI IDE에 시키기",
    summary:
      "폼 입력, 검증, 제출, 성공/실패 토스트까지 이어지는 기본 제출 흐름을 안정적으로 요청하는 플레이북입니다.",
    role: "주니어 개발자",
    level: "입문",
    outcome: "폼 제출 기능을 상태와 검증 기준까지 포함해 요청한다.",
    situation:
      "폼 UI는 만들 수 있지만 제출 시점의 검증, 로딩, 성공/실패 처리까지 한 번에 정리하기 어려운 상황입니다.",
    docs: ["form", "form-validation", "controlled-component", "toast", "api-error-response"],
    quickPrompt:
      "문의하기 폼을 만들고 제출도 되게 해줘.",
    detailedPrompt:
      "문의하기 폼을 구현해줘. 이름, 이메일, 문의 내용 필드가 필요하고 입력값 검증을 보여줘. 제출 버튼은 요청 중 로딩 상태가 되고, 성공하면 토스트와 초기화가 일어나게 해줘. 실패하면 에러 메시지를 필드 아래나 폼 상단에 보여줘. 서버 응답 구조와 에러 응답도 함께 가정해서 정리해줘.",
    commonMistake:
      "폼 만들어줘만 요청하면 제출 후 상태와 에러 처리가 비게 됩니다.",
    improvedRequest:
      "필드, 검증, 제출 상태, 성공/실패 피드백을 한 흐름으로 묶어서 요청해야 합니다.",
    checklist: [
      "필드와 검증 규칙이 들어갔는가",
      "제출 중 버튼 상태를 요청했는가",
      "성공과 실패 피드백 방식을 정했는가",
      "응답 구조나 에러 응답 가정을 넣었는가",
    ],
  },
  {
    slug: "junior-auth-guard",
    title: "주니어 개발자가 보호된 페이지 흐름을 AI IDE에 시키기",
    summary:
      "로그인 보호, 권한 확인, 리다이렉트, 접근 불가 상태를 포함한 보호된 페이지 구현 플레이북입니다.",
    role: "주니어 개발자",
    level: "중급",
    outcome: "보호된 페이지를 인증과 권한 흐름까지 포함해 요청한다.",
    situation:
      "로그인이 필요한 페이지를 만들고 싶은데, 비로그인과 권한 부족 상태를 어떻게 나눠 처리해야 할지 고민되는 상황입니다.",
    docs: ["auth-flow", "session", "token", "rbac", "permission-policy"],
    quickPrompt:
      "로그인한 사용자만 볼 수 있는 페이지를 만들어줘.",
    detailedPrompt:
      "로그인한 사용자만 접근 가능한 페이지를 구현해줘. 비로그인 사용자가 접근하면 로그인 페이지로 보내고, 로그인은 했지만 권한이 없는 사용자는 접근 불가 화면을 보여줘. 세션이 만료되면 다시 로그인하도록 안내해줘. 페이지 헤더나 메뉴는 사용자 역할에 따라 다르게 보여주고, 보호 로직이 어디에서 동작하는지도 함께 설명해줘.",
    commonMistake:
      "로그인한 사용자만 보게 해줘만 요청하면 권한 부족과 세션 만료가 빠집니다.",
    improvedRequest:
      "비로그인, 권한 부족, 세션 만료를 구분해서 각각 어떤 UI를 보여줄지 요청해야 합니다.",
    checklist: [
      "비로그인 사용자의 리다이렉트 규칙이 있는가",
      "권한 부족 상태 UI를 요청했는가",
      "세션 만료 시 후속 행동을 포함했는가",
      "역할별 메뉴나 버튼 차이를 설명했는가",
    ],
  },
  {
    slug: "junior-list-performance",
    title: "주니어 개발자가 긴 목록 성능을 AI IDE에 시키기",
    summary:
      "무한 스크롤, 스켈레톤, 캐시, 디바운스를 묶어 실제로 쓸만한 목록 경험을 구현하도록 요청하는 플레이북입니다.",
    role: "주니어 개발자",
    level: "중급",
    outcome: "긴 목록 화면을 성능과 UX를 함께 고려해 요청한다.",
    situation:
      "데이터 양이 많아지면서 목록 화면이 느려지고, 검색과 스크롤 경험도 어색해진 상황입니다.",
    docs: ["infinite-scroll-ui", "infinite-scroll-logic", "frontend-cache", "debounce", "skeleton"],
    quickPrompt:
      "긴 목록 페이지를 부드럽게 동작하게 만들어줘.",
    detailedPrompt:
      "아이템이 많은 목록 페이지를 최적화해줘. 초기 로딩에는 스켈레톤을 보여주고, 스크롤 하단에 도달하면 추가 데이터를 불러오게 해줘. 검색 입력은 디바운스를 적용하고, 이미 불러온 데이터는 캐시를 활용해 재요청을 줄여줘. 모바일에서도 끊김이 적고, 데이터가 더 없을 때는 적절한 끝 상태 메시지를 보여줘.",
    commonMistake:
      "목록을 빠르게 해줘만 요청하면 무엇을 최적화해야 하는지 흐릿해집니다.",
    improvedRequest:
      "스크롤, 검색, 캐시, 로딩 상태를 함께 묶어서 어떤 경험을 원하는지 구체화해야 합니다.",
    checklist: [
      "추가 로딩 트리거 방식을 적었는가",
      "검색 입력 디바운스를 포함했는가",
      "캐시나 재요청 감소 전략을 요청했는가",
      "데이터가 끝났을 때의 상태를 설명했는가",
    ],
  },
  {
    slug: "search-feature-playbook",
    title: "검색 기능 전체를 AI IDE에 단계적으로 시키기",
    summary:
      "검색 입력 UI, 검색 API, 결과 상태, 검색 인덱스까지 한 흐름으로 다루는 기능 단위 플레이북입니다.",
    role: "주니어 개발자",
    level: "중급",
    outcome: "검색 기능을 UI와 데이터 구조를 함께 고려해 요청한다.",
    situation:
      "검색창만 필요한 게 아니라 실제로 빠르고 쓸만한 검색 경험을 구현해야 하는 상황입니다.",
    docs: ["search-bar", "search-api", "search-index", "debounce", "empty-state"],
    quickPrompt: "검색창과 검색 결과 페이지를 만들어줘.",
    detailedPrompt:
      "검색 기능 전체를 구현해줘. 상단에는 디바운스가 적용된 검색 입력을 두고, 검색어가 바뀌면 검색 API를 호출해 결과를 보여줘. 결과가 없을 때는 empty state를 보여주고, 검색 중에는 로딩 상태를 표시해줘. 검색 인덱스나 검색 API 설계 관점에서 필요한 데이터 구조도 함께 제안해줘. 모바일에서도 잘 동작해야 하고, 검색어 강조 표시가 있으면 좋겠어.",
    commonMistake:
      "검색창만 만들어줘라고 하면 실제 검색 결과 흐름과 데이터 구조가 빠집니다.",
    improvedRequest:
      "입력 UI, API, 결과 상태, 인덱스 구조까지 한 기능으로 묶어서 요청하는 편이 좋습니다.",
    checklist: [
      "디바운스 여부를 요청했는가",
      "결과 없음과 로딩 상태를 포함했는가",
      "검색 API 또는 인덱스 구조를 함께 요청했는가",
      "모바일 사용성까지 언급했는가",
    ],
  },
  {
    slug: "auth-flow-playbook",
    title: "로그인과 권한 흐름을 AI IDE에 시키기",
    summary:
      "로그인 화면 한 장이 아니라 인증, 세션, 권한 부족, 만료 처리까지 포함한 흐름을 요청하는 방법입니다.",
    role: "기획자",
    level: "중급",
    outcome: "로그인 성공 외의 예외 상황까지 포함한 인증 요구사항을 정리한다.",
    situation:
      "로그인 기능을 만들고 싶은데, 비로그인 상태와 권한 부족 상태까지 어떻게 설명해야 할지 필요한 상황입니다.",
    docs: ["auth-flow", "session", "token", "rbac", "permission-policy"],
    quickPrompt: "로그인 페이지와 인증 흐름을 만들어줘.",
    detailedPrompt:
      "이 서비스의 로그인 흐름을 설계하고 구현해줘. 이메일/비밀번호 로그인 화면이 필요하고, 로그인 성공 시 대시보드로 이동해야 해. 비로그인 사용자가 보호된 페이지에 접근하면 로그인 페이지로 보내고, 토큰이나 세션이 만료되면 재로그인을 안내해줘. 권한이 없는 사용자는 접근 불가 메시지를 보여주고, 역할별로 메뉴 노출도 달라지게 해줘. 이 흐름을 화면과 상태 기준으로 정리해줘.",
    commonMistake:
      "로그인 페이지 만들어줘만 요청하면 인증 만료나 권한 부족 상황이 빠집니다.",
    improvedRequest:
      "성공, 비로그인, 만료, 권한 부족 네 가지 상태를 모두 포함해서 요청해야 합니다.",
    checklist: [
      "보호된 페이지 접근 시 동작을 정의했는가",
      "세션 만료나 토큰 만료를 포함했는가",
      "권한 부족 상태와 메시지를 요청했는가",
      "역할별 메뉴/화면 차이를 설명했는가",
    ],
  },
  {
    slug: "admin-dashboard-playbook",
    title: "관리자 페이지를 AI IDE에 기능 묶음으로 시키기",
    summary:
      "필터, 정렬, 테이블, 페이지네이션, 상태 표현까지 포함한 관리자 페이지 요청 패턴입니다.",
    role: "디자이너",
    level: "중급",
    outcome: "관리자 화면을 단순 목록이 아니라 운영 도구 관점으로 요청한다.",
    situation:
      "운영자가 실제로 매일 쓰는 관리자 페이지를 만들어야 해서 검색성과 조작성을 동시에 챙겨야 하는 상황입니다.",
    docs: ["data-table", "filter-bar", "sorting-ui", "pagination", "pagination-api"],
    quickPrompt: "관리자 목록 페이지를 만들어줘.",
    detailedPrompt:
      "운영자가 매일 사용하는 관리자 목록 페이지를 만들어줘. 상단에는 검색과 필터 바를 두고, 목록은 데이터 테이블로 보여줘. 정렬 기능과 페이지네이션이 필요하고, 선택된 행에 대한 빠른 액션도 있으면 좋겠어. 빈 상태, 로딩 상태, 에러 상태를 각각 분리해서 보여주고, 모바일에서는 카드형 리스트로 자연스럽게 바뀌게 해줘.",
    commonMistake:
      "관리자 목록 페이지 만들어줘만 요청하면 운영 효율보다 화면 출력만 구현되기 쉽습니다.",
    improvedRequest:
      "운영자가 반복적으로 수행할 작업과 상태 전환을 먼저 설명하고 요청해야 합니다.",
    checklist: [
      "검색, 필터, 정렬, 페이지네이션을 함께 요청했는가",
      "행 단위 액션이나 빠른 조작 흐름을 설명했는가",
      "모바일 대응 방식을 적었는가",
      "운영 상태별 UI를 분리해 요청했는가",
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
