import { spawn } from "node:child_process";
import net from "node:net";

const routes = [
  "/",
  "/compare",
  "/tracks",
  "/guides",
  "/guides/signup-feature",
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

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function getAvailablePort() {
  return new Promise((resolve, reject) => {
    const preferred = Number(process.env.SMOKE_PORT) || 0;
    const server = net.createServer();

    server.unref();
    server.on("error", reject);
    server.listen(preferred, "127.0.0.1", () => {
      const address = server.address();

      if (!address || typeof address === "string") {
        reject(new Error("사용 가능한 포트를 찾지 못했습니다."));
        return;
      }

      const { port } = address;
      server.close(() => resolve(port));
    });
  });
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

const failures = [];

const port = await getAvailablePort();
const baseUrl = `http://localhost:${port}`;

const server = spawn(
  "cmd.exe",
  [
    "/d",
    "/s",
    "/c",
    `node_modules\\.bin\\next.cmd start --hostname localhost --port ${port}`,
  ],
  {
    cwd: process.cwd(),
    stdio: "ignore",
  },
);

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
