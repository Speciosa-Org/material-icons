#!/usr/bin/env node
import { resolve, dirname } from 'node:path';
import { mkdir } from 'node:fs/promises';
import {
  rename,
} from 'node:fs/promises';
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

const folderMap = new Map([
  ['materialicons', []],
  ['materialiconsoutlined', []],
  ['materialiconsround', []],
  ['materialiconssharp', []],
  ['materialiconstwotone', []],
]);

for (const iconPath of svgFiles) {
  for (const [path, store] of folderMap.entries()) {
    if (iconPath.includes(`/${path}/`) === false) {
      continue;
    }

    store.push(iconPath);
  }
}

const renameGroupMap = new Map([
  ['materialicons', 'filled'],
  ['materialiconsoutlined', 'outlined'],
  ['materialiconsround', 'round'],
  ['materialiconssharp', 'sharp'],
  ['materialiconstwotone', 'two-tone'],
]);

const renameMap = new Map([
  // Reserved words in JavaScript and TypeScript can't
  // directly translate to a variable name.
  // Appending them with "Icon" as a quick fix.
  ['class', 'classIcon'],
  ['delete', 'deleteIcon'],
  ['try', 'tryIcon'],
  ['public', 'publicIcon'],
  // Variables can't start with numbers.
  // Renaming all of them.
  ['6_ft_apart', 'six_ft_apart'],
  ['18_up_rating', 'eighteen_up_rating'],
  ['360', 'three_hundred_sixty'],
  ['9mp', 'nine_mp'],
  ['8mp', 'eight_mp'],
  ['7mp', 'seven_mp'],
  ['6mp', 'six_mp'],
  ['5mp', 'five_mp'],
  ['60fps_select', 'sixty_fps_select'],
  ['4mp', 'four_mp'],
  ['3mp', 'three_mp'],
  ['30fps_select', 'thirty_fps_select'],
  ['2mp', 'two_mp'],
  ['24mp', 'twenty_four_mp'],
  ['22mp', 'twenty_two_mp'],
  ['23mp', 'twenty_three_mp'],
  ['21mp', 'twenty_one_mp'],
  ['20mp', 'twenty_mp'],
  ['19mp', 'nineteen_mp'],
  ['18mp', 'eighteen_mp'],
  ['17mp', 'seventeen_mp'],
  ['16mp', 'sixteen_mp'],
  ['15mp', 'fifteen_mp'],
  ['13mp', 'thirteen_mp'],
  ['14mp', 'fourteen_mp'],
  ['12mp', 'twelve_mp'],
  ['11mp', 'eleven_mp'],
  ['10mp', 'ten_mp'],
  ['3p', 'three_p'],
  ['9k', 'nine_k'],
  ['8k_plus', 'eight_k_plus'],
  ['9k_plus', 'nine_k_plus'],
  ['8k', 'eight_k'],
  ['7k_plus', 'seven_k_plus'],
  ['7k', 'seven_k'],
  ['6k_plus', 'six_k_plus'],
  ['5k_plus', 'five_k_plus'],
  ['5k', 'five_k'],
  ['5g', 'five_g'],
  ['6k', 'six_k'],
  ['4k_plus', 'four_k_plus'],
  ['3k_plus', 'three_k_plus'],
  ['3k', 'three_k'],
  ['4k', 'four_k'],
  ['2k_plus', 'two_k_plus'],
  ['1k_plus', 'one_k_plus'],
  ['1k', 'one_k'],
  ['2k', 'two_k'],
  ['10k', 'ten_k'],
  ['60fps', 'sixty_fps'],
  ['4g_plus_mobiledata', 'four_g_plus_mobiledata'],
  ['4g_mobiledata', 'four_g_mobiledata'],
  ['30fps', 'thirty_fps'],
  ['1x_mobiledata', 'one_x_mobiledata'],
  ['3g_mobiledata', 'three_g_mobiledata'],
  ['3d_rotation', 'three_d_rotation'],
  ['123', 'one_hundred_twenty_three']
]);

for (const [path, store] of folderMap.entries()) {
  for (const item of store) {
    let [group, iconName] = item
      .replace(`${sourcePath}/`, '')
      .replace(`${path}/`, '')
      .replace('/24px.svg', '')
      .split('/');

    iconName = renameMap.get(iconName) || iconName;
    const fileName = `${iconName}.svg`;
    const outputPath = resolve(rootPath, 'svg', renameGroupMap.get(path), group, fileName);

    await mkdir(outputPath.replace(fileName, ''), { recursive: true });
    await rename(item, outputPath);
  }
}
