import fs from "node:fs";
import path from "node:path";

const projectRoot = process.cwd();
const contentRoot = path.join(projectRoot, "content");

const failures = [];
const docs = [];
const contentDocSlugs = new Set();

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

function collectQuotedValues(block, fieldName) {
  const pattern = new RegExp(`${fieldName}:\\s*\\[([\\s\\S]*?)\\]`, "g");
  const values = [];

  for (const match of block.matchAll(pattern)) {
    const inner = match[1];
    const quotedValues = [...inner.matchAll(/"([^"]+)"/g)].map((item) => item[1]);
    values.push(...quotedValues);
  }

  return values;
}

function getSlugSet(relativePath) {
  const filePath = assertFileExists(relativePath);

  if (!filePath) {
    return new Set();
  }

  const text = fs.readFileSync(filePath, "utf8");
  return new Set(
    [...text.matchAll(/slug:\s*"([^"]+)"/g)].map((match) => match[1]),
  );
}

function assertReferencesExist(relativePath, checks) {
  const filePath = assertFileExists(relativePath);

  if (!filePath) {
    return;
  }

  const text = fs.readFileSync(filePath, "utf8");
  const entries = [...text.matchAll(/slug:\s*"([^"]+)"[\s\S]*?(?=\n\s*},\n\s*{|\n\s*},\n\s*];|\n\s*];)/g)];

  for (const entry of entries) {
    const block = entry[0];
    const ownerSlug = entry[1];

    for (const check of checks) {
      const refs = collectQuotedValues(block, check.field);

      for (const ref of refs) {
        if (!check.allowed.has(ref)) {
          addFailure(
            `${relativePath}: ${ownerSlug}의 ${check.field}가 존재하지 않는 slug를 참조합니다 (${ref})`,
          );
        }
      }
    }
  }
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
    contentDocSlugs.add(path.basename(fileName, ".mdx"));

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
  { file: "lib/operations.ts", expected: 6, label: "운영 가이드" },
  { file: "lib/casebooks.ts", expected: 12, label: "사례집" },
  { file: "lib/workouts.ts", expected: 16, label: "실습" },
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
  "app/docs/page.tsx",
  "app/workouts/page.tsx",
  "app/workouts/[slug]/page.tsx",
  "app/operations/page.tsx",
  "app/operations/[slug]/page.tsx",
  "app/scenarios/page.tsx",
  "app/casebooks/page.tsx",
  "app/casebooks/[slug]/page.tsx",
];

for (const route of routeChecks) {
  assertFileExists(route);
}

const playbookSlugs = getSlugSet("lib/playbooks.ts");
const guideSlugs = getSlugSet("lib/guides.ts");
const casebookSlugs = getSlugSet("lib/casebooks.ts");
const workoutSlugs = getSlugSet("lib/workouts.ts");

assertReferencesExist("lib/playbooks.ts", [
  { field: "docs", allowed: contentDocSlugs },
]);

assertReferencesExist("lib/guides.ts", [
  { field: "docs", allowed: contentDocSlugs },
  { field: "playbooks", allowed: playbookSlugs },
]);

assertReferencesExist("lib/operations.ts", [
  { field: "docs", allowed: contentDocSlugs },
  { field: "playbooks", allowed: playbookSlugs },
  { field: "guides", allowed: guideSlugs },
  { field: "casebooks", allowed: casebookSlugs },
  { field: "workouts", allowed: workoutSlugs },
]);

assertReferencesExist("lib/casebooks.ts", [
  { field: "docs", allowed: contentDocSlugs },
  { field: "playbooks", allowed: playbookSlugs },
  { field: "guides", allowed: guideSlugs },
  { field: "workouts", allowed: workoutSlugs },
  { field: "nextCasebooks", allowed: casebookSlugs },
]);

assertReferencesExist("lib/workouts.ts", [
  { field: "docs", allowed: contentDocSlugs },
  { field: "playbooks", allowed: playbookSlugs },
  { field: "guides", allowed: guideSlugs },
  { field: "casebooks", allowed: casebookSlugs },
  { field: "nextWorkouts", allowed: workoutSlugs },
]);

assertReferencesExist("lib/hubs.ts", [
  { field: "docs", allowed: contentDocSlugs },
  { field: "guides", allowed: guideSlugs },
  { field: "casebooks", allowed: casebookSlugs },
  { field: "workouts", allowed: workoutSlugs },
]);

if (failures.length === 0) {
  console.log(
    `콘텐츠 감사 통과: 문서 ${docs.length}개, 플레이북/가이드/운영 가이드/사례집/실습/허브 데이터와 참조 무결성까지 정상입니다.`,
  );
  process.exit(0);
}

console.error(`콘텐츠 감사 실패: ${failures.length}건`);

for (const failure of failures) {
  console.error(`- ${failure}`);
}

process.exit(1);
