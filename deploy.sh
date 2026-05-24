#!/usr/bin/env bash
set -e

echo "==> Syncing files to Pi..."
rsync -av --no-perms --no-group --omit-dir-times \
  --exclude='node_modules' --exclude='dist' \
  /home/matt/Projects/Choreboard/frontend \
  /home/matt/Projects/Choreboard/backend \
  mattrh@192.168.1.34:/homeassistant/www/choreboard/

echo ""
echo "Done! Now rebuild manually in the Pi terminal:"
echo "  cd /homeassistant/www/choreboard && docker-compose up -d --build"
