import { spawn } from "node:child_process";

const routes = [
  "/",
  "/compare",
  "/playbooks",
  "/playbooks/planner-signup-page",
  "/docs/ui-ux",
  "/docs/frontend",
  "/docs/backend",
  "/docs/ui-ux/modal",
  "/updates",
  "/sitemap.xml",
  "/robots.txt",
];

const port =
  Number(process.env.SMOKE_PORT) ||
  3100 + Math.floor(Math.random() * 200);
const baseUrl = `http://localhost:${port}`;

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

const server = spawn("cmd.exe", ["/c", "npx", "next", "start", "--hostname", "localhost", "--port", String(port)], {
  cwd: process.cwd(),
  stdio: "ignore",
});

const failures = [];

try {
  await waitForServer(`${baseUrl}/`);

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
    process.exitCode = 1;
  } else {
    console.log(`스모크 검증 통과: ${routes.length}개 경로`);
  }
} finally {
  server.kill("SIGTERM");
}
