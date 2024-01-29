#!ts-node-esm

import { readFile, appendFile, writeFile } from 'node:fs/promises';

import themes from '../src/data/themes.js';

await writeFile('src/themes.css', '/* Auto generated file - do not edit*/');

for (const theme of themes) {
  const css = await readFile(`node_modules/highlight.js/styles/${theme.value}.min.css`, 'utf8');
  await appendFile('src/themes.css', `
.theme-${theme.value} {
  ${css}
}`);
}
