// generate-list.js
const fs = require('fs');
const path = require('path');

const folderName = 'Hashes'; 
const dirPath = path.join(__dirname, folderName);

const getDirectories = source =>
  fs.readdirSync(source, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    // Exclude hidden folders like .git
    .filter(dirent => !dirent.name.startsWith('.')) 
    .map(dirent => dirent.name);

if (fs.existsSync(dirPath)) {
    const folders = getDirectories(dirPath);
	// Save the list to a JSON file the webpage can read
    fs.writeFileSync(
      path.join(dirPath, 'list.json'), 
      JSON.stringify(folders)
    );
    console.log(`✅ Success: Generated list with ${folders.length} titles in /${folderName}`);
} else {
    console.error(`❌ Error: Directory "${folderName}" not found!`);
    process.exit(1);
}