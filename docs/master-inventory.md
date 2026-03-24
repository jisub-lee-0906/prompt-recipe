# AI 프롬프팅 가이드 마스터 인벤토리

이 문서는 레퍼런스형 문서 사이트의 전체 문서 목록과 상태를 관리하기 위한 기준 문서입니다.

상태 정의:

- `미작성`: 아직 문서 파일이 없는 상태
- `작성됨`: 문서가 있으나 기준 문서 수준 검수가 더 필요한 상태
- `기준 문서`: 레퍼런스 템플릿 기준을 충족한 문서

## UI/UX 패턴

| 문서명 | slug | 우선순위 | 선행 개념 | 상태 |
| --- | --- | --- | --- | --- |
| 수용 기준 (Acceptance Criteria) | `acceptance-criteria` | P1 | success-criteria | 기준 문서 |
| 접근성 (Accessibility) | `accessibility` | P1 | 없음 | 기준 문서 |
| 아코디언 (Accordion) | `accordion` | P1 | 없음 | 기준 문서 |
| 이벤트 트래킹 (Analytics Event) | `analytics-event` | P2 | kpi | 기준 문서 |
| 브레드크럼 (Breadcrumb) | `breadcrumb` | P1 | 없음 | 기준 문서 |
| 콜 투 액션 (CTA) | `call-to-action` | P1 | user-flow | 기준 문서 |
| 카드 레이아웃 (Card Layout) | `card-layout` | P1 | component | 기준 문서 |
| 커맨드 팔레트 (Command Palette) | `command-palette` | P2 | search-bar | 기준 문서 |
| 확인 흐름 (Confirmation Flow) | `confirmation-flow` | P1 | modal | 기준 문서 |
| 컨텍스트 메뉴 (Context Menu) | `context-menu` | P2 | dropdown | 기준 문서 |
| 데이터 테이블 (Data Table) | `data-table` | P2 | pagination | 기준 문서 |
| 디자인 시스템 (Design System) | `design-system` | P1 | component | 기준 문서 |
| 디자인 토큰 (Design Token) | `design-token` | P2 | design-system | 기준 문서 |
| 다이얼로그 (Dialog) | `dialog` | P1 | modal | 기준 문서 |
| 드로어 (Drawer) | `drawer` | P1 | modal | 기준 문서 |
| 드롭다운 (Dropdown) | `dropdown` | P1 | 없음 | 기준 문서 |
| 엣지 케이스 (Edge Case) | `edge-case` | P1 | 없음 | 기준 문서 |
| 빈 상태 (Empty State) | `empty-state` | P1 | 없음 | 기준 문서 |
| 에러 상태 (Error State) | `error-state` | P1 | 없음 | 기준 문서 |
| 실패 시나리오 (Failure Scenario) | `failure-scenario` | P2 | edge-case | 기준 문서 |
| 폴백 (Fallback) | `fallback` | P2 | failure-scenario | 기준 문서 |
| 기능 플래그 (Feature Flag) | `feature-flag` | P2 | success-criteria | 기준 문서 |
| 필터 바 (Filter Bar) | `filter-bar` | P1 | dropdown | 기준 문서 |
| 퍼널 (Funnel) | `funnel` | P3 | user-flow | 기준 문서 |
| 히어로 섹션 (Hero Section) | `hero-section` | P2 | information-architecture | 기준 문서 |
| 인피니트 스크롤 UI (Infinite Scroll UI) | `infinite-scroll-ui` | P2 | pagination | 기준 문서 |
| 정보 구조 (Information Architecture) | `information-architecture` | P1 | 없음 | 기준 문서 |
| KPI | `kpi` | P3 | success-criteria | 기준 문서 |
| 로딩 상태 (Loading State) | `loading-state` | P1 | 없음 | 기준 문서 |
| 마이크로카피 (Microcopy) | `microcopy` | P2 | 없음 | 기준 문서 |
| 모달 (Modal) | `modal` | P1 | 없음 | 기준 문서 |
| 온보딩 (Onboarding) | `onboarding` | P2 | user-flow | 기준 문서 |
| 페이지네이션 (Pagination) | `pagination` | P1 | 없음 | 기준 문서 |
| 팝오버 (Popover) | `popover` | P1 | tooltip | 기준 문서 |
| 릴리스 체크리스트 (Release Checklist) | `release-checklist` | P2 | acceptance-criteria, failure-scenario | 기준 문서 |
| 반응형 설계 (Responsive Design) | `responsive-design` | P1 | 없음 | 기준 문서 |
| 롤백 (Rollback) | `rollback` | P3 | feature-flag | 기준 문서 |
| 검색 바 (Search Bar) | `search-bar` | P1 | 없음 | 기준 문서 |
| 시트 (Sheet) | `sheet` | P2 | drawer | 기준 문서 |
| 스켈레톤 (Skeleton) | `skeleton` | P1 | loading-state | 기준 문서 |
| 정렬 UI (Sorting UI) | `sorting-ui` | P2 | filter-bar | 기준 문서 |
| 성공 기준 (Success Criteria) | `success-criteria` | P1 | 없음 | 기준 문서 |
| 탭 (Tabs) | `tabs` | P1 | 없음 | 기준 문서 |
| 토스트 (Toast) | `toast` | P1 | 없음 | 기준 문서 |
| 툴팁 (Tooltip) | `tooltip` | P1 | 없음 | 기준 문서 |
| 사용자 흐름 (User Flow) | `user-flow` | P1 | 없음 | 기준 문서 |
| 와이어프레임 (Wireframe) | `wireframe` | P1 | 없음 | 기준 문서 |

## 프론트엔드 구현

| 문서명 | slug | 우선순위 | 선행 개념 | 상태 |
| --- | --- | --- | --- | --- |
| 클라이언트 컴포넌트 (Client Component) | `client-component` | P1 | component | 기준 문서 |
| 컴포넌트 (Component) | `component` | P1 | 없음 | 기준 문서 |
| 조건부 렌더링 (Conditional Rendering) | `conditional-rendering` | P1 | state-management | 기준 문서 |
| 제어 컴포넌트 (Controlled Component) | `controlled-component` | P2 | form, state-management | 기준 문서 |
| CSR (Client-Side Rendering) | `csr` | P2 | client-component | 기준 문서 |
| 데이터 페칭 (Data Fetching) | `data-fetching` | P1 | api | 기준 문서 |
| 디바운스 (Debounce) | `debounce` | P2 | event-handling | 기준 문서 |
| 동적 라우팅 (Dynamic Routing) | `dynamic-routing` | P1 | routing | 기준 문서 |
| 이벤트 처리 (Event Handling) | `event-handling` | P1 | component | 기준 문서 |
| 폼 검증 (Form Validation) | `form-validation` | P1 | form | 기준 문서 |
| 폼 (Form) | `form` | P1 | event-handling | 기준 문서 |
| 프론트엔드 접근성 (Accessibility in Frontend) | `frontend-accessibility` | P1 | component | 기준 문서 |
| 프론트엔드 캐시 (Frontend Cache) | `frontend-cache` | P2 | data-fetching | 기준 문서 |
| 하이드레이션 (Hydration) | `hydration` | P2 | ssr, csr | 기준 문서 |
| 무한 스크롤 구현 (Infinite Scroll Logic) | `infinite-scroll-logic` | P2 | list-rendering, data-fetching | 기준 문서 |
| 레이아웃 (Layout) | `layout` | P1 | component | 기준 문서 |
| 리스트 렌더링 (List Rendering) | `list-rendering` | P1 | component | 기준 문서 |
| 낙관적 UI (Optimistic UI) | `optimistic-ui` | P2 | state-management, api | 기준 문서 |
| Props | `props` | P1 | component | 기준 문서 |
| 반응형 레이아웃 (Responsive Layout) | `responsive-layout` | P1 | layout | 기준 문서 |
| 라우팅 (Routing) | `routing` | P1 | 없음 | 기준 문서 |
| 서버 컴포넌트 (Server Component) | `server-component` | P2 | component | 기준 문서 |
| 정적 사이트 생성 (SSG) | `ssg` | P1 | routing | 기준 문서 |
| SSR (Server-Side Rendering) | `ssr` | P2 | server-component | 기준 문서 |
| 상태 관리 (State Management) | `state-management` | P1 | 없음 | 기준 문서 |
| 쓰로틀 (Throttle) | `throttle` | P2 | event-handling | 기준 문서 |

## 백엔드/데이터

| 문서명 | slug | 우선순위 | 선행 개념 | 상태 |
| --- | --- | --- | --- | --- |
| API 에러 응답 (API Error Response) | `api-error-response` | P1 | api | 기준 문서 |
| API | `api` | P1 | 없음 | 기준 문서 |
| 인증 흐름 (Auth Flow) | `auth-flow` | P1 | 없음 | 기준 문서 |
| 백엔드 캐시 (Backend Cache) | `backend-cache` | P2 | api | 기준 문서 |
| 엔드포인트 (Endpoint) | `endpoint` | P1 | api | 기준 문서 |
| 파일 업로드 (File Upload) | `file-upload` | P2 | api | 기준 문서 |
| 필터링 API (Filtering API) | `filtering-api` | P2 | api | 기준 문서 |
| 멱등성 (Idempotency) | `idempotency` | P3 | api, request-response-schema | 기준 문서 |
| 로깅 (Logging) | `logging` | P2 | api | 기준 문서 |
| 모니터링 (Monitoring) | `monitoring` | P2 | logging | 기준 문서 |
| 페이지네이션 API (Pagination API) | `pagination-api` | P1 | api | 기준 문서 |
| 권한 정책 (Permission Policy) | `permission-policy` | P2 | auth-flow, rbac | 기준 문서 |
| 큐 (Queue) | `queue` | P2 | api | 기준 문서 |
| 레이트 리밋 (Rate Limit) | `rate-limit` | P2 | api | 기준 문서 |
| RBAC | `rbac` | P2 | auth-flow | 기준 문서 |
| 요청/응답 구조 (Request Response Schema) | `request-response-schema` | P1 | api | 기준 문서 |
| 재시도 (Retry) | `retry` | P2 | api-error-response | 기준 문서 |
| 검색 API (Search API) | `search-api` | P2 | api | 기준 문서 |
| 검색 인덱스 (Search Index) | `search-index` | P3 | search-api | 기준 문서 |
| 세션 (Session) | `session` | P1 | auth-flow | 기준 문서 |
| 정렬 API (Sorting API) | `sorting-api` | P2 | api | 기준 문서 |
| 토큰 (Token) | `token` | P1 | auth-flow | 기준 문서 |
| 웹훅 (Webhook) | `webhook` | P2 | api | 기준 문서 |

