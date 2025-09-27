import fs from 'fs';
import siteConfig from './src/config/settings.js';

const username = siteConfig.username;

let indexHtml = fs.readFileSync('./index.html', 'utf8');
indexHtml = indexHtml.replace(/keirokeer/g, username);
fs.writeFileSync('./index.html', indexHtml);

let manifest = fs.readFileSync('./manifest.json', 'utf8');
manifest = manifest.replace(/keirokeer/g, username);
fs.writeFileSync('./manifest.json', manifest);

let packageJson = fs.readFileSync('./package.json', 'utf8');
packageJson = packageJson.replace(/keirokeer/g, username);
fs.writeFileSync('./package.json', packageJson);

console.log('Configuration files have been updated successfully.');