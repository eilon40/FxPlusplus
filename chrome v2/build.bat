@echo off

if not exist dist (
    mkdir dist
)

> newline.tmp echo.

echo Building Chrome Extension and Userscript...

copy /b background.js dist\background.js > nul
copy /b manifest.json dist\manifest.json > nul
copy /b chromeUtils.js + newline.tmp + MonkeyConfig.js + newline.tmp + code.js dist\content.js > nul
copy /b userscriptMeta.txt + newline.tmp + code.js dist\userscript.js > nul

del newline.tmp

echo.
echo Build complete. The following files were created in the 'dist' folder:
echo ------------------------------------------------------------
echo Chrome Extension files:
echo   - dist\manifest.json
echo   - dist\background.js
echo   - dist\content.js
echo.
echo Userscript file:
echo   - dist\userscript.js
echo ------------------------------------------------------------
echo.
echo To load the Chrome Extension:
echo   1. Open chrome://extensions/
echo   2. Enable Developer Mode
echo   3. Click "Load unpacked" and select the 'dist' folder
echo.
echo To install the Userscript:
echo   Open the userscript file with your preferred manager (e.g. Tampermonkey or Violentmonkey)
echo   or drag and drop it into the browser window.
echo.
pause
