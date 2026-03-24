import fs from "node:fs";
import path from "node:path";
import { execSync } from "node:child_process";

const projectRoot = process.cwd();
const outputDir = path.join(projectRoot, "output", "playwright");
const routes = [
  { url: "http://localhost:3000/", file: "capture-home.png" },
  { url: "http://localhost:3000/docs/ui-ux", file: "capture-category-ui-ux.png" },
  { url: "http://localhost:3000/docs/frontend/component", file: "capture-component-doc.png" },
  { url: "http://localhost:3000/docs/backend/api", file: "capture-api-doc.png" },
];

fs.mkdirSync(outputDir, { recursive: true });

function runPlaywright(args) {
  const command = [
    "npx",
    "--yes",
    "--package",
    "@playwright/cli",
    "playwright-cli",
    ...args.map((arg) => (arg.includes(" ") ? `"${arg}"` : arg)),
  ].join(" ");

  execSync(command, {
    cwd: projectRoot,
    stdio: "inherit",
  });
}

runPlaywright(["close-all"]);

for (const route of routes) {
  runPlaywright(["open", route.url]);
  runPlaywright([
    "screenshot",
    "--filename",
    path.join("output", "playwright", route.file),
    "--full-page",
  ]);
}

console.log(`프리뷰 캡처 완료: ${routes.length}개 경로`);
