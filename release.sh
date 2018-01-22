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
zip -r dist/brewconvert_chrome.zip dist/chrome
zip -r dist/brewconvert_ff.zip dist/firefox

# done
echo "Done"