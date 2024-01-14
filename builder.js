const fs = require('fs');

// All the folders of the ./lib and ./types folders.
const folders = fs.readdirSync('./lib');
const types = fs.readdirSync('./types');

fs.rmdirSync('./lib', { recursive: true });
fs.mkdirSync('./lib');

fs.rmdirSync('./types', { recursive: true });
fs.mkdirSync('./types');
