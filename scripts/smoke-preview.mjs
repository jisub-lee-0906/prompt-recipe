import net from "node:net";
import { spawn } from "node:child_process";

const routes = [
  "/",
  "/tracks",
  "/playbooks",
  "/playbooks/planner-signup-page",
  "/guides",
  "/guides/signup-feature",
  "/casebooks",
  "/casebooks/signup-project",
  "/workouts",
  "/workouts/signup-request-fix",
  "/compare",
  "/scenarios",
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
    const explicitPort = Number(process.env.SMOKE_PORT);
    const candidates = explicitPort
      ? [explicitPort]
      : Array.from({ length: 40 }, (_, index) => 4500 + index);

    const tryNext = (index) => {
      if (index >= candidates.length) {
        reject(new Error("사용 가능한 포트를 찾지 못했습니다."));
        return;
      }

      const port = candidates[index];
      const server = net.createServer();
      server.unref();

      server.once("error", () => {
        server.close();
        tryNext(index + 1);
      });

      server.listen(port, "127.0.0.1", () => {
        server.close(() => resolve(port));
      });
    };

    tryNext(0);
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
      // 서버가 아직 준비되지 않은 상태는 무시합니다.
    }

    await wait(1000);
  }

  throw new Error(`프리뷰 서버가 ${url} 에서 응답하지 않습니다.`);
}

async function getStatusCode(url) {
  try {
    const response = await fetch(url, {
      redirect: "manual",
    });
    return response.status;
  } catch {
    return 0;
  }
}

async function fetchRouteWithRetry(url, retries = 10) {
  for (let index = 0; index < retries; index += 1) {
    const status = await getStatusCode(url);

    if (status >= 200 && status < 300) {
      return status;
    }

    if (status !== 404) {
      return status;
    }

    await wait(1000);
  }

  return getStatusCode(url);
}

const failures = [];
const port = await getAvailablePort();
const baseUrl = `http://127.0.0.1:${port}`;

const server = spawn(
  "cmd.exe",
  [
    "/d",
    "/s",
    "/c",
    `node_modules\\.bin\\next.cmd start --hostname 127.0.0.1 --port ${port}`,
  ],
  {
    cwd: process.cwd(),
    stdio: "ignore",
  },
);

try {
  await waitForServer(`${baseUrl}/`);
  await wait(3000);

  for (const route of routes) {
    const status = await fetchRouteWithRetry(`${baseUrl}${route}`);

    if (status < 200 || status >= 300) {
      failures.push(`${route}: ${status}`);
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
