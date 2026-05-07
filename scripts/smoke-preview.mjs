import { spawn } from 'node:child_process';
import net from 'node:net';

const routes = [
  '/',
  '/playbooks',
  '/playbooks/planner-signup-page',
  '/guides',
  '/guides/signup-feature',
  '/casebooks',
  '/casebooks/signup-project',
  '/workouts',
  '/workouts/signup-request-fix',
  '/compare',
  '/scenarios',
  '/docs/ui-ux',
  '/docs/frontend',
  '/docs/backend',
  '/docs/ui-ux/modal',
  '/updates',
  '/sitemap.xml',
  '/robots.txt',
];

function getAvailablePort(start = 4500, end = 4540) {
  return new Promise((resolve, reject) => {
    const tryPort = (port) => {
      if (port >= end) {
        reject(new Error('사용 가능한 포트를 찾지 못했습니다.'));
        return;
      }
      const server = net.createServer();
      server.unref();
      server.on('error', () => tryPort(port + 1));
      server.listen(port, '127.0.0.1', () => {
        const { port: freePort } = server.address();
        server.close(() => resolve(freePort));
      });
    };
    tryPort(start);
  });
}

async function wait(ms) {
  await new Promise((resolve) => setTimeout(resolve, ms));
}

async function fetchStatus(url) {
  try {
    const response = await fetch(url, { redirect: 'manual' });
    return response.status;
  } catch {
    return 0;
  }
}

async function waitForServer(url, retries = 60) {
  for (let i = 0; i < retries; i += 1) {
    const status = await fetchStatus(url);
    if (status >= 200 && status < 300) return;
    await wait(1000);
  }
  throw new Error(`프리뷰 서버가 ${url} 에서 응답하지 않습니다.`);
}

const port = await getAvailablePort();
const baseUrl = `http://127.0.0.1:${port}`;
const server = spawn(
  process.platform === 'win32' ? 'node_modules\\.bin\\next.cmd' : 'node_modules/.bin/next',
  ['start', '--hostname', '127.0.0.1', '--port', String(port)],
  {
    cwd: process.cwd(),
    stdio: 'inherit',
    shell: process.platform === 'win32',
  },
);

const shutdown = () => {
  if (!server.killed) {
    server.kill('SIGTERM');
  }
};

process.on('SIGINT', () => {
  shutdown();
  process.exit(130);
});
process.on('SIGTERM', () => {
  shutdown();
  process.exit(143);
});

try {
  await waitForServer(`${baseUrl}/`);
  await wait(5000);

  const failures = [];
  for (const route of routes) {
    let status = 0;
    for (let retry = 0; retry < 10; retry += 1) {
      status = await fetchStatus(`${baseUrl}${route}`);
      if (status >= 200 && status < 300) break;
      if (status !== 404) break;
      await wait(1000);
    }
    if (status < 200 || status >= 300) {
      failures.push(`${route}: ${status}`);
    }
  }

  if (failures.length > 0) {
    console.error('스모크 검증 실패');
    for (const failure of failures) console.error(`- ${failure}`);
    process.exitCode = 1;
  } else {
    console.log(`스모크 검증 통과: ${routes.length}개 경로`);
  }
} finally {
  shutdown();
}
