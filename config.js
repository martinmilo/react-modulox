const fs = require('fs-extra')

const config = fs.existsSync('./modulox.config')
	? fs.readFileSync('./modulox.config', 'utf8')
	: fs.readFileSync('./default.config', 'utf8')

module.exports = config
