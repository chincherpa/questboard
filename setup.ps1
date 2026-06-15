# Questboard - Erstinstallation (Windows)
# Installiert Python-Abhaengigkeiten und baut das Frontend mit pnpm.
$ErrorActionPreference = "Stop"
$root = $PSScriptRoot

Write-Host "==> Python-Abhaengigkeiten installieren..." -ForegroundColor Cyan
python -m pip install -r (Join-Path $root "backend\requirements.txt")

Write-Host "==> Frontend-Pakete installieren (pnpm)..." -ForegroundColor Cyan
Push-Location (Join-Path $root "frontend")
try {
    pnpm install
    Write-Host "==> Frontend bauen (pnpm build)..." -ForegroundColor Cyan
    pnpm build
} finally {
    Pop-Location
}

Write-Host "`nFertig. Starte die App mit:  .\start.ps1" -ForegroundColor Green
