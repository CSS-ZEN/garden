rm -rf public/monaco-editor
mkdir public/monaco-editor
cp -r node_modules/monaco-editor/min public/monaco-editor/min
cp -r node_modules/monaco-editor/min-maps public/monaco-editor/min-maps
cp node_modules/monaco-editor/monaco.d.ts public/monaco-editor/monaco.d.ts

rm -rf public/sass.js
mkdir public/sass.js
cp node_modules/sass.js/dist/sass.js public/sass.js/sass.js
cp node_modules/sass.js/dist/sass.worker.js public/sass.js/sass.worker.js
