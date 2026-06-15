@echo off
REM Questboard - Doppelklick-Starter (ruft start.ps1 ohne ExecutionPolicy-Sperre)
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0start.ps1"
pause
