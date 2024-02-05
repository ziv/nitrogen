#!ts-node-esm

import { readFile, appendFile, writeFile, readdir } from 'node:fs/promises';

import themes from '../src/data/themes.js';

function parseValue(s: string) {
  const data = {} as any;
  let name = '';
  let value = '';
  let counter = 0;
  let state = 0; // 0 name, 1 value
  for (let i = 0, l = s.length; i < l; ++i) {
    if (s[i] === ':' && state === 0) {
      state = 1;
    } else if (s[i] === ';' && counter === 0) {
      data[name] = value;
      counter = 0;
      state = 0;
      value = '';
      name = '';
    } else if (s[i] === '{' || s[i] === '(') {
      value += s[i];
      counter++;
      state = 1;
    } else if (s[i] === '}' || s[i] === ')') {
      value += s[i];
      counter--;
    } else if (state === 0) {
      name += s[i];
    } else if (state === 1) {
      value += s[i];
    }
  }
  data[name] = value;
  return data;
}

function parseCss(s: string) {
  const data = {} as any;
  let selector = '';
  let value = '';
  let counter = 0;
  let state = 0; // 0 selector, 1 value
  for (let i = 0, l = s.length; i < l; ++i) {
    if (s[i] === '{') {
      counter++;
      state = 1;
    } else if (s[i] === '}') {
      counter--;
      if (counter === 0) {
        data[selector] = parseValue(value);
        selector = '';
        value = '';
        state = 0;
      }
    } else if (state === 0) {
      selector += s[i];
    } else if (state === 1) {
      value += s[i];
    }
  }
  return data;
}

function collectThemes(data: Record<string, Record<string, string>>) {
  let ret = {} as any;
  for (const [selector, values] of Object.entries(data)) {
    if (!selector.startsWith('.theme-')) continue;
    const theme = (selector.split(' ', 2)[0]).replace('.theme-', '');
    const s = selector.split(' ', 2)[1];
    if (!ret[theme]) {
      ret[theme] = {} as any;
    }
    ret[theme][s] = values;
  }
  return ret;
}

for await (const file of await readdir('node_modules/highlight.js/styles')) {
  if (!file.includes('.min.')) continue;
  if (!file.endsWith('.css')) continue;
  const name = file.replace('.min.css', '');
  const content = await readFile(`node_modules/highlight.js/styles/${file}`);
  console.log(name);
}
