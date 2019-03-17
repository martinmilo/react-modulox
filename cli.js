#!/usr/bin/env node
const fs = require('fs-extra')
const path = require('path')
const shell = require('shelljs')

// Get the arguments from command line
const [, , ...args] = process.argv

// Get absolute path
const rootPath = path.resolve(__dirname)

// Exit the command line and show the message why so
const exit = message => {
  console.log(message)
  process.exit(1)
}

// Get theme file path
const getPath = sliceAt => rootPath.slice(0, rootPath.indexOf(sliceAt))

const file = rootPath => {
  const defaultThemePath = `${getPath('/modulox')}/modulox/default.theme.js`
  const generatedThemePath = `${getPath('/node_modules')}/modulox.theme.js`

  const defaultComponentsPath = `${getPath(
    '/modulox'
  )}/modulox/default.components.js`
  const generatedComponentsPath = `${getPath('/node_modules')}/modulox.components.js`

  // If generated file already exists, return error
  fs.existsSync(generatedThemePath) && exit(`ModuloX theme file already exists!`)
  fs.existsSync(generatedComponentsPath) &&
    exit(`ModuloX components file already exists!`)

  // If the file is not generated, generate a new one
  const defaultThemeFile = fs.readFileSync(defaultThemePath, 'utf8')
  fs.outputFileSync(generatedThemePath, defaultThemeFile)
  console.log(`ModuloX theme file was successfuly created!`)

  const defaultComponentsFile = fs.readFileSync(defaultComponentsPath, 'utf8')
  fs.outputFileSync(generatedComponentsPath, defaultComponentsFile)
  console.log(
    `ModuloX components file was successfuly created! Don't forget to uncomment the code there and import components from there!`
  )
  return
}

const buildTheme = rootPath => {
  const themePath = `${getPath('/node_modules')}/modulox.theme.js`
  const localThemePath = `${getPath('/modulox')}/modulox/modulox.theme.js`

  // If generated file does not exists, return error
  !fs.existsSync(themePath) &&
    exit(
      `ModuloX theme file was not found! Run init command before you try to build theme!`
    )

  // If file is generated, copy the changes to the modulox.theme.js
  const themeFile = fs.readFileSync(themePath, 'utf8')
  fs.outputFileSync(localThemePath, themeFile)
  console.log(`Your theme was successfuly applied!`)
  return
}

// Init command
function init(purpose, rootPath) {
  if (typeof purpose !== 'undefined') {
    file(rootPath)
    return
  }
  console.log('Unknown command init in this format!')
  return
}

// Build command
function build(purpose, rootPath) {
  if (typeof purpose !== 'undefined') {
    buildTheme(rootPath)
    shell.exec(
      `webpack --mode production ${rootPath}/node_modules/@javascriptfox/modulox/webpack.config.js`
    )
    return
  }
  console.log('Unknown command build in this format!')
  return
}

// Run command
function run() {
  if (args.length < 1) {
    console.log('Unknown command!')
    process.exit(1)
  }

  switch (args[0]) {
    case 'init': {
      init(args[0], rootPath)
      return
    }
    case 'build': {
      build(args[0], rootPath)
      return
    }
    default: {
      console.log('Unknown command!')
      return
    }
  }
}

run()
