export type CasebookLevel = "입문" | "중급";
export type CasebookRole = "기획자" | "디자이너" | "주니어 개발자";

export type Casebook = {
  slug: string;
  title: string;
  summary: string;
  level: CasebookLevel;
  roles: CasebookRole[];
  goal: string;
  situation: string;
  deliverables: string[];
  stages: Array<{
    title: string;
    description: string;
  }>;
  docs: string[];
  playbooks: string[];
  guides: string[];
  quickPrompt: string;
  detailedPrompt: string;
  commonMistake: string;
  improvedRequest: string;
  acceptanceChecklist: string[];
  nextCasebooks: string[];
  workouts?: string[];
  roleNotes?: string[];
  operationsNotes?: string[];
  relatedScenarios?: string[];
};

const CASEBOOKS: Casebook[] = [
  {
    slug: "signup-project",
    title: "회원가입 기능 완성 사례",
    summary:
      "회원가입 화면, 입력 검증, 성공과 실패 상태, 가입 후 다음 행동까지 한 번에 설계하는 사례집입니다.",
    level: "입문",
    roles: ["기획자", "디자이너", "주니어 개발자"],
    goal:
      "회원가입을 단일 폼이 아니라 화면, 상태, 검증, 결과 안내까지 포함한 완성형 기능으로 요청할 수 있게 만듭니다.",
    situation:
      "새 서비스의 첫 진입 경험에서 회원가입이 어색하면 전환율이 크게 떨어집니다. 이 사례는 요구사항을 흩어진 조각이 아니라 하나의 기능 흐름으로 AI IDE에 전달하는 방법을 다룹니다.",
    deliverables: [
      "회원가입 화면과 필수 입력 항목",
      "입력 오류, 로딩, 성공 상태 정의",
      "가입 완료 후 다음 행동 안내",
      "가입 API 요청과 응답 처리",
    ],
    stages: [
      {
        title: "요구사항 정리",
        description:
          "필수 입력값, 성공 기준, 실패 메시지와 이동 경로를 먼저 고정합니다.",
      },
      {
        title: "화면 구조 설계",
        description:
          "폼 레이아웃, CTA, 도움말 문구, 상태별 UI를 분리해 정리합니다.",
      },
      {
        title: "검증과 상태 처리",
        description:
          "입력 검증, 제출 중 상태, 가입 성공/실패 메시지까지 한 번에 포함합니다.",
      },
      {
        title: "가입 후 다음 단계 연결",
        description:
          "이메일 인증, 온보딩, 첫 로그인 안내처럼 다음 행동을 명확히 연결합니다.",
      },
    ],
    docs: ["form", "form-validation", "component", "api", "success-criteria"],
    playbooks: ["planner-signup-page", "junior-form-submit-flow"],
    guides: ["signup-feature"],
    quickPrompt: `회원가입 페이지를 만들어줘. 이름, 이메일, 비밀번호를 입력받고 필수 검증을 넣어줘. 제출 중 상태와 가입 성공, 실패 상태를 보여주고 가입 완료 후 로그인 또는 온보딩으로 이동할 수 있게 해줘.`,
    detailedPrompt: `Next.js App Router 기준으로 회원가입 기능을 만들어줘.

- 필드: 이름, 이메일, 비밀번호, 비밀번호 확인
- 검증: 이메일 형식, 비밀번호 최소 길이, 비밀번호 확인 일치
- 상태: 기본 / 입력 오류 / 제출 중 / 가입 성공 / 가입 실패
- 성공 후: 온보딩 시작 버튼과 로그인 버튼 둘 다 노출
- 실패 후: 서버 에러 메시지를 사용자 친화적인 문장으로 바꿔서 보여줘
- 모바일에서도 버튼과 입력 폼이 자연스럽게 보이게 해줘
- 접근성을 위해 label, aria-invalid, 에러 텍스트 연결도 포함해줘`,
    commonMistake: "회원가입 페이지 하나 만들어줘. 이메일이랑 비밀번호만 있으면 돼.",
    improvedRequest:
      "회원가입 기능 전체를 만들어줘. 필드, 검증, 제출 상태, 성공/실패 결과, 가입 후 다음 행동까지 포함해서 설계해줘.",
    acceptanceChecklist: [
      "잘못된 이메일 형식이면 제출 전에 오류 문구가 보인다.",
      "비밀번호 확인이 일치하지 않으면 제출되지 않는다.",
      "제출 중에는 버튼이 비활성화되고 로딩 상태가 보인다.",
      "가입 성공 시 다음 행동 CTA가 보인다.",
      "가입 실패 시 사용자 친화적인 오류 문구가 보인다.",
    ],
    nextCasebooks: ["auth-project", "onboarding-project"],
    workouts: ["signup-request-fix", "form-submit-finish"],
    roleNotes: [
      "기획자는 가입 완료 후 무엇을 하게 할지까지 정의해야 합니다.",
      "디자이너는 오류 상태와 성공 상태를 같은 밀도로 설계해야 합니다.",
      "주니어 개발자는 폼 검증과 응답 상태를 같은 기능 단위로 다뤄야 합니다.",
    ],
    operationsNotes: [
      "가입 성공 이벤트와 실패 이벤트를 구분해 추적할 수 있게 요청하면 운영 분석이 쉬워집니다.",
    ],
    relatedScenarios: ["signup-flow"],
  },
  {
    slug: "auth-project",
    title: "로그인·권한 기능 완성 사례",
    summary:
      "로그인 화면, 보호된 페이지, 세션 만료, 권한 부족까지 포함한 인증 기능 사례집입니다.",
    level: "입문",
    roles: ["기획자", "주니어 개발자"],
    goal:
      "인증을 로그인 화면 하나가 아니라 접근 제어 흐름 전체로 요청할 수 있게 만듭니다.",
    situation:
      "로그인만 구현하고 끝내면 실제 서비스에서는 세션 만료, 권한 부족, 비로그인 접근 같은 핵심 예외가 빠집니다. 이 사례는 그 누락을 막는 구조를 제공합니다.",
    deliverables: [
      "로그인 화면과 기본 검증",
      "보호된 페이지 접근 제어",
      "세션 만료 대응",
      "권한 부족 안내 화면",
    ],
    stages: [
      {
        title: "인증 경계 정의",
        description:
          "어떤 화면이 로그인 필요인지, 어떤 역할이 접근 가능한지 정의합니다.",
      },
      {
        title: "로그인 경험 설계",
        description:
          "로그인 폼, 오류 상태, 로그인 후 이동 경로를 설계합니다.",
      },
      {
        title: "보호된 라우트 처리",
        description:
          "비로그인, 세션 만료, 권한 부족 상태를 각각 분리해 처리합니다.",
      },
      {
        title: "운영 메시지 정리",
        description:
          "사용자가 왜 막혔는지 이해할 수 있는 문구를 넣습니다.",
      },
    ],
    docs: ["auth-flow", "session", "token", "rbac", "permission-policy"],
    playbooks: ["auth-flow-playbook", "junior-auth-guard"],
    guides: ["auth-feature"],
    quickPrompt:
      "로그인 기능을 만들어줘. 로그인 화면과 보호된 페이지 접근 제어를 포함하고, 세션 만료와 권한 부족 상태도 분리해서 처리해줘.",
    detailedPrompt: `Next.js 기준으로 로그인과 권한 기능을 구현해줘.

- 로그인 폼: 이메일, 비밀번호
- 보호 대상: 대시보드, 관리자 화면
- 상태: 비로그인 접근, 로그인 실패, 세션 만료, 권한 부족
- 세션 만료 시: 다시 로그인 안내와 이전 작업 유실 가능성 안내
- 권한 부족 시: 접근 불가 이유와 홈으로 돌아가기 버튼 제공
- 로그인 성공 시: 이전에 보려던 페이지로 복귀 가능하면 처리
- 문구는 사용자 친화적인 한국어로 작성`,
    commonMistake: "로그인 기능이랑 관리자 권한도 같이 넣어줘.",
    improvedRequest:
      "로그인, 보호된 페이지, 세션 만료, 권한 부족을 각각 다른 상태로 보여주는 인증 흐름 전체를 만들어줘.",
    acceptanceChecklist: [
      "비로그인 상태에서 보호된 페이지에 접근하면 로그인 화면으로 이동한다.",
      "세션이 만료되면 다시 로그인해야 한다는 안내가 보인다.",
      "권한이 없는 사용자는 권한 부족 화면을 본다.",
      "로그인 실패 시 원인을 추측하기 쉬운 문구가 보인다.",
    ],
    nextCasebooks: ["settings-permission-project", "approval-project"],
    workouts: ["auth-edge-state", "api-integration-request"],
    roleNotes: [
      "기획자는 비로그인, 만료, 권한 부족을 하나로 뭉개지 말고 구분해야 합니다.",
      "주니어 개발자는 세션 저장 방식과 라우트 보호 방식이 분리되어 있음을 이해해야 합니다.",
    ],
    operationsNotes: [
      "로그인 실패 횟수와 세션 만료 빈도를 따로 보면 실제 운영 이슈를 더 빨리 찾을 수 있습니다.",
    ],
    relatedScenarios: ["auth-flow"],
  },
  {
    slug: "search-project",
    title: "검색 기능 완성 사례",
    summary:
      "검색 입력, 검색 API, 결과 상태, 정렬과 빈 결과까지 포함한 검색 기능 사례집입니다.",
    level: "입문",
    roles: ["기획자", "주니어 개발자"],
    goal:
      "검색 기능을 입력창 하나가 아니라 결과 경험 전체로 설계하고 요청할 수 있게 만듭니다.",
    situation:
      "검색은 입력창만 있으면 끝나는 것처럼 보이지만, 실제로는 빈 결과, 로딩, 정렬, API 응답 속도, 결과 카드 구조까지 함께 설계해야 합니다.",
    deliverables: [
      "검색 입력과 검색 버튼 또는 즉시 검색 방식",
      "결과 목록, 로딩, 빈 결과, 오류 상태",
      "정렬과 필터 조건",
      "검색 API와 결과 카드 구조",
    ],
    stages: [
      {
        title: "검색 범위 정의",
        description:
          "무엇을 검색하는지, 어떤 필드를 기준으로 찾는지 먼저 정합니다.",
      },
      {
        title: "결과 상태 분리",
        description:
          "로딩, 결과 있음, 결과 없음, 오류를 따로 설계합니다.",
      },
      {
        title: "정렬과 필터 연결",
        description:
          "검색어 외에도 정렬과 필터가 동시에 동작하도록 정의합니다.",
      },
      {
        title: "성능과 피드백 보강",
        description:
          "입력 지연, 디바운스, 느린 응답 시 안내를 요청에 포함합니다.",
      },
    ],
    docs: ["search-bar", "search-api", "sorting-ui", "filter-bar", "search-index"],
    playbooks: ["search-feature-playbook", "junior-list-performance"],
    guides: ["search-feature-guide"],
    quickPrompt:
      "검색 기능을 만들어줘. 검색 입력, 로딩 상태, 결과 목록, 빈 결과 상태, 정렬까지 포함해서 보여줘.",
    detailedPrompt: `검색 기능 전체를 만들어줘.

- 검색 입력창과 즉시 검색 또는 버튼 제출 방식 중 어떤 방식을 쓰는지 명시해줘
- 상태: 초기, 검색 중, 결과 있음, 결과 없음, 오류
- 결과 목록은 카드형으로 보여주고 검색어와 관련된 핵심 정보가 먼저 보이게 해줘
- 정렬 옵션과 필터 바를 함께 둘 수 있게 해줘
- API 응답이 느릴 때 스켈레톤 또는 로딩 문구를 보여줘
- 모바일에서도 입력창, 필터, 결과 카드가 겹치지 않게 배치해줘`,
    commonMistake: "검색창 하나 넣고 검색되게 해줘.",
    improvedRequest:
      "검색 입력부터 결과 상태, 정렬, 빈 결과, 느린 응답 대응까지 포함한 검색 경험 전체를 만들어줘.",
    acceptanceChecklist: [
      "검색 중 상태가 명확히 보인다.",
      "결과가 없을 때 다음 행동이 안내된다.",
      "정렬과 필터가 검색 결과와 함께 동작한다.",
      "느린 응답에서도 화면이 멈춘 것처럼 보이지 않는다.",
    ],
    nextCasebooks: ["list-performance-project", "analytics-dashboard-project"],
    workouts: ["search-performance-request", "api-requirements-spec"],
    roleNotes: [
      "기획자는 무엇을 검색하는지와 어떤 결과가 나와야 하는지를 같이 적어야 합니다.",
      "주니어 개발자는 검색 API, 정렬, 디바운스가 서로 연결된다는 점을 요청에 포함해야 합니다.",
    ],
    operationsNotes: [
      "검색어 입력 이벤트와 결과 클릭 이벤트를 함께 추적하면 실제 검색 품질을 개선하기 쉽습니다.",
    ],
    relatedScenarios: ["search-feature"],
  },
  {
    slug: "approval-project",
    title: "관리자 승인 기능 완성 사례",
    summary:
      "승인 대기 목록, 상세 확인, 승인/반려 액션, 처리 결과 반영까지 다루는 관리자 사례집입니다.",
    level: "중급",
    roles: ["기획자", "디자이너", "주니어 개발자"],
    goal:
      "관리자 승인 화면을 목록과 버튼이 아니라 검토 흐름 전체로 요청할 수 있게 만듭니다.",
    situation:
      "관리자 기능은 일반 사용자 화면과 달리 처리 근거, 상태 변화, 반려 이유, 감사 로그까지 고려해야 합니다.",
    deliverables: [
      "승인 대기 목록과 상태 배지",
      "상세 확인 화면",
      "승인 및 반려 액션",
      "처리 결과와 재조회 반영",
    ],
    stages: [
      {
        title: "검토 대상 정의",
        description:
          "무엇을 승인하는지, 어떤 정보를 목록과 상세에서 보여줄지 정합니다.",
      },
      {
        title: "액션 흐름 설계",
        description:
          "승인과 반려에 필요한 입력, 확인, 결과 반영을 구분합니다.",
      },
      {
        title: "상태 동기화",
        description:
          "처리 후 목록과 상세에 상태가 즉시 반영되도록 요청합니다.",
      },
      {
        title: "운영 근거 보강",
        description:
          "반려 사유, 처리 시간, 담당자 표시처럼 운영 요소를 함께 설계합니다.",
      },
    ],
    docs: ["data-table", "confirmation-flow", "api", "edge-case", "analytics-event"],
    playbooks: ["planner-admin-workflow", "designer-admin-ia", "admin-dashboard-playbook"],
    guides: ["approval-feature-guide", "admin-dashboard-feature"],
    quickPrompt:
      "관리자 승인 기능을 만들어줘. 승인 대기 목록과 상세 화면, 승인/반려 액션, 처리 결과 반영까지 포함해줘.",
    detailedPrompt: `관리자 승인 기능을 만들어줘.

- 승인 대기 목록: 상태 배지, 신청자, 신청일, 핵심 요약 정보
- 상세 화면: 검토에 필요한 정보 전체 확인
- 액션: 승인, 반려
- 반려 시: 반려 사유 입력 필수
- 승인/반려 전: 확인 모달 제공
- 처리 후: 목록과 상세에 상태가 즉시 반영되게 해줘
- 운영 관점에서 처리자와 처리 시각도 노출할 수 있게 설계해줘`,
    commonMistake: "관리자 페이지에서 승인 버튼이랑 반려 버튼 넣어줘.",
    improvedRequest:
      "관리자 승인 기능을 목록, 상세, 확인, 반영, 운영 정보까지 포함한 검토 흐름으로 만들어줘.",
    acceptanceChecklist: [
      "반려 시 반려 사유 없이 제출되지 않는다.",
      "처리 후 상태가 목록과 상세에 일관되게 반영된다.",
      "실수 방지를 위한 확인 단계가 있다.",
      "운영자가 어떤 항목을 처리했는지 추적할 수 있다.",
    ],
    nextCasebooks: ["settings-permission-project", "analytics-dashboard-project"],
    workouts: ["approval-flow-clarify", "success-criteria-writing"],
    roleNotes: [
      "기획자는 승인 근거와 반려 사유를 분리해 정의해야 합니다.",
      "디자이너는 목록과 상세의 정보 밀도를 다르게 설계해야 합니다.",
      "주니어 개발자는 처리 결과가 즉시 반영되는 상태 동기화까지 포함해 요청해야 합니다.",
    ],
    operationsNotes: [
      "승인 완료, 반려 완료, 반려 사유 작성 이벤트를 따로 보면 운영 효율을 분석하기 좋습니다.",
    ],
    relatedScenarios: ["admin-approval"],
  },
  {
    slug: "checkout-project",
    title: "결제 전환 기능 완성 사례",
    summary:
      "주문 확인, 결제 수단 선택, 실패 복구, 완료 화면까지 포함한 결제 사례집입니다.",
    level: "중급",
    roles: ["기획자", "디자이너", "주니어 개발자"],
    goal:
      "결제 전환을 화면 하나가 아니라 전환율과 오류 복구까지 포함한 흐름으로 요청할 수 있게 합니다.",
    situation:
      "결제는 성공 케이스보다 실패와 이탈을 어떻게 줄이느냐가 더 중요합니다. 이 사례는 결제 성공률과 사용자 신뢰를 같이 고려합니다.",
    deliverables: [
      "주문 요약과 결제 금액 확인",
      "결제 수단 선택 UI",
      "결제 진행/실패/완료 상태",
      "실패 복구와 재시도 흐름",
    ],
    stages: [
      {
        title: "전환 기준 정의",
        description:
          "무엇이 결제 성공인지, 실패 시 사용자가 무엇을 할 수 있어야 하는지 정합니다.",
      },
      {
        title: "결제 화면 구성",
        description:
          "주문 정보, 금액, 결제 수단, CTA를 분리합니다.",
      },
      {
        title: "실패 복구 설계",
        description:
          "결제 실패, 네트워크 오류, 중복 결제 방지 대응을 함께 요청합니다.",
      },
      {
        title: "완료 후 연결",
        description:
          "완료 화면과 후속 CTA를 명확히 설계합니다.",
      },
    ],
    docs: ["call-to-action", "retry", "idempotency", "fallback", "success-criteria"],
    playbooks: ["planner-checkout-flow", "designer-landing-page-hero"],
    guides: ["checkout-feature"],
    quickPrompt:
      "결제 전환 기능을 만들어줘. 주문 요약, 결제 수단 선택, 결제 실패 복구, 완료 화면까지 포함해줘.",
    detailedPrompt: `결제 기능을 만들어줘.

- 주문 요약 카드와 총 결제 금액을 상단에 보여줘
- 결제 수단 선택 UI를 분리해줘
- 상태: 기본, 결제 진행 중, 결제 실패, 결제 완료
- 실패 시: 다시 시도하기, 고객센터 안내, 결제 수단 변경 CTA 제공
- 중복 클릭이나 중복 결제를 막는 처리도 포함해줘
- 완료 후: 주문 내역 보기와 홈으로 돌아가기 CTA 제공
- 모바일에서도 CTA가 항상 보이거나 쉽게 접근되도록 설계해줘`,
    commonMistake: "결제 페이지 만들어줘. 카드 결제만 있으면 돼.",
    improvedRequest:
      "결제 전환 기능을 주문 확인부터 실패 복구, 완료 화면, 중복 결제 방지까지 포함해서 만들어줘.",
    acceptanceChecklist: [
      "결제 진행 중에는 중복 제출이 되지 않는다.",
      "결제 실패 시 재시도와 다른 선택지가 제공된다.",
      "결제 완료 후 다음 행동이 명확히 제시된다.",
      "모바일에서도 CTA 접근성이 유지된다.",
    ],
    nextCasebooks: ["notification-project", "analytics-dashboard-project"],
    workouts: ["success-criteria-writing", "landing-hero-brief"],
    roleNotes: [
      "기획자는 실패 복구와 완료 후 흐름을 반드시 함께 적어야 합니다.",
      "디자이너는 금액, CTA, 신뢰 문구의 우선순위를 화면에서 분명히 보여줘야 합니다.",
      "주니어 개발자는 중복 제출과 결제 오류 상태를 각각 분리해 요청해야 합니다.",
    ],
    operationsNotes: [
      "결제 시작, 결제 실패, 결제 완료 이벤트를 구분하면 전환율 분석이 쉬워집니다.",
    ],
    relatedScenarios: ["checkout-flow"],
  },
  {
    slug: "file-upload-project",
    title: "파일 업로드 기능 완성 사례",
    summary:
      "파일 선택, 업로드 진행 상태, 미리보기, 실패 재시도까지 포함한 업로드 사례집입니다.",
    level: "입문",
    roles: ["디자이너", "주니어 개발자"],
    goal:
      "파일 업로드를 단순 input이 아니라 진행 상태와 실패 복구가 있는 경험으로 요청할 수 있게 만듭니다.",
    situation:
      "파일 업로드는 선택만 구현하면 끝난 것처럼 보이지만, 실제로는 허용 형식, 용량 제한, 업로드 진행 상태, 실패 재시도가 중요합니다.",
    deliverables: [
      "파일 선택 UI",
      "업로드 진행률과 상태 표시",
      "미리보기 또는 업로드 결과",
      "실패 재시도 흐름",
    ],
    stages: [
      {
        title: "업로드 규칙 정의",
        description:
          "허용 형식, 용량 제한, 업로드 대상 위치를 정의합니다.",
      },
      {
        title: "선택과 미리보기 설계",
        description:
          "선택 전, 선택 후, 업로드 완료 후 상태를 구분합니다.",
      },
      {
        title: "진행 상태 처리",
        description:
          "업로드 중 진행률과 취소 가능 여부를 설계합니다.",
      },
      {
        title: "오류 복구 설계",
        description:
          "형식 오류, 용량 초과, 네트워크 실패를 구분합니다.",
      },
    ],
    docs: ["file-upload", "loading-state", "error-state", "microcopy", "fallback"],
    playbooks: ["designer-state-system", "junior-form-submit-flow"],
    guides: ["file-upload-feature"],
    quickPrompt:
      "파일 업로드 기능을 만들어줘. 파일 선택, 업로드 진행률, 미리보기, 실패 재시도까지 포함해줘.",
    detailedPrompt: `파일 업로드 기능을 만들어줘.

- 허용 형식과 최대 용량을 명확히 안내해줘
- 상태: 업로드 전, 업로드 중, 업로드 완료, 업로드 실패
- 업로드 중에는 진행률을 보여줘
- 이미지 업로드면 미리보기를 제공해줘
- 실패 시 재시도 버튼과 실패 이유를 같이 보여줘
- 잘못된 형식이나 용량 초과는 업로드 전에 안내해줘`,
    commonMistake: "이미지 업로드 기능만 넣어줘.",
    improvedRequest:
      "파일 업로드 기능을 선택, 진행 상태, 미리보기, 실패 재시도까지 포함한 경험으로 만들어줘.",
    acceptanceChecklist: [
      "허용되지 않는 형식은 업로드 전에 막힌다.",
      "업로드 중 상태가 명확히 보인다.",
      "업로드 실패 시 재시도할 수 있다.",
      "업로드 완료 후 결과가 화면에 반영된다.",
    ],
    nextCasebooks: ["profile-settings-project", "notification-project"],
    workouts: ["upload-experience-upgrade", "form-submit-finish"],
    roleNotes: [
      "디자이너는 선택 전과 업로드 후 화면 차이를 명확히 설계해야 합니다.",
      "주니어 개발자는 파일 형식 검증과 업로드 상태 동기화를 같이 요청해야 합니다.",
    ],
    operationsNotes: [
      "업로드 실패 유형을 나누어 추적하면 실제 운영 장애를 더 빠르게 찾을 수 있습니다.",
    ],
    relatedScenarios: ["upload-flow"],
  },
  {
    slug: "profile-settings-project",
    title: "프로필 설정 기능 완성 사례",
    summary:
      "프로필 정보 수정, 비밀번호 변경, 저장 상태, 변경 성공 피드백까지 포함한 설정 사례집입니다.",
    level: "입문",
    roles: ["기획자", "주니어 개발자"],
    goal:
      "프로필 설정을 작은 폼이 아니라 계정 관리 경험 전체로 요청할 수 있게 합니다.",
    situation:
      "프로필 설정은 자주 바뀌지 않는 화면이지만, 저장 상태와 보안 관련 변경이 섞이기 때문에 요청이 모호하면 완성도가 크게 떨어집니다.",
    deliverables: [
      "프로필 정보 수정 화면",
      "비밀번호 변경 영역",
      "저장 중/저장 완료 상태",
      "실패 복구와 안내 메시지",
    ],
    stages: [
      {
        title: "설정 범위 분리",
        description:
          "프로필 정보와 보안 설정을 같은 카드에 섞지 말고 구분합니다.",
      },
      {
        title: "저장 흐름 설계",
        description:
          "변경 전, 변경 중, 저장 완료 상태를 각각 설계합니다.",
      },
      {
        title: "보안 입력 처리",
        description:
          "비밀번호 변경은 별도 검증과 성공/실패 메시지를 둡니다.",
      },
    ],
    docs: ["form", "controlled-component", "token", "success-criteria"],
    playbooks: ["junior-form-submit-flow"],
    guides: ["profile-settings-feature"],
    quickPrompt:
      "프로필 설정 화면을 만들어줘. 프로필 정보 수정, 비밀번호 변경, 저장 상태와 성공 피드백을 포함해줘.",
    detailedPrompt: `프로필 설정 기능을 만들어줘.

- 프로필 정보 수정과 비밀번호 변경 영역을 분리해줘
- 상태: 기본, 수정 중, 저장 중, 저장 완료, 저장 실패
- 저장 완료 시 짧은 성공 피드백을 보여줘
- 비밀번호 변경은 현재 비밀번호, 새 비밀번호, 새 비밀번호 확인 필드를 포함해줘
- 민감한 정보 변경이라 접근성 라벨과 오류 안내를 명확히 넣어줘`,
    commonMistake: "프로필 수정 페이지 하나 만들어줘.",
    improvedRequest:
      "프로필 수정과 보안 설정을 분리하고 저장 상태와 성공/실패 피드백까지 포함한 설정 기능을 만들어줘.",
    acceptanceChecklist: [
      "저장 중 상태가 보인다.",
      "프로필 정보와 보안 설정이 분리되어 있다.",
      "비밀번호 확인이 맞지 않으면 저장되지 않는다.",
    ],
    nextCasebooks: ["settings-permission-project", "notification-project"],
    workouts: ["form-submit-finish"],
    roleNotes: [
      "기획자는 어떤 정보가 즉시 반영되는지, 어떤 정보는 재로그인이 필요한지 구분해야 합니다.",
      "주니어 개발자는 프로필 수정과 비밀번호 변경을 같은 저장 액션으로 뭉개지 말고 별도 흐름으로 다뤄야 합니다.",
      "디자이너가 함께 보는 경우에는 저장 성공과 실패 피드백의 밀도를 맞추고, 민감한 변경에 더 강한 안내 문구를 배치해야 합니다.",
    ],
    operationsNotes: [
      "프로필 변경과 비밀번호 변경 이벤트를 분리해 추적하면 보안 운영에 도움이 됩니다.",
      "민감한 정보가 바뀌었을 때 재인증 또는 알림 메일이 필요한지도 함께 검토해야 운영 품질이 높아집니다.",
      "비밀번호 변경 실패율과 재시도 빈도를 함께 보면 보안 정책이 과도하게 사용성을 해치고 있는지 확인하기 쉽습니다.",
    ],
    relatedScenarios: ["settings-flow"],
  },
  {
    slug: "notification-project",
    title: "알림 기능 완성 사례",
    summary:
      "알림 목록, 읽음 처리, 우선순위, 빈 상태까지 포함한 알림 경험 사례집입니다.",
    level: "입문",
    roles: ["디자이너", "주니어 개발자"],
    goal:
      "알림을 단순 토스트가 아니라 장기 보관과 읽음 상태가 있는 기능으로 요청할 수 있게 만듭니다.",
    situation:
      "실서비스의 알림은 토스트만으로 끝나지 않습니다. 목록, 읽음 처리, 중요도, 빈 상태가 함께 설계되어야 합니다.",
    deliverables: [
      "알림 드롭다운 또는 패널",
      "알림 목록",
      "읽음/전체 읽음 처리",
      "빈 상태와 우선순위 표현",
    ],
    stages: [
      {
        title: "알림 목적 구분",
        description:
          "즉시성 알림과 기록형 알림을 나눕니다.",
      },
      {
        title: "목록과 상태 설계",
        description:
          "읽지 않음, 읽음, 중요 알림을 화면에서 구분합니다.",
      },
      {
        title: "행동 연결",
        description:
          "알림 클릭 시 어디로 이동하는지와 읽음 처리 시점을 정합니다.",
      },
    ],
    docs: ["toast", "empty-state", "microcopy", "loading-state"],
    playbooks: ["designer-state-system"],
    guides: ["notification-feature-guide"],
    quickPrompt:
      "알림 기능을 만들어줘. 읽지 않은 알림 강조, 목록, 읽음 처리, 빈 상태까지 포함해줘.",
    detailedPrompt: `알림 기능을 만들어줘.

- 읽지 않은 알림은 시각적으로 강조
- 알림 목록, 전체 읽음 처리, 알림 클릭 시 상세 화면 이동
- 상태: 알림 있음, 알림 없음, 로딩, 오류
- 중요한 알림은 우선순위를 구분해서 보여줘
- 모바일에서도 드롭다운이나 시트 형태로 자연스럽게 보이게 해줘`,
    commonMistake: "알림 기능 넣어줘.",
    improvedRequest:
      "읽음 상태, 중요도, 목록, 빈 상태까지 포함한 알림 기능 전체를 만들어줘.",
    acceptanceChecklist: [
      "읽지 않은 알림이 구분된다.",
      "빈 상태가 안내된다.",
      "알림 클릭 시 적절한 화면으로 이동한다.",
    ],
    nextCasebooks: ["analytics-dashboard-project"],
    workouts: ["microcopy-improve"],
    roleNotes: [
      "디자이너는 정보 우선순위와 읽음 상태 표현을 먼저 잡아야 합니다.",
      "주니어 개발자는 목록 표시와 읽음 처리 요청을 별개로 보지 말고 상태 동기화까지 함께 요청해야 합니다.",
      "기획자는 어떤 이벤트가 즉시 알림이고 어떤 이벤트가 기록형 알림인지 구분하지 않으면 알림 체계가 쉽게 과밀해질 수 있습니다.",
    ],
    operationsNotes: [
      "알림 클릭률과 전체 읽음 처리율을 같이 보면 실제 유용성을 판단하기 쉽습니다.",
      "중요 알림과 일반 알림을 구분해 발송하고 있는지 측정해야 운영 잡음이 커지지 않습니다.",
      "읽지 않은 알림이 계속 쌓이는지와 알림 이후 실제 전환이 일어나는지를 함께 보면 알림 전략을 조정하기 쉽습니다.",
    ],
    relatedScenarios: ["notification-flow"],
  },
  {
    slug: "onboarding-project",
    title: "온보딩 기능 완성 사례",
    summary:
      "첫 사용자의 초기 학습 흐름, 툴팁, 체크리스트, 시작 CTA까지 포함한 온보딩 사례집입니다.",
    level: "입문",
    roles: ["기획자", "디자이너"],
    goal:
      "온보딩을 예쁜 화면이 아니라 사용자가 첫 행동을 하게 만드는 흐름으로 요청할 수 있게 합니다.",
    situation:
      "온보딩은 설명 화면 몇 장으로 끝나지 않습니다. 무엇을 알려주고, 언제 건너뛰게 할지, 첫 성공 경험을 어떻게 만들지 정해야 합니다.",
    deliverables: [
      "환영 화면",
      "단계형 안내 또는 체크리스트",
      "건너뛰기/다음 CTA",
      "첫 행동 유도",
    ],
    stages: [
      {
        title: "첫 성공 정의",
        description:
          "사용자가 무엇을 하면 온보딩이 성공했다고 볼지 정합니다.",
      },
      {
        title: "안내 방식 결정",
        description:
          "풀스크린, 카드, 툴팁, 체크리스트 중 무엇이 맞는지 선택합니다.",
      },
      {
        title: "건너뛰기와 복귀 설계",
        description:
          "중간에 나가도 다시 시작할 수 있게 요청합니다.",
      },
    ],
    docs: ["onboarding", "tooltip", "empty-state", "call-to-action"],
    playbooks: ["designer-landing-page-hero", "planner-signup-page"],
    guides: ["onboarding-feature-guide"],
    quickPrompt:
      "온보딩 기능을 만들어줘. 첫 사용자가 핵심 기능을 이해하고 첫 행동을 하도록 단계형 안내를 넣어줘.",
    detailedPrompt: `온보딩 기능을 만들어줘.

- 첫 사용자를 위한 환영 화면과 핵심 가치 설명
- 3단계 이하의 간단한 안내 흐름
- 건너뛰기와 나중에 다시 보기 CTA 제공
- 체크리스트나 툴팁으로 첫 행동을 유도
- 완료 후 다음 행동 버튼을 명확히 보여줘`,
    commonMistake: "온보딩 화면 몇 장 만들어줘.",
    improvedRequest:
      "첫 사용자가 핵심 기능을 이해하고 첫 행동까지 하게 만드는 온보딩 흐름 전체를 설계해줘.",
    acceptanceChecklist: [
      "온보딩 목표가 명확하다.",
      "건너뛰기와 다시 보기 경로가 있다.",
      "완료 후 첫 행동 CTA가 있다.",
    ],
    nextCasebooks: ["signup-project"],
    workouts: ["landing-hero-brief", "state-system-request"],
    roleNotes: [
      "기획자는 온보딩 성공 기준을, 디자이너는 안내 밀도를 먼저 정의해야 합니다.",
      "주니어 개발자가 구현에 참여한다면 건너뛰기, 다시 보기, 완료 상태 저장을 각각 다른 흐름으로 다뤄야 합니다.",
    ],
    operationsNotes: [
      "온보딩 완료율과 첫 행동 전환율을 같이 보면 온보딩 품질을 판단하기 좋습니다.",
      "어느 단계에서 이탈이 많은지와 건너뛰기 비율을 함께 보면 안내 밀도를 조정하기 쉬워집니다.",
    ],
    relatedScenarios: ["signup-flow"],
  },
  {
    slug: "analytics-dashboard-project",
    title: "분석 대시보드 완성 사례",
    summary:
      "핵심 지표 카드, 필터, 차트, 기간 선택, 빈 상태까지 포함한 분석 대시보드 사례집입니다.",
    level: "중급",
    roles: ["기획자", "디자이너", "주니어 개발자"],
    goal:
      "대시보드를 예쁜 카드 모음이 아니라 KPI와 탐색 흐름이 있는 제품 화면으로 요청할 수 있게 합니다.",
    situation:
      "분석 대시보드는 차트만 많아도 실패합니다. 무엇을 먼저 보여줄지, 어떤 필터가 필요한지, 지표 해석을 어떻게 돕는지가 중요합니다.",
    deliverables: [
      "핵심 지표 카드",
      "기간/필터 선택",
      "차트 섹션",
      "빈 상태와 데이터 부족 안내",
    ],
    stages: [
      {
        title: "핵심 질문 정의",
        description:
          "사용자가 대시보드에서 무엇을 알아야 하는지 먼저 정합니다.",
      },
      {
        title: "지표 우선순위 설계",
        description:
          "상단 KPI, 하단 차트, 상세 테이블의 구조를 나눕니다.",
      },
      {
        title: "탐색 조건 보강",
        description:
          "기간, 필터, 세그먼트 조건을 요청에 포함합니다.",
      },
      {
        title: "데이터 부족 대응",
        description:
          "데이터가 없거나 적을 때의 빈 상태를 설계합니다.",
      },
    ],
    docs: ["analytics-event", "kpi", "data-table", "filter-bar", "success-criteria"],
    playbooks: ["planner-dashboard-prd", "designer-dashboard-polish"],
    guides: ["analytics-feature-guide", "admin-dashboard-feature"],
    quickPrompt:
      "분석 대시보드를 만들어줘. KPI 카드, 기간 필터, 차트, 빈 상태를 포함해줘.",
    detailedPrompt: `분석 대시보드를 만들어줘.

- 상단에는 핵심 KPI 카드 3~4개
- 기간 선택과 필터 바 제공
- 중간에는 차트 섹션, 하단에는 상세 테이블
- 데이터가 부족하면 빈 상태와 다음 행동 안내 제공
- 모바일에서는 KPI, 필터, 차트 순서로 자연스럽게 접히게 해줘
- 어떤 이벤트를 추적해야 하는지도 함께 정리해줘`,
    commonMistake: "대시보드 예쁘게 만들어줘.",
    improvedRequest:
      "핵심 KPI, 필터, 차트, 빈 상태, 이벤트 측정 기준까지 포함한 분석 대시보드를 만들어줘.",
    acceptanceChecklist: [
      "핵심 KPI가 상단에 우선 배치된다.",
      "필터와 기간 선택이 지표에 반영된다.",
      "데이터 부족 시 빈 상태가 설명된다.",
    ],
    nextCasebooks: ["list-performance-project"],
    workouts: ["success-criteria-writing", "api-requirements-spec"],
    roleNotes: [
      "기획자는 지표 의미와 성공 기준을 먼저 써야 하고, 디자이너는 정보 밀도를 조절해야 합니다.",
      "주니어 개발자가 구현한다면 필터, 기간, 차트 상태, 빈 상태를 같은 데이터 계약 안에서 설명해야 결과가 안정적입니다.",
    ],
    operationsNotes: [
      "지표 카드 클릭, 필터 변경, 차트 세그먼트 변경 이벤트를 추적하면 실제 사용 패턴을 이해하기 좋습니다.",
      "데이터 없음 상태가 얼마나 자주 보이는지까지 추적하면 대시보드 자체의 신뢰도를 판단하는 데 도움이 됩니다.",
    ],
    relatedScenarios: ["search-feature"],
  },
  {
    slug: "list-performance-project",
    title: "긴 목록 성능 최적화 사례",
    summary:
      "대량 목록, 필터, 정렬, 무한 스크롤 또는 페이지네이션, 성능 대응을 다루는 사례집입니다.",
    level: "중급",
    roles: ["기획자", "주니어 개발자"],
    goal:
      "긴 목록 화면을 단순 렌더링이 아니라 성능과 탐색 경험이 함께 있는 기능으로 요청할 수 있게 합니다.",
    situation:
      "목록이 커지면 처음엔 잘 되던 화면이 느려집니다. 데이터 양, 검색, 정렬, 렌더링 비용을 같이 고려해야 합니다.",
    deliverables: [
      "목록 화면",
      "필터와 정렬",
      "페이지네이션 또는 무한 스크롤",
      "성능 대응 전략",
    ],
    stages: [
      {
        title: "탐색 방식 선택",
        description:
          "페이지네이션과 무한 스크롤 중 무엇이 맞는지 먼저 정합니다.",
      },
      {
        title: "필터와 정렬 설계",
        description:
          "많은 데이터에서도 원하는 항목을 빨리 찾을 수 있게 합니다.",
      },
      {
        title: "성능 대응 요청",
        description:
          "디바운스, 로딩, 캐시, 스켈레톤 같은 조건을 포함합니다.",
      },
    ],
    docs: ["pagination", "infinite-scroll-logic", "frontend-cache", "debounce", "sorting-api"],
    playbooks: ["junior-list-performance", "search-feature-playbook"],
    guides: ["list-performance-feature"],
    quickPrompt:
      "긴 목록 화면을 만들어줘. 필터, 정렬, 페이지네이션 또는 무한 스크롤, 성능 대응까지 포함해줘.",
    detailedPrompt: `대량 목록 화면을 만들어줘.

- 목록 탐색 방식은 페이지네이션 또는 무한 스크롤 중 하나를 선택해 설명해줘
- 필터 바와 정렬 UI 포함
- 검색 입력은 디바운스를 적용할 수 있게 설계
- 로딩 상태, 빈 상태, 오류 상태를 모두 포함
- 데이터가 많아도 체감 속도가 느려지지 않게 캐시나 분할 로딩 전략을 포함해줘`,
    commonMistake: "목록 페이지 만들어줘. 데이터가 많아도 잘 되게 해줘.",
    improvedRequest:
      "대량 목록 탐색 방식, 필터, 정렬, 로딩, 성능 대응 전략을 함께 포함해서 만들어줘.",
    acceptanceChecklist: [
      "목록 탐색 방식이 명확하다.",
      "필터와 정렬이 함께 동작한다.",
      "느린 응답에서도 사용자가 기다리는 이유를 알 수 있다.",
    ],
    nextCasebooks: ["analytics-dashboard-project"],
    workouts: ["search-performance-request"],
    roleNotes: [
      "기획자는 탐색 방식 선택 이유를 설명해야 하고, 주니어 개발자는 렌더링 비용을 줄이는 조건을 요청에 넣어야 합니다.",
      "디자이너가 참여한다면 긴 목록에서도 중요한 정보가 먼저 보이도록 카드와 행의 정보 밀도를 조정해야 합니다.",
    ],
    operationsNotes: [
      "목록 스크롤 깊이, 필터 사용률, 검색 입력 빈도를 보면 실제 탐색 패턴을 판단할 수 있습니다.",
      "추가 로딩 실패율과 검색 지연 시간을 함께 보면 성능 최적화가 어디서 필요한지 더 빨리 찾을 수 있습니다.",
    ],
    relatedScenarios: ["search-feature"],
  },
  {
    slug: "settings-permission-project",
    title: "설정·권한 관리 사례",
    summary:
      "설정 메뉴 구조, 역할별 권한, 접근 제한, 변경 이력까지 포함한 설정/권한 사례집입니다.",
    level: "중급",
    roles: ["기획자", "주니어 개발자"],
    goal:
      "설정 화면과 권한 정책을 같이 설명하고 요청할 수 있게 만듭니다.",
    situation:
      "설정은 메뉴만 만들면 끝나는 것처럼 보이지만, 실제로는 누가 무엇을 볼 수 있는지와 어떤 변경이 위험한지가 핵심입니다.",
    deliverables: [
      "설정 정보 구조",
      "권한별 접근 제어",
      "위험 변경 확인 흐름",
      "변경 이력 또는 안내",
    ],
    stages: [
      {
        title: "메뉴 구조 정의",
        description:
          "설정을 어떤 단위로 묶을지 정합니다.",
      },
      {
        title: "권한 범위 정의",
        description:
          "누가 무엇을 볼 수 있고 바꿀 수 있는지 명확히 합니다.",
      },
      {
        title: "위험 변경 보호",
        description:
          "실수 방지를 위한 확인 흐름과 복구 경로를 설계합니다.",
      },
    ],
    docs: ["permission-policy", "rbac", "confirmation-flow", "rollback", "design-system"],
    playbooks: ["planner-admin-workflow", "auth-flow-playbook"],
    guides: ["profile-settings-feature", "auth-feature"],
    quickPrompt:
      "설정과 권한 관리 기능을 만들어줘. 설정 메뉴 구조, 역할별 권한, 위험 변경 확인 흐름을 포함해줘.",
    detailedPrompt: `설정과 권한 관리 기능을 만들어줘.

- 설정 메뉴는 계정, 팀, 권한처럼 논리적으로 묶어줘
- 역할에 따라 보이는 메뉴와 가능한 액션이 달라지게 해줘
- 위험한 변경은 확인 모달과 되돌리기 안내를 포함해줘
- 권한이 없는 사용자는 접근 불가 이유를 이해할 수 있어야 해
- 운영자를 위해 변경 이력이나 최근 수정 정보도 고려해줘`,
    commonMistake: "설정 페이지랑 권한만 넣어줘.",
    improvedRequest:
      "설정 정보 구조, 역할별 권한, 위험 변경 보호, 접근 불가 안내까지 포함한 관리 기능을 만들어줘.",
    acceptanceChecklist: [
      "권한에 따라 보이는 메뉴가 달라진다.",
      "위험한 변경 전에 확인 단계가 있다.",
      "권한 부족 시 이유가 설명된다.",
    ],
    nextCasebooks: ["approval-project", "auth-project"],
    workouts: ["api-requirements-spec", "auth-edge-state"],
    roleNotes: [
      "기획자는 메뉴 구조와 권한 구조를 따로 정의해야 합니다.",
      "주니어 개발자는 화면 접근 제어와 액션 가능 여부를 같은 규칙으로 취급하지 말고 분리해서 구현 요청을 해야 합니다.",
      "디자이너가 관여한다면 위험 설정과 일반 설정의 시각적 무게를 다르게 설계해야 실수 방지 효과가 커집니다.",
    ],
    operationsNotes: [
      "권한 변경 이벤트와 위험 설정 변경 이벤트를 분리해 추적하는 것이 좋습니다.",
      "누가 언제 어떤 권한을 바꿨는지와 롤백이 얼마나 필요한지까지 보면 운영 리스크를 더 잘 관리할 수 있습니다.",
    ],
    relatedScenarios: ["settings-flow", "auth-flow"],
  },
];

export function getCasebooks() {
  return CASEBOOKS;
}

export function getCasebookBySlug(slug: string) {
  return CASEBOOKS.find((casebook) => casebook.slug === slug) ?? null;
}

export function getRelatedCasebooks(slug: string, limit = 3) {
  const current = getCasebookBySlug(slug);

  if (!current) {
    return [];
  }

  const related = current.nextCasebooks
    .map((nextSlug) => getCasebookBySlug(nextSlug))
    .filter((item): item is Casebook => item !== null);

  return related.slice(0, limit);
}
