const fs = require('fs');
const path = require('path');
require('dotenv').config();

// Paths
const configPath = path.join(__dirname, '../chrome-extension/config.js');

// Read the config file
let configContent = fs.readFileSync(configPath, 'utf8');

// Replace the placeholder with the actual API key from .env
const apiKey = process.env.JSEARCH_API_KEY;
if (!apiKey) {
  console.error('Error: JSEARCH_API_KEY not found in .env file');
  process.exit(1);
}

configContent = configContent.replace(
  /JSEARCH_API_KEY: '.*?',/,
  `JSEARCH_API_KEY: '${apiKey}',`
);

// Write the updated config file
fs.writeFileSync(configPath, configContent, 'utf8');

console.log('Extension build completed successfully!');
