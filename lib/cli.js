#!/usr/bin/env node
const fse = require('fs-extra')

// Directories and paths
const dir = __dirname
const getDirectory = path => dir && dir.includes(path)
	? dir.slice(0, dir.indexOf(path))
	: dir

const paths = {
	defaultFile: `${getDirectory('/lib')}/default.config.json`,
	generatedFile: `${getDirectory('/node_modules')}/modulox.config.json`
}

// Exit the command line and show the message why so
const exit = message => {
	console.log(message)
	process.exit(1)
}

const file = () => {
	fse.existsSync(paths.generatedFile) && exit(`The config already exists!`)
	const defaultConfig = fse.readFileSync(paths.defaultFile, 'utf8')
	fse.outputFileSync(paths.generatedFile, defaultConfig)
	console.log(`Config file was successfuly created!`)
	return
}

// Init function
function init(purpose) {
	if (typeof purpose !== 'undefined') {
		file()
		return
	}
	console.log('Unknown command init in this format!')
	return
}

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
