// pm2-Konfiguration für den Raspberry Pi (wird von scripts/pi-install.sh verwendet)
const path = require("path");

// Port wird von deploy-pi.ps1 gesetzt, Standard 5050 (wie start.ps1)
const PORT = process.env.APP_PORT || "5050";
const APP_DIR = __dirname;
// Python-venv mit uvicorn/fastapi, angelegt von scripts/pi-install.sh
const UVICORN = path.join(APP_DIR, ".venv", "bin", "uvicorn");

module.exports = {
  apps: [
    {
      name: "questboard",
      cwd: path.join(APP_DIR, "backend"),
      script: UVICORN,
      args: `main:app --host 0.0.0.0 --port ${PORT}`,
      interpreter: "none",
      instances: 1,
      exec_mode: "fork",
      autorestart: true,
      max_memory_restart: "300M",
      env: {
        QUESTBOARD_DATA: path.join(APP_DIR, "data"),
        PYTHONUNBUFFERED: "1",
      },
    },
  ],
};
