/*
This script is used to update the app version in the UI (variable: appVersion in system.service.ts).
The source version is coming from package.json
*/

const fs = require('fs');
const path = require('path');

const packageJsonPath = path.resolve(__dirname, '../package.json');
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
const version = packageJson.version;

const systemServicePath = path.resolve(__dirname, '../src/app/shared/services/auth/system.service.ts');
const systemServiceContent = fs.readFileSync(systemServicePath, 'utf8');

const updatedSystemServiceContent = systemServiceContent.replace(
  /appVersion: string = 'v.*';/,
  `appVersion: string = 'v${version}';`
);

fs.writeFileSync(systemServicePath, updatedSystemServiceContent, 'utf8');
