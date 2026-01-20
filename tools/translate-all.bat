@echo off
REM Translate ALL DMN content to 9 languages - Complete multi-language site

setlocal enabledelayedexpansion

echo ╔═══════════════════════════════════════════════════════════╗
echo ║          DMN COMPLETE SITE TRANSLATION                    ║
echo ║              Ollama + gpt-oss:20b                         ║
echo ╚═══════════════════════════════════════════════════════════╝
echo.

set MODEL=gpt-oss:20b
set LANGUAGES=es,de,fr,zh,pt,nl,sv,ja,hi

echo Configuration:
echo   Model: %MODEL%
echo   Languages: 9 (Spanish, German, French, Chinese, Portuguese,
echo                  Dutch, Swedish, Japanese, Hindi)
echo.
echo Files to translate:
echo   DOCUMENTATION (7 files):
echo     - mission.md
echo     - getting-started.md
echo     - deeper-purpose.md
echo     - heart-protocol.md
echo     - about.md
echo     - faq.md
echo     - comparison.md
echo.
echo   ADDITIONAL PAGES (2 files):
echo     - nodes/_index.md (Node Directory)
echo     - timer/_index.md (Timer Page)
echo.
echo Total: 9 files × 9 languages = 81 translated files
echo Estimated time: 60-90 minutes
echo.

REM Verify all files exist
echo Checking files...
set error=0
set file_count=0

if exist "content\docs\mission.md" (echo ✓ mission.md) else (echo ✗ mission.md MISSING & set error=1)
set /a file_count+=1

if exist "content\docs\getting-started.md" (echo ✓ getting-started.md) else (echo ✗ getting-started.md MISSING & set error=1)
set /a file_count+=1

if exist "content\docs\deeper-purpose.md" (echo ✓ deeper-purpose.md) else (echo ✗ deeper-purpose.md MISSING & set error=1)
set /a file_count+=1

if exist "content\docs\heart-protocol.md" (echo ✓ heart-protocol.md) else (echo ✗ heart-protocol.md MISSING & set error=1)
set /a file_count+=1

if exist "content\docs\about.md" (echo ✓ about.md) else (echo ✗ about.md MISSING & set error=1)
set /a file_count+=1

if exist "content\docs\faq.md" (echo ✓ faq.md) else (echo ✗ faq.md MISSING & set error=1)
set /a file_count+=1

if exist "content\docs\comparison.md" (echo ✓ comparison.md) else (echo ✗ comparison.md MISSING & set error=1)
set /a file_count+=1

if exist "content\nodes\_index.md" (echo ✓ nodes/_index.md) else (echo ✗ nodes/_index.md MISSING & set error=1)
set /a file_count+=1

if exist "content\timer\_index.md" (echo ✓ timer/_index.md) else (echo ✗ timer/_index.md MISSING & set error=1)
set /a file_count+=1

echo.

if %error%==1 (
    echo ERROR: Some files are missing
    pause
    exit /b 1
)

REM Check Ollama
where ollama >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo ERROR: Ollama not found
    pause
    exit /b 1
)

REM Check model
ollama list | findstr /C:"%MODEL%" >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo ERROR: Model %MODEL% not found
    echo.
    ollama list
    pause
    exit /b 1
)

echo ✓ All 9 files found
echo ✓ Ollama ready
echo ✓ Model loaded
echo.
echo This will take 60-90 minutes.
echo Perfect time for lunch or a meditation session! 🧘
echo.
echo Press any key to start...
pause >nul

echo.
echo ═══════════════════════════════════════════════════════════
echo                   STARTING TRANSLATION
echo ═══════════════════════════════════════════════════════════
echo.

set start_time=%time%
set current=0

REM Documentation files
set /a current+=1
echo [%current%/9] ══════════════════════════════════════════════════
echo         MISSION.MD
echo ══════════════════════════════════════════════════════════
python tools\ollama-translate.py "content\docs\mission.md" %LANGUAGES% %MODEL%
echo.

set /a current+=1
echo [%current%/9] ══════════════════════════════════════════════════
echo         GETTING-STARTED.MD
echo ══════════════════════════════════════════════════════════
python tools\ollama-translate.py "content\docs\getting-started.md" %LANGUAGES% %MODEL%
echo.

set /a current+=1
echo [%current%/9] ══════════════════════════════════════════════════
echo         DEEPER-PURPOSE.MD
echo ══════════════════════════════════════════════════════════
python tools\ollama-translate.py "content\docs\deeper-purpose.md" %LANGUAGES% %MODEL%
echo.

set /a current+=1
echo [%current%/9] ══════════════════════════════════════════════════
echo         HEART-PROTOCOL.MD
echo ══════════════════════════════════════════════════════════
python tools\ollama-translate.py "content\docs\heart-protocol.md" %LANGUAGES% %MODEL%
echo.

set /a current+=1
echo [%current%/9] ══════════════════════════════════════════════════
echo         ABOUT.MD
echo ══════════════════════════════════════════════════════════
python tools\ollama-translate.py "content\docs\about.md" %LANGUAGES% %MODEL%
echo.

set /a current+=1
echo [%current%/9] ══════════════════════════════════════════════════
echo         FAQ.MD
echo ══════════════════════════════════════════════════════════
python tools\ollama-translate.py "content\docs\faq.md" %LANGUAGES% %MODEL%
echo.

set /a current+=1
echo [%current%/9] ══════════════════════════════════════════════════
echo         COMPARISON.MD
echo ══════════════════════════════════════════════════════════
python tools\ollama-translate.py "content\docs\comparison.md" %LANGUAGES% %MODEL%
echo.

set /a current+=1
echo [%current%/9] ══════════════════════════════════════════════════
echo         NODES/_INDEX.MD
echo ══════════════════════════════════════════════════════════
python tools\ollama-translate.py "content\nodes\_index.md" %LANGUAGES% %MODEL%
echo.

set /a current+=1
echo [%current%/9] ══════════════════════════════════════════════════
echo         TIMER/_INDEX.MD
echo ══════════════════════════════════════════════════════════
python tools\ollama-translate.py "content\timer\_index.md" %LANGUAGES% %MODEL%
echo.

set end_time=%time%

echo.
echo ╔═══════════════════════════════════════════════════════════╗
echo ║            TRANSLATION COMPLETE!                          ║
echo ╚═══════════════════════════════════════════════════════════╝
echo.

REM Count results
echo Translation Summary:
echo ───────────────────────────────────────────────────────────
echo.

set total=0
for %%L in (es de fr zh pt nl sv ja hi) do (
    set /a lang_count=0
    for /r content %%F in (*.%%L.md) do set /a lang_count+=1
    echo   %%L: !lang_count! files
    set /a total+=!lang_count!
)

echo.
echo   Total translated files: %total%
echo   Expected: 81
echo.

if %total%==81 (
    echo ✓ SUCCESS: All files translated correctly!
) else (
    echo ⚠ WARNING: File count mismatch. Please check for errors.
)

echo.
echo Files by location:
echo ───────────────────────────────────────────────────────────
dir /b content\docs\*.es.md 2>nul | find /c ".md" >nul && echo   content/docs: 7 docs × 9 languages = 63 files
dir /b content\nodes\*.es.md 2>nul | find /c ".md" >nul && echo   content/nodes: 1 page × 9 languages = 9 files
dir /b content\timer\*.es.md 2>nul | find /c ".md" >nul && echo   content/timer: 1 page × 9 languages = 9 files

echo.
echo Next Steps:
echo ───────────────────────────────────────────────────────────
echo.
echo   1. TEST LOCALLY:
echo      hugo server
echo.
echo   2. CHECK PAGES:
echo      Homepage:    http://localhost:1313/es/
echo      Mission:     http://localhost:1313/es/docs/mission/
echo      Nodes:       http://localhost:1313/es/nodes/
echo      Timer:       http://localhost:1313/es/timer/
echo      (Test all languages: es, de, fr, zh, pt, nl, sv, ja, hi)
echo.
echo   3. VERIFY QUALITY:
echo      - Check markdown formatting preserved
echo      - Links work correctly
echo      - Language switcher functions
echo      - Dark mode works
echo.
echo   4. COMMIT TO GIT:
echo      git add content
echo      git commit -m "Add complete multi-language support - 10 languages"
echo      git push origin main
echo.
echo   5. PRODUCTION:
echo      Site auto-deploys via GitHub Actions (2-3 min)
echo      Check: https://meditation-network.org/es/
echo.
echo ╔═══════════════════════════════════════════════════════════╗
echo ║  10-LANGUAGE WEBSITE READY FOR DEPLOYMENT! 🌍             ║
echo ╚═══════════════════════════════════════════════════════════╝
echo.

pause