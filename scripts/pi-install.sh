#!/usr/bin/env bash
# Läuft auf dem Raspberry Pi: entpackt, richtet Python-venv ein, übernimmt Spielstände (nur Erstinstallation) und startet Questboard in pm2.
# Idempotent: unveränderte Abhängigkeiten werden nicht neu installiert.
set -euo pipefail

APP_DIR="${APP_DIR:-$HOME/questboard}"
APP_DIR="${APP_DIR/#\~/$HOME}"
SRC_TGZ="${1:-/tmp/questboard-src.tgz}"
DATA_TGZ="${2:-none}"                      # state.json/config.json vom Windows-Rechner (optional)
export APP_PORT="${APP_PORT:-5050}"
NODE_MIN=22
STATE_DIR="$APP_DIR/.deploy-state"

cleanup_on_exit() {
  rm -f "$SRC_TGZ" 2>/dev/null || true
  [ "$DATA_TGZ" != "none" ] && rm -f "$DATA_TGZ" 2>/dev/null || true
}
trap cleanup_on_exit EXIT

log()  { printf '\n\033[1;36m==> %s\033[0m\n' "$*"; }
skip() { printf '\033[0;32m    ✓ %s\033[0m\n' "$*"; }
die()  { printf '\n\033[1;31mFEHLER: %s\033[0m\n' "$*" >&2; exit 1; }
node_major() { "$1" -p 'process.versions.node.split(".")[0]'; }

# --- Umgebung wie in einer Login-Shell (nvm, ~/.local/bin) ---------------------
export NVM_DIR="${NVM_DIR:-$HOME/.nvm}"
HAS_NVM=0
if [ -s "$NVM_DIR/nvm.sh" ]; then
  # shellcheck disable=SC1091
  set +u; . "$NVM_DIR/nvm.sh"; set -u
  HAS_NVM=1
fi
mkdir -p "$HOME/.local/bin"
export PATH="$HOME/.local/bin:$PATH"

# --- Speicherplatz ----------------------------------------------------------------
free_mb() { df -Pm "$1" | awk 'NR==2 {print $4}'; }
log "Speicherplatz"
mkdir -p "$APP_DIR"
FREE="$(free_mb "$APP_DIR")"
echo "    frei: ${FREE} MB"
[ "$FREE" -lt 200 ] && die "Zu wenig Speicherplatz (${FREE} MB frei, mindestens 200 MB nötig)"

# --- Node.js >= 22 (für pm2; bestehendes Node anderer Apps wird NICHT verändert) ---
log "Node.js"
QB_NODE=""
if command -v node >/dev/null 2>&1 && [ "$(node_major node)" -ge "$NODE_MIN" ]; then
  QB_NODE="$(command -v node)"
  skip "vorhanden: $(node -v) ($QB_NODE)"
elif [ "$HAS_NVM" -eq 1 ]; then
  if nvm ls "$NODE_MIN" >/dev/null 2>&1; then
    skip "Node $NODE_MIN bereits in nvm installiert"
  else
    echo "    installiere Node $NODE_MIN in nvm (Default bleibt $(nvm current))"
    nvm install "$NODE_MIN" --no-progress >/dev/null
  fi
  QB_NODE="$(nvm which "$NODE_MIN")"
elif command -v node >/dev/null 2>&1; then
  die "System-Node $(node -v) ist älter als $NODE_MIN und wird evtl. von deiner anderen App genutzt.
       Ich ändere es nicht automatisch. Optionen:
         a) nvm installieren und erneut deployen
         b) System-Node bewusst aktualisieren und erneut deployen"
else
  echo "    kein Node gefunden -> installiere Node $NODE_MIN (NodeSource)"
  sudo apt-get update
  sudo apt-get install -y ca-certificates curl gnupg build-essential python3
  curl -fsSL "https://deb.nodesource.com/setup_${NODE_MIN}.x" | sudo -E bash -
  sudo apt-get install -y nodejs
  QB_NODE="$(command -v node)"
fi
export PATH="$(dirname "$QB_NODE"):$PATH"
export APP_NODE="$QB_NODE"

# --- Python 3 + venv -------------------------------------------------------------
log "Python"
if command -v python3 >/dev/null 2>&1 && python3 -m venv --help >/dev/null 2>&1; then
  skip "vorhanden: $(python3 -V)"
else
  echo "    installiere python3-venv"
  sudo apt-get update
  sudo apt-get install -y python3 python3-venv python3-pip
fi

# --- pm2 (vorhandenes pm2 der anderen Apps wird mitgenutzt) ----------------------
log "pm2"
if command -v pm2 >/dev/null 2>&1; then
  skip "vorhanden: $(command -v pm2) ($(pm2 -v 2>/dev/null | tail -1))"
else
  echo "    installiere pm2 global (npm, ohne sudo)"
  npm install -g --prefix "$HOME/.local" pm2
  hash -r
fi

# --- Code entpacken -------------------------------------------------------------
log "Code nach $APP_DIR"
mkdir -p "$APP_DIR" "$STATE_DIR" "$APP_DIR/data"
# alte Quellen entfernen; data/, .venv/ und Deploy-Status bleiben erhalten
find "$APP_DIR" -mindepth 1 -maxdepth 1 \
  ! -name data ! -name .venv ! -name .deploy-state -exec rm -rf {} +
tar -xzf "$SRC_TGZ" -C "$APP_DIR"
cd "$APP_DIR"

# --- Spielstände nur bei Erstinstallation ----------------------------------------
if [ -f data/state.json ]; then
  skip "Spielstand vorhanden – bleibt unverändert"
elif [ "$DATA_TGZ" != "none" ] && [ -f "$DATA_TGZ" ]; then
  echo "    übernehme lokalen Spielstand (Erstinstallation)"
  tar -xzf "$DATA_TGZ" -C "$APP_DIR/data"
else
  echo "    kein Spielstand vorhanden – App legt beim Start einen leeren an"
fi

# --- Python-Abhängigkeiten --------------------------------------------------------
log "Python-Abhängigkeiten"
REQ_HASH="$(sha256sum backend/requirements.txt | cut -d' ' -f1)"
old() { cat "$STATE_DIR/$1" 2>/dev/null || true; }
if [ -x .venv/bin/uvicorn ] && [ "$(old req-hash)" = "$REQ_HASH" ]; then
  skip "unverändert – pip install übersprungen"
else
  [ -x .venv/bin/python ] || python3 -m venv .venv
  .venv/bin/pip install --upgrade pip >/dev/null
  .venv/bin/pip install -r backend/requirements.txt
  echo "$REQ_HASH" > "$STATE_DIR/req-hash"
fi

# --- pm2 ------------------------------------------------------------------------
log "pm2-App questboard (Port $APP_PORT)"
pm2 list || true

status="$(pm2 jlist 2>/dev/null | "$QB_NODE" -e '
  let s="";try{const a=JSON.parse(require("fs").readFileSync(0,"utf8")).find(p=>p.name==="questboard");
  s=a?a.pm2_env.status:""}catch{}; process.stdout.write(s)')"
cfg_hash="$( { echo "$APP_PORT $QB_NODE $REQ_HASH"; cat ecosystem.config.cjs; } | sha256sum | cut -d' ' -f1)"
src_hash="$( { find backend frontend/dist -type f -print0 | sort -z | xargs -0 sha256sum; } | sha256sum | cut -d' ' -f1)"

if [ "$status" = "online" ] && [ "$(old cfg-hash)" = "$cfg_hash" ] && [ "$(old src-hash)" = "$src_hash" ]; then
  skip "läuft bereits mit aktuellem Stand – kein Neustart nötig"
else
  [ -n "$status" ] && pm2 stop questboard >/dev/null 2>&1 || true
  sleep 1
  if ss -ltnH "( sport = :$APP_PORT )" 2>/dev/null | grep -q .; then
    sudo ss -ltnp "( sport = :$APP_PORT )" >&2 || true
    [ -n "$status" ] && pm2 start questboard >/dev/null 2>&1 || true
    die "Port $APP_PORT ist von einer anderen Anwendung belegt. Anderen Port wählen: .\\deploy-pi.ps1 -Port 5051"
  fi
  if [ -n "$status" ]; then
    pm2 delete questboard >/dev/null
  fi
  pm2 start ecosystem.config.cjs
  echo "$cfg_hash" > "$STATE_DIR/cfg-hash"
  echo "$src_hash" > "$STATE_DIR/src-hash"
  pm2 save
fi

# --- Autostart ------------------------------------------------------------------
log "Autostart"
if systemctl is-enabled "pm2-$USER.service" >/dev/null 2>&1; then
  skip "systemd-Unit pm2-$USER vorhanden"
else
  sudo env PATH="$PATH" "$(command -v pm2)" startup systemd -u "$USER" --hp "$HOME"
  pm2 save
fi

rm -f "$SRC_TGZ"
[ "$DATA_TGZ" != "none" ] && rm -f "$DATA_TGZ" || true

# --- Healthcheck ----------------------------------------------------------------
log "Healthcheck"
for _ in $(seq 1 20); do
  code="$(curl -s -o /dev/null -w '%{http_code}' "http://127.0.0.1:$APP_PORT/" || true)"
  [ "$code" != "000" ] && break
  sleep 1
done
if [ "${code:-000}" = "000" ]; then
  pm2 logs questboard --lines 30 --nostream || true
  die "Questboard antwortet nicht auf Port $APP_PORT"
fi
skip "HTTP $code"
pm2 status questboard
log "Fertig: http://$(hostname -I | awk '{print $1}'):$APP_PORT"
