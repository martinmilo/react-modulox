#!/usr/bin/env node
const init = require('./commands/init')
const path = require('path')

// Get the arguments from command line
const [, , ...args] = process.argv

// Get absolute path
const rootPath = path.resolve(__dirname)

// Run the command
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
    default: {
      console.log('Unknown command!')
      return
    }
  }
}

run()
