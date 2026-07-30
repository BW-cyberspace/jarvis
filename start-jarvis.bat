@echo off
rem Launches the JARVIS dashboard server and opens it in the default browser.
cd /d "%~dp0"
start "JARVIS server" /min cmd /c "node serve.js"
timeout /t 1 >nul
start "" "http://localhost:1963"
