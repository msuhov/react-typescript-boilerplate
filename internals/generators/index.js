const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const chalk = require('chalk');

const componentGenerator = require('./component/index.js');
const containerGenerator = require('./container/index.js');
const getFolderPath = require('./utils/folderPath');

module.exports = plop => {
  plop.setGenerator('component', componentGenerator);
  plop.setGenerator('container', containerGenerator);
  plop.addHelper('directory', comp => {
    try {
      fs.accessSync(
        path.join(__dirname, `../../app/containers/${comp}`),
        fs.F_OK,
      );
      return `containers/${comp}`;
    } catch (e) {
      return `components/${comp}`;
    }
  });
  plop.addHelper('curly', (object, open) => (open ? '{' : '}'));
  plop.setActionType('prettify', (answers, config) => {
    const folderPath = getFolderPath(
      config.path,
      plop.getHelper('properCase')(answers.name)
    );

    try {
      execSync(`npm run prettify -- "${folderPath}"`);
      return folderPath;
    } catch (err) {
      throw err;
    }
  });
  plop.setActionType('eslint:fix', (answers, config) => {
    const folderPath = getFolderPath(
      config.path,
      plop.getHelper('properCase')(answers.name)
    );

    try {
      execSync(`npm run lint:eslint:fix -- "${folderPath}"`);
      return folderPath;
    } catch (err) {
      throw err;
    }
  });
  plop.setActionType('log', (answers, config) => {
    process.stdout.write(
      chalk.yellow(config.message)
    )
  });
};
