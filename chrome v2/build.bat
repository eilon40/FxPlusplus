@echo off
setlocal enabledelayedexpansion

if not exist dist (
    mkdir dist
)

> newline.tmp echo.

echo Building Chrome Extension and Userscript with minification...

REM --- Chrome Extension Files ---
curl -X POST -s --data-urlencode "input@background.js" https://www.toptal.com/developers/javascript-minifier/api/raw > dist\background.js
copy /b manifest.json dist\manifest.json > nul

(
  curl -X POST -s --data-urlencode "input@chrome.js" https://www.toptal.com/developers/javascript-minifier/api/raw
  echo.
  curl -X POST -s --data-urlencode "input@code.js" https://www.toptal.com/developers/javascript-minifier/api/raw
) > dist\content.js

REM --- Userscript Files ---
REM Normal (unminified)
copy /b userscriptMeta.txt + newline.tmp + code.js dist\userscript.js > nul

REM Minified
(
  type userscriptMeta.txt
  echo.
  curl -X POST -s --data-urlencode "input@code.js" https://www.toptal.com/developers/javascript-minifier/api/raw
) > dist\userscript.min.js

del newline.tmp

echo.
echo Build complete. The following files were created in the 'dist' folder:
echo ------------------------------------------------------------
echo Chrome Extension files:
echo   - dist\manifest.json
echo   - dist\background.js
echo   - dist\content.js
echo.
echo Userscript files:
echo   - dist\userscript.js (normal)
echo   - dist\userscript.min.js (minified)
echo ------------------------------------------------------------
echo.
echo To load the Chrome Extension:
echo   1. Open chrome://extensions/
echo   2. Enable Developer Mode
echo   3. Click "Load unpacked" and select the 'dist' folder
echo.
echo To install the Userscript:
echo   Open either userscript.js or userscript.min.js with your preferred manager
echo   (e.g. Tampermonkey or Violentmonkey) or drag & drop into the browser window.
echo.
pause
