#!/usr/bin/env node
import { resolve, dirname } from 'node:path';
import { mkdir } from 'node:fs/promises';
import { copyFile } from 'node:fs/promises';
import { fileURLToPath } from 'url';
import { glob } from 'glob';

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootPath = resolve(
  __dirname,
  '..',
);
const upstreamPath = resolve(
  rootPath,
  'upstream-icons',
);
const sourcePath = resolve(
  upstreamPath,
  'src'
);
const svgFiles = await glob(`${sourcePath}/**/24px.svg`, { ignore: 'node_modules/**' });

const filled = [];
const outlined = [];
const round = [];
const sharp = [];
const twoTone = [];

const folderMap = new Map([
  ['materialicons', filled],
  ['materialiconsoutlined', outlined],
  ['materialiconsround', round],
  ['materialiconssharp', sharp],
  ['materialiconstwotone', twoTone],
]);

for (const iconPath of svgFiles) {
  for (const [path, store] of folderMap.entries()) {
    if (iconPath.includes(`/${path}/`) === false) {
      continue;
    }

    store.push(iconPath);
  }
}

const renameMap = new Map([
  ['materialicons', 'filled'],
  ['materialiconsoutlined', 'outlined'],
  ['materialiconsround', 'round'],
  ['materialiconssharp', 'sharp'],
  ['materialiconstwotone', 'two-tone'],
]);

for (const [path, store] of folderMap.entries()) {
  for (const item of store) {
    let [group, iconName] = item
      .replace(`${sourcePath}/`, '')
      .replace(`${path}/`, '')
      .replace('/24px.svg', '')
      .split('/');
    if (iconName.match(/^\d/)) {
      // replace digits in name
    }
    const fileName = `${iconName}.svg`;
    const outputPath = resolve(rootPath, 'svg', renameMap.get(path), group, fileName);
    await mkdir(outputPath.replace(fileName, ''), { recursive: true });
    await copyFile(item, outputPath);
  }
}
