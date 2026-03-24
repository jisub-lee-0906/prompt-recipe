import fs from "node:fs";
import path from "node:path";

const projectRoot = process.cwd();
const contentRoot = path.join(projectRoot, "content");

const failures = [];
const docs = [];

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
      failures.push({
        filePath,
        reason: `주요 섹션 개수 부족 ${h2Count}`,
      });
    }

    if (calloutCount < 2) {
      failures.push({
        filePath,
        reason: `Callout 개수 부족 ${calloutCount}`,
      });
    }

    if (promptCardCount < 1) {
      failures.push({
        filePath,
        reason: `PromptCard 개수 부족 ${promptCardCount}`,
      });
    }

    if (promptCodeBlockCount < 2) {
      failures.push({
        filePath,
        reason: `PromptCodeBlock 개수 부족 ${promptCodeBlockCount}`,
      });
    }

    if (relatedLinkCount < 2) {
      failures.push({
        filePath,
        reason: `관련 문서 링크 부족 ${relatedLinkCount}`,
      });
    }
  }
}

if (failures.length === 0) {
  console.log(`문서 품질 감사 통과: ${docs.length}개 문서`);
  process.exit(0);
}

console.error(`문서 품질 감사 실패: ${failures.length}건`);

for (const failure of failures) {
  console.error(`- ${path.relative(projectRoot, failure.filePath)}: ${failure.reason}`);
}

process.exit(1);
