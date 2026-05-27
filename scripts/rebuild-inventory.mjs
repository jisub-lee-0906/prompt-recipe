import fs from "node:fs";
import path from "node:path";

import matter from "gray-matter";

const projectRoot = process.cwd();
const contentRoot = path.join(projectRoot, "content");
const inventoryPath = path.join(projectRoot, "docs", "master-inventory.md");

const categoryTitles = {
  "ui-ux": "UI/UX 패턴",
  frontend: "프론트엔드 구현",
  backend: "백엔드/데이터",
};

const categoryOrder = ["ui-ux", "frontend", "backend"];

function parseExistingInventory() {
  if (!fs.existsSync(inventoryPath)) {
    return new Map();
  }

  const source = fs.readFileSync(inventoryPath, "utf8");
  const rows = source.split(/\r?\n/).filter((line) => line.startsWith("|"));
  const map = new Map();

  for (const line of rows) {
    const columns = line.split("|").map((value) => value.trim());

    if (columns.length < 6) {
      continue;
    }

    const slugColumn = columns[2];

    if (!slugColumn?.startsWith("`") || !slugColumn.endsWith("`")) {
      continue;
    }

    const slug = slugColumn.slice(1, -1);
    map.set(slug, {
      priority: columns[3] || "P2",
      prerequisites: columns[4] || "없음",
      status: columns[5] || "기준 문서",
    });
  }

  return map;
}

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

const existingInventory = parseExistingInventory();
const docs = getDocs();

let output = "";
output += "# AI 프롬프팅 가이드 마스터 인벤토리\n\n";
output +=
  "이 문서는 레퍼런스 문서 사이트의 전체 문서 목록과 상태를 관리하기 위한 기준 문서입니다.\n\n";
output += "상태 정의:\n\n";
output += "- `미작성`: 아직 문서 파일이 없는 상태\n";
output += "- `작성됨`: 문서가 있으나 기준 문서 수준으로 더 다듬을 여지가 있는 상태\n";
output += "- `기준 문서`: 교과서 템플릿 기준을 충족한 문서\n\n";

for (const category of categoryOrder) {
  output += `## ${categoryTitles[category]}\n\n`;
  output += "| 문서명 | slug | 우선순위 | 선행 개념 | 상태 |\n";
  output += "| --- | --- | --- | --- | --- |\n";

  docs
    .filter((doc) => doc.category === category)
    .forEach((doc) => {
      const meta = existingInventory.get(doc.slug) ?? {
        priority: "P2",
        prerequisites: "없음",
        status: "기준 문서",
      };

      output += `| ${doc.title} | \`${doc.slug}\` | ${meta.priority} | ${meta.prerequisites} | ${meta.status} |\n`;
    });

  output += "\n";
}

fs.writeFileSync(inventoryPath, output, "utf8");
console.log("master-inventory.md 재생성을 완료했습니다.");
