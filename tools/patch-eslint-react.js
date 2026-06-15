#!/usr/bin/env node
// Patches eslint-plugin-react inside eslint-config-next for ESLint 10 compatibility.
// ESLint 10 removed context.getFilename() in favour of context.filename.
'use strict';

const fs = require('fs');
const path = require('path');

const base = path.join(__dirname, '..', 'node_modules', 'eslint-config-next', 'node_modules', 'eslint-plugin-react', 'lib');

function patch(file, from, to) {
    const full = path.join(base, file);
    if (!fs.existsSync(full)) return;
    const src = fs.readFileSync(full, 'utf8');
    if (src.includes(to)) return; // already patched
    if (!src.includes(from)) return; // nothing to patch
    fs.writeFileSync(full, src.replace(from, to));
    console.log(`patched ${file}`);
}

patch(
    'util/version.js',
    'contextOrFilename.getFilename()',
    'contextOrFilename.filename ?? contextOrFilename.getFilename?.()'
);

patch(
    'rules/jsx-filename-extension.js',
    'const filename = context.getFilename();',
    'const filename = context.filename ?? context.getFilename?.();'
);
