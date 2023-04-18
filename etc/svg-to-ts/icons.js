const { resolve } = require('node:path');

const rootDir = resolve(
  __dirname,
  '..',
  '..'
);

const iconPath = resolve(rootDir, 'icons');
const outputPath = resolve(iconPath);
const sourcePath = resolve(rootDir, 'svg', 'outlined');

const iconStyles = [
  'filled',
  'outlined',
  'round',
  'sharp',
].map((style) => {
  const uppercaseStyle = style.charAt(0).toUpperCase() + style.slice(1);

  return {
    conversionType: 'files',
    srcFiles: [`${sourcePath}/**/*.svg`],
    // We need a prefix since some names like "123" from material
    // can't be declared as a JS variable. They need to start with
    // a letter.
    prefix: 'i',
    generateType: true,
    delimiter: 'CAMEL',
    svgoConfig: {
      plugins: ['cleanupAttrs']
    },
    barrelFileName: `icons`,
    compileSources: false,
    outputDirectory: `${outputPath}/${style}`,
    interfaceName: `Material${uppercaseStyle}Interface`,
    typeName: `Material${uppercaseStyle}`,
    modelFileName: `${style}-icon.model`,
    iconsFolderName: style,
  };
});

iconStyles.push({
  conversionType: 'files',
  srcFiles: [`${sourcePath}/**/*.svg`],
  prefix: 'i',
  generateType: true,
  delimiter: 'CAMEL',
  barrelFileName: `icons`,
  svgoConfig: {
    plugins: ['cleanupAttrs']
  },
  compileSources: false,
  outputDirectory: `${outputPath}/two-tone`,
  interfaceName: `MaterialTwoToneInterface`,
  typeName: `MaterialTwoTone`,
  modelFileName: `two-tone-icon.model`,
  iconsFolderName: 'two-tone',
});

module.exports = iconStyles;
