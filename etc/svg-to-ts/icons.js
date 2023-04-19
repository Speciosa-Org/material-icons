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
    prefix: '',
    generateType: true,
    exportCompleteIconSet: true,
    completeIconSetName: `Material${uppercaseStyle}Set`,
    generateEnum: false,
    enumName: `Material${uppercaseStyle}Icons`,
    compileSources: true,
    delimiter: 'CAMEL',
    svgoConfig: {
      plugins: ['cleanupAttrs']
    },
    barrelFileName: `icons`,
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
  prefix: '',
  generateType: true,
  exportCompleteIconSet: true,
  completeIconSetName: 'MaterialTwoToneSet',
  generateEnum: false,
  enumName: 'MaterialTwoToneIcons',
  compileSources: true,
  delimiter: 'CAMEL',
  barrelFileName: `icons`,
  svgoConfig: {
    plugins: ['cleanupAttrs']
  },
  outputDirectory: `${outputPath}/two-tone`,
  interfaceName: `MaterialTwoToneInterface`,
  typeName: `MaterialTwoTone`,
  modelFileName: `two-tone-icon.model`,
  iconsFolderName: 'two-tone',
});

module.exports = iconStyles;
