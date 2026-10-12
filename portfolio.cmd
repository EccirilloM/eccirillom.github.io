@echo off
setlocal
cd /d "%~dp0"
:menu
cls
echo.
echo   ETTORE CIRILLO / PORTFOLIO
echo   =========================
echo   1. Avvia sviluppo e apri il sito
echo   2. Anteprima della build di produzione
echo   3. Verifica tipi, test e build
echo   4. Mostra log (Ctrl+C per uscire)
echo   5. Ferma i container del portfolio
echo   6. Installa / riallinea le dipendenze
echo   0. Esci
echo.
choice /c 1234560 /n /m "Scegli un numero: "
set "selection=%errorlevel%"
if "%selection%"=="7" exit /b 0
docker info >nul 2>&1
if errorlevel 1 (
  echo Avvia Docker Desktop, attendi che sia pronto e riprova.
  pause
  goto menu
)
if "%selection%"=="1" goto dev
if "%selection%"=="2" goto preview
if "%selection%"=="3" goto check
if "%selection%"=="4" goto logs
if "%selection%"=="5" goto stop
if "%selection%"=="6" goto install
:dev
docker compose up -d --build --wait web
if errorlevel 1 goto failed
start "" "http://localhost:5173"
goto done
:preview
docker compose --profile preview up -d --build --wait preview
if errorlevel 1 goto failed
start "" "http://localhost:4173"
goto done
:check
docker compose run --rm web sh -c "pnpm check && pnpm test && pnpm build"
if errorlevel 1 goto failed
goto done
:logs
docker compose logs --tail 80 -f
goto done
:stop
docker compose --profile preview down
if errorlevel 1 goto failed
goto done
:install
docker compose build web
if errorlevel 1 goto failed
docker compose run --rm web pnpm install --frozen-lockfile
if errorlevel 1 goto failed
goto done
:failed
echo.
echo Operazione non riuscita. Leggi il messaggio sopra.
:done
pause
goto menu
