const routes = [
  "/",
  "/docs/ui-ux",
  "/docs/frontend",
  "/docs/backend",
  "/docs/ui-ux/modal",
  "/updates",
  "/sitemap.xml",
  "/robots.txt",
];

const baseUrl = process.env.SMOKE_BASE_URL ?? "http://localhost:3000";

const failures = [];

for (const route of routes) {
  const response = await fetch(`${baseUrl}${route}`);

  if (!response.ok) {
    failures.push(`${route}: ${response.status}`);
  }
}

if (failures.length > 0) {
  console.error("스모크 검증 실패");
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}

console.log(`스모크 검증 통과: ${routes.length}개 경로`);
