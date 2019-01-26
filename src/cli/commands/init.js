// Packages
const fs = require('fs-extra')

// Boilerplate files
const paths = {
	defaultFile: `./default.config.json`,
	generatedFile: `./modulox.config.json`
}

// Exit the command line and show the message why so
const exit = message => {
	console.log(message)
	process.exit(1)
}

const file = () => {
	fs.existsSync(paths.generatedFile) && exit(`The config already exists!`)
	const defaultConfig = fs.readFileSync(paths.defaultFile, 'utf8')
	fs.outputFileSync(paths.generatedFile, defaultConfig)
	console.log(`Config file was successfuly created!`)
	return
}

module.exports = function init(purpose) {
	if (typeof purpose !== 'undefined') {
		file()
		return
	}
	console.log('Unknown command init in this format!')
	return
}
