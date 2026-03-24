# AI 프롬프팅 가이드 마스터 인벤토리

이 문서는 레퍼런스형 문서 사이트를 만들기 위한 전체 문서 목록과 상태를 관리합니다.

상태 정의:

- `미작성`: 아직 문서 파일이 없음
- `작성됨`: 문서는 있으나 기준 문서 수준 검수가 더 필요함
- `기준 문서`: 레퍼런스형 템플릿 기준을 충족하는 대표 문서

## UI/UX 패턴

| 문서명 | slug | 우선순위 | 선행 개념 | 상태 |
| --- | --- | --- | --- | --- |
| 모달 | `modal` | P1 | 없음 | 기준 문서 |
| 토스트 | `toast` | P1 | 없음 | 기준 문서 |
| 드로어 | `drawer` | P1 | modal | 기준 문서 |
| 툴팁 | `tooltip` | P1 | 없음 | 기준 문서 |
| 드롭다운 | `dropdown` | P1 | 없음 | 기준 문서 |
| 탭 | `tabs` | P1 | 없음 | 기준 문서 |
| 아코디언 | `accordion` | P1 | 없음 | 기준 문서 |
| 팝오버 | `popover` | P1 | tooltip | 기준 문서 |
| 다이얼로그 | `dialog` | P1 | modal | 기준 문서 |
| 컨텍스트 메뉴 | `context-menu` | P2 | dropdown | 기준 문서 |
| 커맨드 팔레트 | `command-palette` | P2 | search-bar | 기준 문서 |
| 시트 | `sheet` | P2 | drawer | 기준 문서 |
| 브레드크럼 | `breadcrumb` | P1 | 없음 | 기준 문서 |
| 페이지네이션 | `pagination` | P1 | 없음 | 기준 문서 |
| 인피니트 스크롤 UI | `infinite-scroll-ui` | P2 | pagination | 기준 문서 |
| 스켈레톤 | `skeleton` | P1 | loading-state | 기준 문서 |
| 빈 상태 | `empty-state` | P1 | 없음 | 기준 문서 |
| 에러 상태 | `error-state` | P1 | 없음 | 기준 문서 |
| 로딩 상태 | `loading-state` | P1 | 없음 | 기준 문서 |
| 확인 흐름 | `confirmation-flow` | P1 | modal | 기준 문서 |
| 온보딩 | `onboarding` | P2 | user-flow | 기준 문서 |
| 필터 바 | `filter-bar` | P1 | dropdown | 기준 문서 |
| 검색 바 | `search-bar` | P1 | 없음 | 기준 문서 |
| 정렬 UI | `sorting-ui` | P2 | filter-bar | 기준 문서 |
| 데이터 테이블 | `data-table` | P2 | pagination | 기준 문서 |
| 카드 레이아웃 | `card-layout` | P1 | component | 기준 문서 |
| 히어로 섹션 | `hero-section` | P2 | information-architecture | 기준 문서 |
| CTA | `call-to-action` | P1 | user-flow | 기준 문서 |

## 프론트엔드 구현

| 문서명 | slug | 우선순위 | 선행 개념 | 상태 |
| --- | --- | --- | --- | --- |
| 컴포넌트 | `component` | P1 | 없음 | 기준 문서 |
| 상태 관리 | `state-management` | P1 | 없음 | 기준 문서 |
| Props | `props` | P1 | component | 기준 문서 |
| 이벤트 처리 | `event-handling` | P1 | component | 기준 문서 |
| 조건부 렌더링 | `conditional-rendering` | P1 | state-management | 기준 문서 |
| 리스트 렌더링 | `list-rendering` | P1 | component | 기준 문서 |
| 폼 | `form` | P1 | event-handling | 기준 문서 |
| 폼 검증 | `form-validation` | P1 | form | 기준 문서 |
| 제어 컴포넌트 | `controlled-component` | P2 | form, state-management | 기준 문서 |
| 라우팅 | `routing` | P1 | 없음 | 기준 문서 |
| 동적 라우팅 | `dynamic-routing` | P1 | routing | 기준 문서 |
| 레이아웃 | `layout` | P1 | component | 기준 문서 |
| 반응형 레이아웃 | `responsive-layout` | P1 | layout | 기준 문서 |
| 클라이언트 컴포넌트 | `client-component` | P1 | component | 기준 문서 |
| 서버 컴포넌트 | `server-component` | P2 | component | 기준 문서 |
| SSR | `ssr` | P2 | server-component | 기준 문서 |
| CSR | `csr` | P2 | client-component | 기준 문서 |
| SSG | `ssg` | P1 | routing | 기준 문서 |
| 하이드레이션 | `hydration` | P2 | ssr, csr | 기준 문서 |
| 데이터 페칭 | `data-fetching` | P1 | api | 기준 문서 |
| 프론트엔드 캐시 | `frontend-cache` | P2 | data-fetching | 기준 문서 |
| 낙관적 UI | `optimistic-ui` | P2 | state-management, api | 기준 문서 |
| 디바운스 | `debounce` | P2 | event-handling | 기준 문서 |
| 쓰로틀 | `throttle` | P2 | event-handling | 기준 문서 |
| 무한 스크롤 구현 | `infinite-scroll-logic` | P2 | list-rendering, data-fetching | 기준 문서 |
| 프론트엔드 접근성 | `frontend-accessibility` | P1 | component | 기준 문서 |

## 백엔드/데이터

| 문서명 | slug | 우선순위 | 선행 개념 | 상태 |
| --- | --- | --- | --- | --- |
| API | `api` | P1 | 없음 | 기준 문서 |
| 인증 흐름 | `auth-flow` | P1 | 없음 | 기준 문서 |
| 세션 | `session` | P1 | auth-flow | 기준 문서 |
| 토큰 | `token` | P1 | auth-flow | 기준 문서 |
| RBAC | `rbac` | P2 | auth-flow | 기준 문서 |
| 엔드포인트 | `endpoint` | P1 | api | 기준 문서 |
| 요청/응답 구조 | `request-response-schema` | P1 | api | 기준 문서 |
| API 에러 응답 | `api-error-response` | P1 | api | 기준 문서 |
| 페이지네이션 API | `pagination-api` | P1 | api | 기준 문서 |
| 검색 API | `search-api` | P2 | api | 기준 문서 |
| 필터링 API | `filtering-api` | P2 | api | 기준 문서 |
| 정렬 API | `sorting-api` | P2 | api | 기준 문서 |
| 파일 업로드 | `file-upload` | P2 | api | 기준 문서 |
| 웹훅 | `webhook` | P2 | api | 기준 문서 |
| 백엔드 캐시 | `backend-cache` | P2 | api | 기준 문서 |
| 큐 | `queue` | P2 | api | 기준 문서 |
| 레이트 리밋 | `rate-limit` | P2 | api | 기준 문서 |
| 검색 인덱스 | `search-index` | P3 | search-api | 기준 문서 |
| 로깅 | `logging` | P2 | api | 기준 문서 |
| 모니터링 | `monitoring` | P2 | logging | 기준 문서 |
| 재시도 | `retry` | P2 | api-error-response | 기준 문서 |
| 멱등성 | `idempotency` | P3 | api, request-response-schema | 기준 문서 |

## 기획/협업/품질

| 문서명 | slug | 우선순위 | 선행 개념 | 상태 |
| --- | --- | --- | --- | --- |
| 사용자 흐름 | `user-flow` | P1 | 없음 | 기준 문서 |
| 정보 구조 | `information-architecture` | P1 | 없음 | 기준 문서 |
| 와이어프레임 | `wireframe` | P1 | 없음 | 기준 문서 |
| 디자인 시스템 | `design-system` | P1 | component | 기준 문서 |
| 디자인 토큰 | `design-token` | P2 | design-system | 기준 문서 |
| 접근성 | `accessibility` | P1 | 없음 | 기준 문서 |
| 반응형 설계 | `responsive-design` | P1 | 없음 | 기준 문서 |
| 마이크로카피 | `microcopy` | P2 | 없음 | 기준 문서 |
| 성공 기준 | `success-criteria` | P1 | 없음 | 기준 문서 |
| 수용 기준 | `acceptance-criteria` | P1 | success-criteria | 기준 문서 |
| 엣지 케이스 | `edge-case` | P1 | 없음 | 기준 문서 |
| 실패 시나리오 | `failure-scenario` | P2 | edge-case | 기준 문서 |
| 퍼널 | `funnel` | P3 | user-flow | 기준 문서 |
| KPI | `kpi` | P3 | success-criteria | 기준 문서 |
| 이벤트 트래킹 | `analytics-event` | P2 | kpi | 기준 문서 |
| 기능 플래그 | `feature-flag` | P2 | success-criteria | 기준 문서 |
| 롤백 | `rollback` | P3 | feature-flag | 기준 문서 |
| 폴백 | `fallback` | P2 | failure-scenario | 기준 문서 |
| 권한 정책 | `permission-policy` | P2 | auth-flow, rbac | 기준 문서 |
| 릴리스 체크리스트 | `release-checklist` | P2 | acceptance-criteria, failure-scenario | 기준 문서 |
