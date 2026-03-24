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
    quickPrompt:
      "검색창과 검색 결과 페이지를 만들어줘.",
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
    quickPrompt:
      "로그인 페이지와 인증 흐름을 만들어줘.",
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
    quickPrompt:
      "관리자 목록 페이지를 만들어줘.",
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
