import fs from "node:fs";
import path from "node:path";
import { execSync, spawn } from "node:child_process";

const projectRoot = process.cwd();
const outputDir = path.join(projectRoot, "output", "playwright");
const port = Number(process.env.CAPTURE_PORT ?? 3013);
const baseUrl = `http://localhost:${port}`;
const routes = [
  { url: `${baseUrl}/`, file: "capture-home.png" },
  { url: `${baseUrl}/compare`, file: "capture-compare.png" },
  { url: `${baseUrl}/docs/ui-ux`, file: "capture-category-ui-ux.png" },
  { url: `${baseUrl}/docs/frontend/component`, file: "capture-component-doc.png" },
  { url: `${baseUrl}/docs/backend/api`, file: "capture-api-doc.png" },
];

fs.mkdirSync(outputDir, { recursive: true });

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function waitForServer(url, retries = 60) {
  for (let index = 0; index < retries; index += 1) {
    try {
      const response = await fetch(url);
      if (response.ok) {
        return;
      }
    } catch {
      // 서버가 아직 뜨지 않은 상태는 무시합니다.
    }

    await wait(1000);
  }

  throw new Error(`프리뷰 서버가 ${url}에서 응답하지 않습니다.`);
}

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

const server = spawn("cmd.exe", ["/c", "npx", "next", "start", "--hostname", "localhost", "--port", String(port)], {
  cwd: projectRoot,
  stdio: "ignore",
});

try {
  await waitForServer(`${baseUrl}/`);

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
} finally {
  server.kill("SIGTERM");
}
