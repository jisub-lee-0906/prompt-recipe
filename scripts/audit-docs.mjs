import fs from "node:fs";
import path from "node:path";

const projectRoot = process.cwd();
const contentRoot = path.join(projectRoot, "content");

const failures = [];
const docs = [];

function addFailure(reason) {
  failures.push(reason);
}

function assertFileExists(relativePath) {
  const filePath = path.join(projectRoot, relativePath);

  if (!fs.existsSync(filePath)) {
    addFailure(`${relativePath}: 파일이 없습니다.`);
    return null;
  }

  return filePath;
}

for (const category of fs.readdirSync(contentRoot)) {
  const categoryPath = path.join(contentRoot, category);

  if (!fs.statSync(categoryPath).isDirectory()) {
    continue;
  }

  for (const fileName of fs.readdirSync(categoryPath)) {
    if (!fileName.endsWith(".mdx")) {
      continue;
    }

    const filePath = path.join(categoryPath, fileName);
    const content = fs.readFileSync(filePath, "utf8");
    docs.push(filePath);

    const h2Count = (content.match(/^##\s+/gm) ?? []).length;
    const calloutCount = (content.match(/<Callout\b/g) ?? []).length;
    const promptCardCount = (content.match(/<PromptCard\b/g) ?? []).length;
    const promptCodeBlockCount = (content.match(/<PromptCodeBlock\b/g) ?? []).length;
    const relatedLinkCount = (content.match(/\]\(\/docs\/[^)]+\)/g) ?? []).length;

    if (h2Count < 8) {
      addFailure(`${path.relative(projectRoot, filePath)}: 주요 섹션 수가 부족합니다 (${h2Count})`);
    }

    if (calloutCount < 2) {
      addFailure(`${path.relative(projectRoot, filePath)}: Callout 수가 부족합니다 (${calloutCount})`);
    }

    if (promptCardCount < 1) {
      addFailure(`${path.relative(projectRoot, filePath)}: PromptCard 수가 부족합니다 (${promptCardCount})`);
    }

    if (promptCodeBlockCount < 2) {
      addFailure(`${path.relative(projectRoot, filePath)}: PromptCodeBlock 수가 부족합니다 (${promptCodeBlockCount})`);
    }

    if (relatedLinkCount < 2) {
      addFailure(`${path.relative(projectRoot, filePath)}: 관련 문서 링크가 부족합니다 (${relatedLinkCount})`);
    }
  }
}

if (docs.length !== 96) {
  addFailure(`문서 수가 96개가 아닙니다 (${docs.length})`);
}

const textRoots = ["app", "components", "lib", "docs", "scripts"];

function scanForReplacementCharacter(dirPath) {
  for (const entry of fs.readdirSync(dirPath, { withFileTypes: true })) {
    const entryPath = path.join(dirPath, entry.name);

    if (entry.isDirectory()) {
      scanForReplacementCharacter(entryPath);
      continue;
    }

    if (!/\.(ts|tsx|md|mdx|mjs|ps1|json)$/i.test(entry.name)) {
      continue;
    }

    const text = fs.readFileSync(entryPath, "utf8");

    if (text.includes("\uFFFD")) {
      addFailure(`${path.relative(projectRoot, entryPath)}: 문자열 깨짐 문자가 남아 있습니다.`);
    }
  }
}

for (const root of textRoots) {
  const rootPath = path.join(projectRoot, root);
  if (fs.existsSync(rootPath)) {
    scanForReplacementCharacter(rootPath);
  }
}

const datasetChecks = [
  { file: "lib/playbooks.ts", expected: 15, label: "플레이북" },
  { file: "lib/guides.ts", expected: 12, label: "기능 가이드" },
  { file: "lib/casebooks.ts", expected: 12, label: "사례집" },
  { file: "lib/workouts.ts", expected: 12, label: "실습" },
  { file: "lib/hubs.ts", expected: 19, label: "허브 항목" },
];

for (const dataset of datasetChecks) {
  const filePath = assertFileExists(dataset.file);

  if (!filePath) {
    continue;
  }

  const text = fs.readFileSync(filePath, "utf8");
  const slugMatches = [...text.matchAll(/slug:\s*"([^"]+)"/g)].map((match) => match[1]);
  const uniqueSlugs = new Set(slugMatches);

  if (slugMatches.length !== dataset.expected) {
    addFailure(`${dataset.label} 수가 예상과 다릅니다 (${slugMatches.length})`);
  }

  if (uniqueSlugs.size !== slugMatches.length) {
    addFailure(`${dataset.label}에 중복 slug가 있습니다.`);
  }
}

const routeChecks = [
  "app/workouts/page.tsx",
  "app/workouts/[slug]/page.tsx",
  "app/scenarios/page.tsx",
  "app/casebooks/page.tsx",
  "app/casebooks/[slug]/page.tsx",
];

for (const route of routeChecks) {
  assertFileExists(route);
}

if (failures.length === 0) {
  console.log(
    `콘텐츠 감사 통과: 문서 ${docs.length}개, 플레이북/가이드/사례집/실습/허브 데이터까지 정상입니다.`,
  );
  process.exit(0);
}

console.error(`콘텐츠 감사 실패: ${failures.length}건`);

for (const failure of failures) {
  console.error(`- ${failure}`);
}

process.exit(1);
