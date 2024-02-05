#!ts-node-esm

import { readFile, appendFile, writeFile, readdir } from 'node:fs/promises';

import themes from '../src/data/themes.js';

await writeFile('src/themes.scss', '/* Auto generated file - do not edit*/');
//
// for (const theme of themes) {
//   const css = await readFile(`node_modules/highlight.js/styles/${theme.value}.min.css`, 'utf8');
//   await appendFile('src/themes.css', `
// .theme-${theme.value} {
//   ${css}
// }`);
// }

for await (const file of await readdir('node_modules/highlight.js/styles')) {
  if (!file.includes('.min.')) continue;
  if (!file.endsWith('.css')) continue;
  const name = file.replace('.min.css', '');
  console.log('appending', name);
  const css = await readFile(`node_modules/highlight.js/styles/${file}`, 'utf8');
  await appendFile('src/themes.scss', `
.theme-${name} {
  ${css}
}`);
}
