# Questboard - Start (Windows, Single-Server)
# Startet FastAPI (serviert Frontend + API) auf http://localhost:5050
$ErrorActionPreference = "Stop"
$root = $PSScriptRoot

# Datenverzeichnis festlegen und anlegen
$dataDir = Join-Path $root "data"
if (-not (Test-Path $dataDir)) { New-Item -ItemType Directory -Path $dataDir | Out-Null }
$env:QUESTBOARD_DATA = $dataDir

# Warnen, falls Frontend noch nicht gebaut wurde
$dist = Join-Path $root "frontend\dist\index.html"
if (-not (Test-Path $dist)) {
    Write-Host "Frontend nicht gebaut. Fuehre zuerst .\setup.ps1 aus." -ForegroundColor Yellow
    exit 1
}

$url = "http://localhost:5050"
Write-Host "==> Questboard startet auf $url" -ForegroundColor Green
Start-Process $url

Push-Location (Join-Path $root "backend")
try {
    python -m uvicorn main:app --host 127.0.0.1 --port 5050
} finally {
    Pop-Location
}
