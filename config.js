const fs = require('fs-extra')

module.exports = fs.existsSync('./modulox.config.json')
	? fs.readFileSync('./modulox.config.json', 'utf8')
	: {
		breakpoints: [
			{ size: 'xs', prefix: 's:', minWidth: 0 },
			{ size: 'xm', prefix: 'm:', minWidth: 565 },
			{ size: 'xt', prefix: 't:', minWidth: 769 },
			{ size: 'xl', prefix: 'l:', minWidth: 1200 },
			{ size: 'xd', prefix: 'd:', minWidth: 1980 }
		],
		splitter: ','
	}
