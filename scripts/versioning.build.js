// const package = require('../package.json');
const fs = require('fs');

const angularJsonPath = '../angular.json';
const angularJson = require(angularJsonPath);
var replaceFile = require('replace-in-file');
console.log('🚀 ~ replaceFile:', replaceFile);
const getFormattedDate = () => {
  const now = new Date();
  const dd = String(now.getDate()).padStart(2, '0');
  const mm = String(now.getMonth() + 1).padStart(2, '0');
  const yyyy = now.getFullYear();

  return `${dd}${mm}${yyyy}`;
};

const defaultPathBuild = angularJson.projects['fe-avema'].architect.build.options.outputPath;
const customOutputPath = `${defaultPathBuild}-${getFormattedDate()}`;
console.log(`Starting versioning build from ${defaultPathBuild}... to new outputPath: ${customOutputPath}`);
angularJson.projects['fe-avema'].architect.build.options.outputPath = customOutputPath;

try {
  fs.writeFileSync(angularJsonPath, JSON.stringify(angularJson, null, 2));
  console.log(`Custom build outputPath set to: ${customOutputPath}`);
} catch (error) {
  console.error('Error writing angular.json:', error);
}

console.log('... build finished');
