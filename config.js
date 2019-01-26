const fs = require('fs-extra')

fs.existsSync('./modulox.config.js')
	? fs.readFileSync('./modulox.config.js', 'utf8')
	: fs.readFileSync('./default.config.js', 'utf8')
