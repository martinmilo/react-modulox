#!/usr/bin/env node
const init = require('./commands/init')

// Get the arguments from command line
const [,, ...args] = process.argv

// Run the command
function run () {
	if (args.length < 1) {
		console.log('Unknown command!')
		process.exit(1)
	}

	switch (args[0]) {
		case "init": {
			init(args[0])
			return
		}
		default: {
			console.log('Unknown command!')
			return
		}
	}
}

run()
