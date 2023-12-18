const fs = require('fs');

// All the folders of the ./lib and ./types folders.
const folders = fs.readdirSync('./lib');
const types = fs.readdirSync('./types');

// Remove all the folders.
folders.forEach((folder) => {
  // Remove the folder.
  fs.rm(`./lib/${folder}`, () => {});
});
types.forEach((folder) => {
  // Remove the folder.
  fs.rm(`./types/${folder}`, () => {});
});
