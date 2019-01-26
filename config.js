const fs = require('fs-extra')

const config = fs.existsSync('./modulox.config.js')
	? fs.readFileSync('./modulox.config.js', 'utf8')
	: fs.readFileSync('./default.config.js', 'utf8')

module.exports = config
