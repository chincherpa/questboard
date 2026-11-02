# Deployt Questboard auf den Raspberry Pi und startet es in pm2 (FastAPI/uvicorn, serviert das Frontend mit).
# Aufruf (im Projektordner):
#   .\deploy-pi.ps1                 # normales Update
#   .\deploy-pi.ps1 -Port 5051      # anderer Port
# Das Frontend wird lokal gebaut; der Pi bekommt backend/, frontend/dist/ und die Spielstände.
# Spielstände (data/) werden NUR übernommen, wenn auf dem Pi noch keine state.json liegt.
param(
    [string]$Target = "pi@pi.local",
    [string]$AppDir = "~/questboard",
    [int]$Port = 5050
)
$ErrorActionPreference = "Stop"
Set-Location $PSScriptRoot

$src  = Join-Path $env:TEMP "questboard-src.tgz"
$data = Join-Path $env:TEMP "questboard-data.tgz"
Remove-Item $src, $data -ErrorAction SilentlyContinue

Write-Host "==> Baue Frontend lokal (pnpm build)" -ForegroundColor Cyan
$pnpmOk = $false
if (Get-Command pnpm -ErrorAction SilentlyContinue) {
    pnpm --version *> $null
    $pnpmOk = ($LASTEXITCODE -eq 0)
}
if (-not $pnpmOk) {
    if (-not (Get-Command corepack -ErrorAction SilentlyContinue)) { throw "pnpm defekt/nicht gefunden und corepack fehlt" }
    function pnpm { corepack pnpm @args }
}
Push-Location frontend
try {
    pnpm install --frozen-lockfile
    if ($LASTEXITCODE) { throw "pnpm install (frontend) fehlgeschlagen" }
    pnpm build
    if ($LASTEXITCODE) { throw "Frontend-Build fehlgeschlagen" }
} finally { Pop-Location }

Write-Host "==> Packe Quellen" -ForegroundColor Cyan
# Backend-Code + gebautes Frontend + pm2-Config. Pfade bleiben relativ, main.py findet frontend/dist.
tar -czf $src --exclude=__pycache__ --exclude=*.pyc -C . backend frontend/dist ecosystem.config.cjs
if ($LASTEXITCODE) { throw "tar (Quellen) fehlgeschlagen" }

$files = @($src, "scripts/pi-install.sh")
if (Test-Path data/state.json) {
    Write-Host "==> Packe Spielstände (werden nur bei Erstinstallation übernommen)" -ForegroundColor Cyan
    tar -czf $data -C data state.json config.json
    if ($LASTEXITCODE) { throw "tar (Daten) fehlgeschlagen" }
    $files += $data
}

Write-Host "==> Kopiere nach $Target" -ForegroundColor Cyan
scp @files "${Target}:/tmp/"
if ($LASTEXITCODE) { throw "scp fehlgeschlagen" }

Write-Host "==> Installiere auf dem Pi" -ForegroundColor Cyan
$dataArg = if ($files -contains $data) { "/tmp/questboard-data.tgz" } else { "none" }
ssh -t $Target "APP_DIR=$AppDir APP_PORT=$Port bash /tmp/pi-install.sh /tmp/questboard-src.tgz $dataArg"
if ($LASTEXITCODE) { throw "Installation auf dem Pi fehlgeschlagen" }

Remove-Item $src, $data -ErrorAction SilentlyContinue
