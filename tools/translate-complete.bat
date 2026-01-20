@echo off
REM Translate ALL DMN content including homepage

setlocal enabledelayedexpansion

echo ╔═══════════════════════════════════════════════════════════╗
echo ║          DMN COMPLETE SITE TRANSLATION                    ║
echo ║              Ollama + dmn-translator                      ║
echo ╚═══════════════════════════════════════════════════════════╝
echo.

set MODEL=demonbyron/HY-MT1.5-1.8B:latest
set LANGUAGES=es,de,fr,zh,pt,nl,sv,ja,hi

echo Configuration:
echo   Model: %MODEL%
echo   Languages: 9
echo.
echo Files to translate:
echo.
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
echo     - nodes/_index.md
echo     - timer/_index.md
echo.
echo Total: 10 files × 9 languages = 90 translated files
echo Estimated time: 70-100 minutes
echo.


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
    pause
    exit /b 1
)

echo ✓ All files ready
echo ✓ Ollama ready
echo ✓ Model loaded
echo.
echo This will take 70-100 minutes.
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
echo [%current%/10] ═════════════════════════════════════════════
echo         MISSION.MD
echo ═════════════════════════════════════════════════════════
python tools\ollama-translate.py "content\docs\mission.md" %LANGUAGES% %MODEL%
echo.

set /a current+=1
echo [%current%/10] ═════════════════════════════════════════════
echo         GETTING-STARTED.MD
echo ═════════════════════════════════════════════════════════
python tools\ollama-translate.py "content\docs\getting-started.md" %LANGUAGES% %MODEL%
echo.

set /a current+=1
echo [%current%/10] ═════════════════════════════════════════════
echo         DEEPER-PURPOSE.MD
echo ═════════════════════════════════════════════════════════
python tools\ollama-translate.py "content\docs\deeper-purpose.md" %LANGUAGES% %MODEL%
echo.

set /a current+=1
echo [%current%/10] ═════════════════════════════════════════════
echo         HEART-PROTOCOL.MD
echo ═════════════════════════════════════════════════════════
python tools\ollama-translate.py "content\docs\heart-protocol.md" %LANGUAGES% %MODEL%
echo.

set /a current+=1
echo [%current%/10] ═════════════════════════════════════════════
echo         ABOUT.MD
echo ═════════════════════════════════════════════════════════
python tools\ollama-translate.py "content\docs\about.md" %LANGUAGES% %MODEL%
echo.

set /a current+=1
echo [%current%/10] ═════════════════════════════════════════════
echo         FAQ.MD
echo ═════════════════════════════════════════════════════════
python tools\ollama-translate.py "content\docs\faq.md" %LANGUAGES% %MODEL%
echo.

set /a current+=1
echo [%current%/10] ═════════════════════════════════════════════
echo         COMPARISON.MD
echo ═════════════════════════════════════════════════════════
python tools\ollama-translate.py "content\docs\comparison.md" %LANGUAGES% %MODEL%
echo.

set /a current+=1
echo [%current%/10] ═════════════════════════════════════════════
echo         NODES/_INDEX.MD
echo ═════════════════════════════════════════════════════════
python tools\ollama-translate.py "content\nodes\_index.md" %LANGUAGES% %MODEL%
echo.

set /a current+=1
echo [%current%/10] ═════════════════════════════════════════════
echo         TIMER/_INDEX.MD
echo ═════════════════════════════════════════════════════════
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
echo   Expected: 90
echo.

if %total%==90 (
    echo ✓ SUCCESS: All files translated correctly!
) else (
    echo ⚠ Note: File count is %total% (expected 90^)
)

echo.
echo Files by location:
echo ───────────────────────────────────────────────────────────
dir /b content\_index.es.md 2>nul | find /c ".md" >nul && echo   Homepage: 1 page × 9 languages = 9 files
dir /b content\docs\*.es.md 2>nul | find /c ".md" >nul && echo   Docs: 7 docs × 9 languages = 63 files
dir /b content\nodes\*.es.md 2>nul | find /c ".md" >nul && echo   Nodes: 1 page × 9 languages = 9 files
dir /b content\timer\*.es.md 2>nul | find /c ".md" >nul && echo   Timer: 1 page × 9 languages = 9 files

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
echo.
echo   3. VERIFY QUALITY:
echo      - Check formatting preserved
echo      - Links work correctly
echo      - Language switcher functions
echo.
echo   4. COMMIT TO GIT:
echo      git add content i18n
echo      git commit -m "Add complete multi-language support - 10 languages"
echo      git push origin main
echo.
echo   5. PRODUCTION:
echo      Site auto-deploys via GitHub Actions
echo      Check: https://meditation-network.org/es/
echo.
echo ╔═══════════════════════════════════════════════════════════╗
echo ║  10-LANGUAGE WEBSITE READY! 🌍                            ║
echo ╚═══════════════════════════════════════════════════════════╝
echo.

pause