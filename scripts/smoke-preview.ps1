$ErrorActionPreference = "Stop"
$ProgressPreference = "SilentlyContinue"

$routes = @(
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
  "/robots.txt"
)

function Get-AvailablePort {
  for ($port = 4500; $port -lt 4540; $port++) {
    try {
      $listener = [System.Net.Sockets.TcpListener]::new([Net.IPAddress]::Loopback, $port)
      $listener.Start()
      $listener.Stop()
      return $port
    } catch {
      continue
    }
  }

  throw "사용 가능한 포트를 찾지 못했습니다."
}

function Wait-ForServer {
  param(
    [string]$Url,
    [int]$Retries = 60
  )

  for ($index = 0; $index -lt $Retries; $index++) {
    try {
      $response = Invoke-WebRequest -Uri $Url -UseBasicParsing
      if ($response.StatusCode -ge 200 -and $response.StatusCode -lt 300) {
        return
      }
    } catch {
      Start-Sleep -Seconds 1
      continue
    }

    Start-Sleep -Seconds 1
  }

  throw "프리뷰 서버가 $Url 에서 응답하지 않습니다."
}

function Get-StatusCode {
  param([string]$Url)

  try {
    $response = Invoke-WebRequest -Uri $Url -UseBasicParsing
    return [int]$response.StatusCode
  } catch {
    if ($_.Exception.Response) {
      return [int]$_.Exception.Response.StatusCode.value__
    }

    return 0
  }
}

$projectRoot = Split-Path -Parent $PSScriptRoot
$port = Get-AvailablePort
$baseUrl = "http://127.0.0.1:$port"
$process = Start-Process `
  -FilePath "cmd.exe" `
  -ArgumentList "/d", "/s", "/c", "node_modules\\.bin\\next.cmd start --hostname 127.0.0.1 --port $port" `
  -WorkingDirectory $projectRoot `
  -PassThru

try {
  Wait-ForServer -Url "$baseUrl/"
  Start-Sleep -Seconds 5

  $failures = @()

  foreach ($route in $routes) {
    $status = 0

    for ($retry = 0; $retry -lt 10; $retry++) {
      $status = Get-StatusCode -Url "$baseUrl$route"

      if ($status -ge 200 -and $status -lt 300) {
        break
      }

      if ($status -ne 404) {
        break
      }

      Start-Sleep -Seconds 1
    }

    if ($status -lt 200 -or $status -ge 300) {
      $failures += "$route`: $status"
    }
  }

  if ($failures.Count -gt 0) {
    Write-Host "스모크 검증 실패"
    foreach ($failure in $failures) {
      Write-Host "- $failure"
    }
    exit 1
  }

  Write-Host "스모크 검증 통과: $($routes.Count)개 경로"
} finally {
  if ($process -and !$process.HasExited) {
    Stop-Process -Id $process.Id -Force
  }
}
