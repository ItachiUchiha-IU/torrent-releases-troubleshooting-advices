// generate-list.js
const fs = require('fs');
const path = require('path');

const dirPath = path.join(__dirname, 'Hashes'); 

const getDirectories = source =>
  fs.readdirSync(source, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);

const folders = getDirectories(dirPath);

// Save the list to a JSON file the webpage can read
fs.writeFileSync(
  path.join(dirPath, 'list.json'), 
  JSON.stringify(folders)
);

console.log(`Generated list with ${folders.length} titles.`);