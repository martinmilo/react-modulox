#!/usr/bin/env node
const fs = require('fs-extra');
const path = require('path');
const shell = require('shelljs');

// Get the arguments from command line
const [, , ...args] = process.argv;

const rootPath = path.resolve(__dirname);

// Exit the command line and show the message why so
const exit = message => {
  console.log(message);
  process.exit(1);
};

// Init command
function init() {
  const modulesPath = rootPath.slice(0, rootPath.indexOf('/modulox'));
  const defaultThemePath = `${modulesPath}/modulox/default.theme.js`;

	// Path is going to point to the root of the project's folder
  const path = `${process.cwd()}/modulox.theme.js`;

  // If generated file already exists, return error
  fs.existsSync(path) && exit(`ModuloX theme file already exists!`);

  // If the file is not generated, generate a new one
  const themeFile = fs.readFileSync(defaultThemePath, 'utf8');
  fs.outputFileSync(path, themeFile);
  console.log(`ModuloX theme file was successfuly created!`);

  return;
}

// Run command
function run() {
  if (args.length < 1) {
    console.log('Unknown command!');
    process.exit(1);
  }

  if (args[0]) {
    init(args[0]);
    return;
  }

  console.log('Unknown command!');
  return;
}

run();
