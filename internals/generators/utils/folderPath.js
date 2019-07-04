const path = require('path');

function folderPath(folder, name) {
  return `${path.join(
    __dirname,
    '/../../../app/',
    folder,
    name,
    '**'
  )}`;
}

module.exports = folderPath;
