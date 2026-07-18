@echo off
setlocal
set "OWNER=asaf2310-boop"
set "REPO=contact-center-marketing"

if "%GITHUB_TOKEN%"=="" (
  echo.
  echo GitHub token required. Create one at:
  echo https://github.com/settings/tokens  ^(scope: repo^)
  echo.
  set /p GITHUB_TOKEN=Paste token ^(ghp_...^): 
)

if "%GITHUB_TOKEN%"=="" (
  echo Error: no token provided.
  exit /b 1
)

echo.
echo Uploading to https://github.com/%OWNER%/%REPO%
echo.

powershell -ExecutionPolicy Bypass -File "%~dp0upload-marketing-to-github.ps1" -Owner "%OWNER%" -Repo "%REPO%" -Token "%GITHUB_TOKEN%"

if errorlevel 1 (
  echo.
  echo Upload failed. Check the error above.
  exit /b 1
)

echo.
echo Open commits: https://github.com/%OWNER%/%REPO%/commits/main
pause
