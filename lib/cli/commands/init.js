// Packages
const fs = require('fs-extra')

// Exit the command line and show the message why so
const exit = message => {
  console.log(message)
  process.exit(1)
}

const file = rootPath => {
  const getPath = sliceAt => rootPath.slice(0, rootPath.indexOf(sliceAt))
  const defaultThemePath = `${getPath('/modulox/lib')}/modulox/default.theme.js`
  const generatedThemePath = `${getPath('/node_modules')}/modulox.theme.js`

  // If generated file already exists, return error
  fs.existsSync(generatedThemePath) && exit(`ModuloX theme file already exists!`)

  // If the file is not generated, generate a new one
  const defaultConfig = fs.readFileSync(defaultThemePath, 'utf8')
  fs.outputFileSync(generatedThemePath, defaultConfig)
  console.log(`ModuloX theme file was successfuly created!`)
  return
}

module.exports = function init(purpose, rootPath) {
  if (typeof purpose !== 'undefined') {
    file(rootPath)
    return
  }
  console.log('Unknown command init in this format!')
  return
}
