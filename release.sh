#!/bin/bash

# release dir
rm -rf dist/*
mkdir -p dist/chrome
mkdir -p dist/firefox

cp -r chrome/* dist/chrome/
cp -r firefox/* dist/firefox/

# cat common files as needed
cat common/convert.js >> dist/chrome/background.js
cat common/convert.js >> dist/firefox/background.js

# zip 'em up
cd dist/chrome
zip -r ../brewconvert_chrome.zip *
cd -
cd dist/firefox
zip -r ../brewconvert_ff.zip *
cd -
# done
echo "Done"