import fs from "node:fs";
import path from "node:path";

import matter from "gray-matter";

const projectRoot = process.cwd();
const contentRoot = path.join(projectRoot, "content");
const inventoryPath = path.join(projectRoot, "docs", "master-inventory.md");

const categoryTitles = {
  "ui-ux": "UI/UX 패턴",
  frontend: "프론트엔드 구현",
  backend: "백엔드·데이터",
};

const categoryOrder = ["ui-ux", "frontend", "backend"];

const metadataBySlug = new Map([
  ["modal", { priority: "P1", prerequisites: "없음" }],
  ["toast", { priority: "P1", prerequisites: "없음" }],
  ["drawer", { priority: "P1", prerequisites: "modal" }],
  ["tooltip", { priority: "P1", prerequisites: "없음" }],
  ["dropdown", { priority: "P1", prerequisites: "없음" }],
  ["tabs", { priority: "P1", prerequisites: "없음" }],
  ["accordion", { priority: "P1", prerequisites: "없음" }],
  ["popover", { priority: "P1", prerequisites: "tooltip" }],
  ["dialog", { priority: "P1", prerequisites: "modal" }],
  ["context-menu", { priority: "P2", prerequisites: "dropdown" }],
  ["command-palette", { priority: "P2", prerequisites: "search-bar" }],
  ["sheet", { priority: "P2", prerequisites: "drawer" }],
  ["breadcrumb", { priority: "P1", prerequisites: "없음" }],
  ["pagination", { priority: "P1", prerequisites: "없음" }],
  ["infinite-scroll-ui", { priority: "P2", prerequisites: "pagination" }],
  ["skeleton", { priority: "P1", prerequisites: "loading-state" }],
  ["empty-state", { priority: "P1", prerequisites: "없음" }],
  ["error-state", { priority: "P1", prerequisites: "없음" }],
  ["loading-state", { priority: "P1", prerequisites: "없음" }],
  ["confirmation-flow", { priority: "P1", prerequisites: "modal" }],
  ["onboarding", { priority: "P2", prerequisites: "user-flow" }],
  ["filter-bar", { priority: "P1", prerequisites: "dropdown" }],
  ["search-bar", { priority: "P1", prerequisites: "없음" }],
  ["sorting-ui", { priority: "P2", prerequisites: "filter-bar" }],
  ["data-table", { priority: "P2", prerequisites: "pagination" }],
  ["card-layout", { priority: "P1", prerequisites: "component" }],
  ["hero-section", { priority: "P2", prerequisites: "information-architecture" }],
  ["call-to-action", { priority: "P1", prerequisites: "user-flow" }],
  ["component", { priority: "P1", prerequisites: "없음" }],
  ["state-management", { priority: "P1", prerequisites: "없음" }],
  ["props", { priority: "P1", prerequisites: "component" }],
  ["event-handling", { priority: "P1", prerequisites: "component" }],
  ["conditional-rendering", { priority: "P1", prerequisites: "state-management" }],
  ["list-rendering", { priority: "P1", prerequisites: "component" }],
  ["form", { priority: "P1", prerequisites: "event-handling" }],
  ["form-validation", { priority: "P1", prerequisites: "form" }],
  ["controlled-component", { priority: "P2", prerequisites: "form, state-management" }],
  ["routing", { priority: "P1", prerequisites: "없음" }],
  ["dynamic-routing", { priority: "P1", prerequisites: "routing" }],
  ["layout", { priority: "P1", prerequisites: "component" }],
  ["responsive-layout", { priority: "P1", prerequisites: "layout" }],
  ["client-component", { priority: "P1", prerequisites: "component" }],
  ["server-component", { priority: "P2", prerequisites: "component" }],
  ["ssr", { priority: "P2", prerequisites: "server-component" }],
  ["csr", { priority: "P2", prerequisites: "client-component" }],
  ["ssg", { priority: "P1", prerequisites: "routing" }],
  ["hydration", { priority: "P2", prerequisites: "ssr, csr" }],
  ["data-fetching", { priority: "P1", prerequisites: "api" }],
  ["frontend-cache", { priority: "P2", prerequisites: "data-fetching" }],
  ["optimistic-ui", { priority: "P2", prerequisites: "state-management, api" }],
  ["debounce", { priority: "P2", prerequisites: "event-handling" }],
  ["throttle", { priority: "P2", prerequisites: "event-handling" }],
  ["infinite-scroll-logic", { priority: "P2", prerequisites: "list-rendering, data-fetching" }],
  ["frontend-accessibility", { priority: "P1", prerequisites: "component" }],
  ["api", { priority: "P1", prerequisites: "없음" }],
  ["auth-flow", { priority: "P1", prerequisites: "없음" }],
  ["session", { priority: "P1", prerequisites: "auth-flow" }],
  ["token", { priority: "P1", prerequisites: "auth-flow" }],
  ["rbac", { priority: "P2", prerequisites: "auth-flow" }],
  ["endpoint", { priority: "P1", prerequisites: "api" }],
  ["request-response-schema", { priority: "P1", prerequisites: "api" }],
  ["api-error-response", { priority: "P1", prerequisites: "api" }],
  ["pagination-api", { priority: "P1", prerequisites: "api" }],
  ["search-api", { priority: "P2", prerequisites: "api" }],
  ["filtering-api", { priority: "P2", prerequisites: "api" }],
  ["sorting-api", { priority: "P2", prerequisites: "api" }],
  ["file-upload", { priority: "P2", prerequisites: "api" }],
  ["webhook", { priority: "P2", prerequisites: "api" }],
  ["backend-cache", { priority: "P2", prerequisites: "api" }],
  ["queue", { priority: "P2", prerequisites: "api" }],
  ["rate-limit", { priority: "P2", prerequisites: "api" }],
  ["search-index", { priority: "P3", prerequisites: "search-api" }],
  ["logging", { priority: "P2", prerequisites: "api" }],
  ["monitoring", { priority: "P2", prerequisites: "logging" }],
  ["retry", { priority: "P2", prerequisites: "api-error-response" }],
  ["idempotency", { priority: "P3", prerequisites: "api, request-response-schema" }],
  ["user-flow", { priority: "P1", prerequisites: "없음" }],
  ["information-architecture", { priority: "P1", prerequisites: "없음" }],
  ["wireframe", { priority: "P1", prerequisites: "없음" }],
  ["design-system", { priority: "P1", prerequisites: "component" }],
  ["design-token", { priority: "P2", prerequisites: "design-system" }],
  ["accessibility", { priority: "P1", prerequisites: "없음" }],
  ["responsive-design", { priority: "P1", prerequisites: "없음" }],
  ["microcopy", { priority: "P2", prerequisites: "없음" }],
  ["success-criteria", { priority: "P1", prerequisites: "없음" }],
  ["acceptance-criteria", { priority: "P1", prerequisites: "success-criteria" }],
  ["edge-case", { priority: "P1", prerequisites: "없음" }],
  ["failure-scenario", { priority: "P2", prerequisites: "edge-case" }],
  ["funnel", { priority: "P3", prerequisites: "user-flow" }],
  ["kpi", { priority: "P3", prerequisites: "success-criteria" }],
  ["analytics-event", { priority: "P2", prerequisites: "kpi" }],
  ["feature-flag", { priority: "P2", prerequisites: "success-criteria" }],
  ["rollback", { priority: "P3", prerequisites: "feature-flag" }],
  ["fallback", { priority: "P2", prerequisites: "failure-scenario" }],
  ["permission-policy", { priority: "P2", prerequisites: "auth-flow, rbac" }],
  ["release-checklist", { priority: "P2", prerequisites: "acceptance-criteria, failure-scenario" }],
]);

function getDocs() {
  const docs = [];

  for (const category of categoryOrder) {
    const categoryPath = path.join(contentRoot, category);
    const files = fs.readdirSync(categoryPath).filter((file) => file.endsWith(".mdx"));

    for (const file of files) {
      const fullPath = path.join(categoryPath, file);
      const source = fs.readFileSync(fullPath, "utf8");
      const { data } = matter(source);

      docs.push({
        category,
        slug: file.replace(/\.mdx$/, ""),
        title: data.title,
      });
    }
  }

  return docs;
}

const docs = getDocs();

let output = "";
output += "# AI 프롬프팅 가이드 마스터 인벤토리\n\n";
output +=
  "이 문서는 레퍼런스형 문서 사이트의 전체 문서 목록과 상태를 관리하는 기준 문서입니다.\n\n";
output += "상태 정의:\n\n";
output += "- `미작성`: 아직 문서 파일이 없는 상태\n";
output += "- `작성됨`: 문서는 있으나 기준 문서 수준 검수가 더 필요한 상태\n";
output += "- `기준 문서`: 레퍼런스 템플릿 기준을 충족한 대표 수준 문서\n\n";

for (const category of categoryOrder) {
  output += `## ${categoryTitles[category]}\n\n`;
  output += "| 문서명 | slug | 우선순위 | 선행 개념 | 상태 |\n";
  output += "| --- | --- | --- | --- | --- |\n";

  docs
    .filter((doc) => doc.category === category)
    .forEach((doc) => {
      const meta = metadataBySlug.get(doc.slug) ?? {
        priority: "P2",
        prerequisites: "없음",
      };

      output += `| ${doc.title} | \`${doc.slug}\` | ${meta.priority} | ${meta.prerequisites} | 기준 문서 |\n`;
    });

  output += "\n";
}

fs.writeFileSync(inventoryPath, output, "utf8");
console.log("master-inventory.md 재생성 완료");
