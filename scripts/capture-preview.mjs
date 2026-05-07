import fs from "node:fs";
import path from "node:path";
import net from "node:net";
import { execSync, spawn } from "node:child_process";

const projectRoot = process.cwd();
const outputDir = path.join(projectRoot, "output", "playwright");
const routes = [
  { route: "/", file: "capture-home.png" },
  { route: "/playbooks", file: "capture-playbooks.png" },
  { route: "/playbooks/planner-signup-page", file: "capture-playbook-signup.png" },
  { route: "/guides", file: "capture-guides.png" },
  { route: "/guides/signup-feature", file: "capture-guide-signup.png" },
  { route: "/casebooks", file: "capture-casebooks.png" },
  { route: "/casebooks/signup-project", file: "capture-casebook-signup.png" },
  { route: "/workouts", file: "capture-workouts.png" },
  { route: "/workouts/signup-request-fix", file: "capture-workout-signup.png" },
  { route: "/compare", file: "capture-compare.png" },
  { route: "/scenarios", file: "capture-scenarios.png" },
  { route: "/docs/ui-ux", file: "capture-category-ui-ux.png" },
  { route: "/docs/frontend/component", file: "capture-component-doc.png" },
  { route: "/docs/backend/api", file: "capture-api-doc.png" },
];

fs.mkdirSync(outputDir, { recursive: true });

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function getAvailablePort() {
  return new Promise((resolve, reject) => {
    const explicitPort = Number(process.env.CAPTURE_PORT);
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
    cwd: projectRoot,
    stdio: "ignore",
  },
);

try {
  await waitForServer(`${baseUrl}/`);
  runPlaywright(["close-all"]);

  for (const route of routes) {
    runPlaywright(["open", `${baseUrl}${route.route}`]);
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
